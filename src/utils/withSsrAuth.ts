import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

import { COOKIE_KEYS } from '../config/constants';

export function withSsrAuth<T>(callback: GetServerSideProps<T>) {
	return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
		const cookies = parseCookies(context);

		if (!cookies[COOKIE_KEYS.TOKEN]) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		return callback(context);
	};
}
