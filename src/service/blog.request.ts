import axios from 'axios';
import { config } from '../config';

const blogService = {
	getBlogs() {
		return axios.get(config.blog_url);
	},
};

export default blogService;
