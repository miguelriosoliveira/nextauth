import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

import { COOKIE_KEYS } from '../config/constants';

export function withSsrGuest<T>(callback: GetServerSideProps<T>) {
	return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
		const cookies = parseCookies(context);

		if (cookies[COOKIE_KEYS.TOKEN]) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false,
				},
			};
		}

		return callback(context);
	};
}
