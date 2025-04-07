import BaseRequest from './BaseRequest';

export class MissionRequest extends BaseRequest {
	async getMissions() {
		return this.get('/missions');
	}

	async getSummary() {
		return this.get('/missions/summary');
	}

	async claim(id: string) {
		return this.patch(`/missions/${id}/claim`);
	}

	async start(id: string) {
		return this.patch(`/missions/${id}/start`);
	}
}
