import BaseRequest from './BaseRequest';

export class CampaignRequest extends BaseRequest {
	async getAll(params?: CampaignParams) {
		return this.get('/campaign/all', params);
	}

	async getMyEvents(params?: MyEventParams) {
		return this.get(`/campaign/my-events`, params);
	}
	async getRanking(params?: MyEventParams) {
		return this.get(`/campaign/ranking`, params);
	}
	async joinCampaign(eventId: string) {
		return this.post(`/campaign/join`, { eventId });
	}
	async getMyRanking(id?: string) {
		return this.get(`/campaign/my-ranking`, { id });
	}
	async getRewards(id: string) {
		return this.get(`/campaign/rewards`, { id });
	}
	async getMyReward(id: string) {
		return this.get(`/campaign/my-reward`, { id });
	}
	async claimReward(id: string) {
		return this.post(`/campaign/${id}/claim-reward`);
	}
	async startMission(id: string, missionCode: string) {
		return this.post(
			`/campaign/${id}/start-mission?missionCode=${missionCode}`
		);
	}
	async claimMission(id: string, missionCode: string) {
		return this.post(
			`/campaign/${id}/claim-mission?missionCode=${missionCode}`
		);
	}
}
