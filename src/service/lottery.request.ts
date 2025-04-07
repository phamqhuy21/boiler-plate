import BaseRequest from './BaseRequest';

export class LotteryRequest extends BaseRequest {
	async getLotteryPools(params?: LotteryParams) {
		return this.get('/lottery/all', params);
	}

	async buyTicket(body: BuyTicketBody) {
		return this.post('/lottery/buy-ticket', body);
	}

	async getPoolDetail(poolId: string) {
		return this.get(`/lottery/detail?poolId=${poolId}`);
	}

	async getMyTickets(params: GetTicketsParams) {
		return this.get('/lottery/my-tickets', params);
	}

	async getResultHistories(params: GetResultHistoriesParams) {
		return this.get('/lottery/result-history', params);
	}

	async getRandomTicket(poolId: string) {
		return this.get(`/lottery/random-ticket?poolId=${poolId}`);
	}

	async getTickets(params?: GetTicketsParams) {
		return this.get('/lottery/tickets', params);
	}
}
