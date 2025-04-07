import axios from 'axios';
import { config } from '../config';

const uploadRequest = {
	upload(file: File) {
		const formData = new FormData();
		formData.append('file', file);
		return axios.post(`${config.base_url}/api/upload`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
};

export default uploadRequest;
