import { createContext, ReactNode, useMemo } from 'react';

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

export function AuthProvider({ children }: AuthProviderProps) {
	const isAuthenticated = false;

	async function signIn({ email, password }: SignInCredentials) {
		console.log({ email, password });
	}
	// const providerValues = useMemo(() => ({ signIn, isAuthenticated }), [isAuthenticated]);

	return (
		<AuthContext.Provider value={{ signIn, isAuthenticated }}>{children}</AuthContext.Provider>
	);
}
