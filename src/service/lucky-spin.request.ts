import BaseRequest from './BaseRequest';

export class LuckySpinRequest extends BaseRequest {
	async getProfile() {
		return this.get('/lucky-spin/profile');
	}
	async getConfig() {
		return this.get('/lucky-spin/currency-reward');
	}
	async spin() {
		return this.post('/lucky-spin/spin');
	}
	async getSpins(params?: SpinParams) {
		return this.get('/lucky-spin/spins', params);
	}
}
