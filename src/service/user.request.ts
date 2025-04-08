import BaseRequest from './BaseRequest';

const api = new BaseRequest();

export class UserRequest extends BaseRequest {
	async getMe() {
		return api.get('/users/me');
	}
	async linkWallet(walletAddress: string) {
		return api.patch('/users/link-wallet', { walletAddress });
	}
	async syncData(body: any) {
		return api.post('/users/sync-data', body);
	}
}
