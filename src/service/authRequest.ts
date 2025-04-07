import BaseRequest from './BaseRequest';

const api = new BaseRequest();

const authRequest = {
	signIn(body: any) {
		return api.post('/auth/signin-with-telegram-miniapp', body);
	},
};

export default authRequest;
