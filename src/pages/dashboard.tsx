import { NextPage } from 'next';

import { useAuth } from '../hooks';
import { withSsrAuth } from '../utils/withSsrAuth';

const Dashboard: NextPage = () => {
	const { user } = useAuth();

	return <h1>Dashboard: {user?.email}</h1>;
};

export default Dashboard;

export const getServerSideProps = withSsrAuth(async () => {
	return { props: {} };
});
