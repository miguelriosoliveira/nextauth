import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';

import { COOKIE_KEYS, REFRESH_TOKEN_MAX_AGE, TOKEN_MAX_AGE } from '../config/constants';

export function setCookieToken(token: string) {
	setCookie(null, COOKIE_KEYS.TOKEN, token, {
		maxAge: TOKEN_MAX_AGE,
		path: '/',
	});
}

export function setCookieRefreshToken(refreshToken: string) {
	setCookie(null, COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
		maxAge: REFRESH_TOKEN_MAX_AGE,
		path: '/',
	});
}

export function signOut() {
	destroyCookie(null, COOKIE_KEYS.TOKEN);
	destroyCookie(null, COOKIE_KEYS.REFRESH_TOKEN);
	Router.push('/');
}
