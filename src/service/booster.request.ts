import BaseRequest from './BaseRequest';

export class BoosterRequest extends BaseRequest {
	async getPackages() {
		return this.get('/packages');
	}

	async getMyBoosters() {
		return this.get('/boosters/my-list');
	}

	async buy(id: string) {
		return this.post(`/packages/${id}/buy`);
	}
}
