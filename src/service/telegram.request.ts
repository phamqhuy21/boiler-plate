import BaseRequest from './BaseRequest';

export class TelegramRequest extends BaseRequest {
	async getLifeExpectancyReward() {
		return this.get('/telegram/life-expectancy-reward');
	}
	async payLifeExpectancy() {
		return this.post('/telegram/pay-life-expectancy');
	}
}
