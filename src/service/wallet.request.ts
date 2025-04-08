import { AxiosResponse } from 'axios';
import BaseRequest from './BaseRequest';

const api = new BaseRequest();
const walletRequest = {
	getWallets() {
		return api.get('/wallet/my-wallet');
	},
	withdraw(body: any) {
		return api.post('/wallet/withdraw', body);
	},
	getCurrencies() {
		return api.get('/wallet/currency');
	},
	getCurrencyWithdrawSetting(params?: any) {
		return api.get('/wallet/currency-withdraw-setting', params);
	},
	getCurrencyDepositSetting(params?: any) {
		return api.get('/wallet/currency-deposit-setting', params);
	},
	getTransactions(params?: any) {
		return api.get('/wallet/transaction', params);
	},
	getPaymentWallet(params?: any) {
		return api.get('/wallet/payment-wallet', params);
	},
	paymentWalletAccounts() {
		return api.post('/wallet/payment-wallet/accounts');
	},
};

export default walletRequest;
