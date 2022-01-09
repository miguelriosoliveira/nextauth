import { useAuth } from '../hooks';

import styles from '../styles/Home.module.css';

import Head from 'next/head';

import { ChangeEvent, FormEvent, useState } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const [fields, setFields] = useState({ email: '', password: '' });
	const { signIn, isAuthenticated } = useAuth();

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFields({ ...fields, [name]: value });
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		await signIn(fields);
	}

	return (
		<>
			<Head>
				<title>NextAuth</title>
				<meta name="description" content="An authorization/authentication study" />
			</Head>

			<form onSubmit={handleSubmit} className={styles.container}>
				<input type="email" name="email" value={fields.email} onChange={handleChange} />
				<input type="password" name="password" value={fields.password} onChange={handleChange} />
				<button type="submit">Entrar</button>
			</form>
		</>
	);
};

export default Home;
