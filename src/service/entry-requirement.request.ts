import BaseRequest from './BaseRequest';

export class EntryRequirementRequest extends BaseRequest {
	async getRequirements() {
		return this.get('/entry-requirements/my-list');
	}

	async checkRequirment(id: string) {
		return this.get(`/entry-requirements/${id}/check`);
	}
	async verifyRequirement(id: string) {
		return this.post(`/entry-requirements/${id}/verify`);
	}
}
