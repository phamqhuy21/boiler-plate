import axios from 'axios';
import { config } from '../config';

export const ACCESS_TOKEN = 'access_token';
const BASE_URL = config.base_url;
const PREFIX = '/api';

export default class BaseRequest {
	baseUrl: string;
	constructor() {
		this.baseUrl = BASE_URL;
		this.setAuth();
	}

	setAuth() {
		axios.interceptors.request.use(
			(config) => {
				const accessToken = localStorage.getItem(ACCESS_TOKEN);
				if (accessToken) {
					config.headers['Authorization'] = `Bearer ${accessToken}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}

	async get(path = '', params = {}): Promise<any> {
		try {
			return await axios.get(BASE_URL + PREFIX + path, {
				params: params,
			});
		} catch (error) {
			return this._errorHandler(error);
		}
	}
	async post(path = '', data = {}): Promise<any> {
		try {
			return await axios.post(BASE_URL + PREFIX + path, data);
		} catch (error) {
			return this._errorHandler(error);
		}
	}
	async put(path = '', data = {}): Promise<any> {
		try {
			return await axios.put(BASE_URL + PREFIX + path, data);
		} catch (error) {
			return this._errorHandler(error);
		}
	}
	async delete(path = '', params = {}): Promise<any> {
		try {
			return await axios.delete(BASE_URL + PREFIX + path, params);
		} catch (error) {
			return this._errorHandler(error);
		}
	}
	async patch(path = '', data = {}): Promise<any> {
		try {
			return await axios.patch(BASE_URL + PREFIX + path, data);
		} catch (error) {
			return this._errorHandler(error);
		}
	}
	async _errorHandler(err: any) {
		throw err;
	}
}
