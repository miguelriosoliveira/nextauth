import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { COOKIE_KEYS, ERROR_CODES } from '../config/constants';
import { setCookieRefreshToken, setCookieToken, signOut } from '../utils';

const cookies = parseCookies();

export const api = axios.create({
	baseURL: 'http://localhost:3333',
	headers: { Authorization: `Bearer ${cookies[COOKIE_KEYS.TOKEN]}` },
});

interface ServerResponseError {
	code?: string;
}

interface RefreshTokenResponse {
	token: string;
	refreshToken: string;
}

interface FailureRequest {
	onSuccess: (token: string) => void;
	onFail: (error: AxiosError) => void;
}

let isRefreshing = false;
const failureRequestsQueue: FailureRequest[] = [];

api.interceptors.response.use(
	response => response,
	(error: AxiosError<ServerResponseError>) => {
		if (error.response?.status !== 401) {
			return Promise.reject(error);
		}

		if (error.response?.data.code !== ERROR_CODES.TOKEN_EXPIRED) {
			signOut();
			return Promise.reject(error);
		}

		const { [COOKIE_KEYS.REFRESH_TOKEN]: refreshToken } = parseCookies();
		const originalRequestConfig = error.config;

		if (!isRefreshing) {
			isRefreshing = true;
			api
				.post<RefreshTokenResponse>('/refresh', { refreshToken })
				.then(({ data: { token, refreshToken: newRefreshToken } }) => {
					setCookieToken(token);
					setCookieRefreshToken(newRefreshToken);
					api.defaults.headers.common.Authorization = `Bearer ${token}`;
					failureRequestsQueue.forEach(({ onSuccess }) => onSuccess(token));
					failureRequestsQueue.length = 0;
				})
				.catch(newError => {
					failureRequestsQueue.forEach(({ onFail }) => onFail(newError));
					failureRequestsQueue.length = 0;
				})
				.finally(() => {
					isRefreshing = false;
				});
		}

		return new Promise((resolve, reject) => {
			failureRequestsQueue.push({
				onSuccess(token) {
					originalRequestConfig.headers = {
						...originalRequestConfig.headers,
						Authorization: `Bearer ${token}`,
					};
					resolve(api(originalRequestConfig));
				},
				onFail(newError) {
					reject(newError);
				},
			});
		});
	},
);
