import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { COOKIE_KEYS, ERROR_CODES } from '../config/constants';
import { setCookieRefreshToken, setCookieToken } from '../utils';

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

api.interceptors.response.use(
	response => response,
	(error: AxiosError<ServerResponseError>) => {
		if (error.response?.status === 401) {
			if (error.response?.data.code === ERROR_CODES.TOKEN_EXPIRED) {
				const { [COOKIE_KEYS.REFRESH_TOKEN]: refreshToken } = parseCookies();
				api
					.post<RefreshTokenResponse>('/refresh', { refreshToken })
					.then(({ data: { token, refreshToken: newRefreshToken } }) => {
						setCookieToken(token);
						setCookieRefreshToken(newRefreshToken);
						api.defaults.headers.common.Authorization = `Bearer ${token}`;
					});
			} else {
				// deslogar usuario
			}
		}
	},
);
