import BaseRequest from './BaseRequest';

export class NotificationRequest extends BaseRequest {
	async getListUnRead() {
		return this.get('/notifications', { isRead: false });
	}
	async read(id: string) {
		return this.patch(`/notifications/${id}/read`);
	}
	async readAll() {
		return this.patch(`/notifications/read`);
	}
}
