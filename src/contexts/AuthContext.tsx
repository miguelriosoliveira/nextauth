import { AxiosError } from 'axios';
import { createContext, ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api';

// ========================================== AuthContext ==========================================

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	signIn(credentials: SignInCredentials): Promise<void>;
	isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

// ========================================= AuthProvider =========================================

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthenticationResponseError {
	error: boolean;
	message: string;
}
// const notifyError = (message: string) => toast.error(message, { theme: 'colored' });
const notifyError = (message: string) => toast.error(message, { theme: 'colored' });

async function signIn({ email, password }: SignInCredentials) {
	try {
		const { data } = await api.post('sessions', { email, password });
	} catch (error) {
		const axiosError = error as AxiosError<AuthenticationResponseError>;
		notifyError(axiosError.response?.data.message as string);
	}
}

export function AuthProvider({ children }: AuthProviderProps) {
	const isAuthenticated = false;

	const providerValues = useMemo(() => ({ signIn, isAuthenticated }), [isAuthenticated]);

	return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
}
