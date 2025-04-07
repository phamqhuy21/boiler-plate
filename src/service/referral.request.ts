import BaseRequest from './BaseRequest';

class ReferralRequest extends BaseRequest {
	async getInviters(params?: Params) {
		return this.get('/referral/inviters', params);
	}
	async createReferralInit() {
		return this.post('/referral/init');
	}
	async getProfile() {
		return this.get('/referral/profile');
	}
	async getSummary() {
		return this.get('/referral/summary');
	}
	async payJoinWithCode() {
		return this.post('/referral/pay-join-with-code');
	}
	async countActiveNetwork() {
		return this.get('/referral/count-active-network');
	}
	async getListNetwork(params?: ListNetworkParams) {
		return this.get(`/referral/list-network`, params);
	}
	async getMyRankOverall() {
		return this.get('/referral/my-rank-overral');
	}
}

export default ReferralRequest;
