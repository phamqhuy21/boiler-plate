import axios from 'axios';
import { config } from '../config';

const api = axios.create({
	baseURL: config.padton_api_url || '',
});

const fairlaunchRequest = {
	getPoolContent(params?: PoolContentParams) {
		return api.get(`/fair-launch/pool-content`, { params });
	},
};

export default fairlaunchRequest;
