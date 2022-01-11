import axios from 'axios';
import { parseCookies } from 'nookies';

import { COOKIE_KEY_TOKEN } from '../config/constants';

const cookies = parseCookies();

export const api = axios.create({
	baseURL: 'http://localhost:3333',
	headers: { Authorization: `Bearer ${cookies[COOKIE_KEY_TOKEN]}` },
});
