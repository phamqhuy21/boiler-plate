import { AxiosResponse } from 'axios';
import BaseRequest from './BaseRequest';

const api = new BaseRequest();
const walletRequest = {
	getWallets() {
		return api.get('/wallet/my-wallet');
	},
	withdraw(body: WithdrawReq) {
		return api.post('/wallet/withdraw', body);
	},
	getCurrencies(): Promise<AxiosResponse<ResponseData<Currency[]>>> {
		return api.get('/wallet/currency');
	},
	getCurrencyWithdrawSetting(params?: CurrencyWithDrawSettingParams) {
		return api.get('/wallet/currency-withdraw-setting', params);
	},
	getCurrencyDepositSetting(params?: CurrencyWithDrawSettingParams) {
		return api.get('/wallet/currency-deposit-setting', params);
	},
	getTransactions(params?: TransactionParams) {
		return api.get('/wallet/transaction', params);
	},
	getPaymentWallet(params?: Params) {
		return api.get('/wallet/payment-wallet', params);
	},
	paymentWalletAccounts() {
		return api.post('/wallet/payment-wallet/accounts');
	},
};

export default walletRequest;
