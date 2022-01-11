import { AxiosError } from 'axios';
import Router from 'next/router';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api';
import { isEmptyObject } from '../utils';

// ========================================== AuthContext ==========================================

interface SignInCredentials {
	email: string;
	password: string;
}

interface User {
	email: string;
	permissions: string[];
	roles: string[];
}

interface AuthContextData {
	signIn(credentials: SignInCredentials): Promise<void>;
	isAuthenticated: boolean;
	user: User;
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

interface UserSession {
	permissions: string[];
	roles: string[];
	token: string;
	refreshToken: string;
}

const notifyError = (message: string) => toast.error(message, { theme: 'colored' });

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const isAuthenticated = !isEmptyObject(user);

	async function signIn({ email, password }: SignInCredentials) {
		try {
			const { data } = await api.post<UserSession>('/sessions', { email, password });
			setUser({
				email,
				permissions: data.permissions,
				roles: data.roles,
			});
			Router.push('/dashboard');
		} catch (error) {
			const axiosError = error as AxiosError<AuthenticationResponseError>;
			notifyError(axiosError.response?.data.message as string);
		}
	}

	const providerValues = useMemo(
		() => ({ signIn, isAuthenticated, user }),
		[isAuthenticated, user],
	);

	return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
}
