export const TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export const COOKIE_KEYS = Object.freeze({
	TOKEN: 'nextauth.token',
	REFRESH_TOKEN: 'nextauth.refreshToken',
});

export const ERROR_CODES = Object.freeze({
	TOKEN_EXPIRED: 'token.expired',
});
