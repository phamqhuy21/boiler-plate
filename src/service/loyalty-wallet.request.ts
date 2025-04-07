import { BalanceType, LoyaltyRewardType } from '../constants';
import BaseRequest from './BaseRequest';

export class LoyaltyWalletRequest extends BaseRequest {
	async getMyWallet() {
		return this.get('/loyalty-wallet');
	}
	async getBalance(type: BalanceType) {
		return this.get(`/loyalty-wallet/balance?type=${type}`);
	}
	async getLoyaltyRewards(types: LoyaltyRewardType[]) {
		return this.get('/loyalty-rewards', { types });
	}
}
