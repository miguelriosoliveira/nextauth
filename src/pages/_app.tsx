import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../contexts';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
			<ToastContainer />
		</AuthProvider>
	);
}
