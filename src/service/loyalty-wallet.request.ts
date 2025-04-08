import BaseRequest from './BaseRequest';

export class LoyaltyWalletRequest extends BaseRequest {
	async getMyWallet() {
		return this.get('/loyalty-wallet');
	}
	async getBalance(type: any) {
		return this.get(`/loyalty-wallet/balance?type=${type}`);
	}
	async getLoyaltyRewards(types: any[]) {
		return this.get('/loyalty-rewards', { types });
	}
}
