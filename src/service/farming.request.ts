import BaseRequest from './BaseRequest';

export class FarmingRequest extends BaseRequest {
	async getFarmPoolLatest() {
		return this.get('/farm-pool/current');
	}

	async getGeneralInfo() {
		return this.get('/farm/general-info');
	}

	async createFarmPool() {
		return this.post('/farm-pool');
	}

	async claimFarmPool(id: string) {
		return this.patch(`/farm-pool/${id}/claim`);
	}
}
