import { NextPage } from 'next';

import { useAuth } from '../hooks';

const Dashboard: NextPage = () => {
	const { user } = useAuth();

	return <div>Dashboard: {user?.email}</div>;
};

export default Dashboard;
