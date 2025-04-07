import axios from 'axios';

const BASE_URL =
	process.env.REACT_APP_ENV === 'production'
		? 'https://tonapi.io/v2'
		: 'https://testnet.tonapi.io/v2';
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});
interface ExchangeRateParams {
	tokens: string;
	currencies: string;
}
const tonService = {
	getRates(params: ExchangeRateParams) {
		return axiosInstance.get('/rates', {
			params,
		});
	},
	getAssets(userAddress: string) {
		return axiosInstance.get(`/accounts/${userAddress}/jettons`);
	},
	getTonBalance(userAddress: string) {
		return axiosInstance.get(`accounts/${userAddress}`);
	},
	getJetton(address: string) {
		return axiosInstance.get(`/jettons/${address}`);
	},
	getJettonBalanceByOwnerAddress(ownerAddress: string, tokenAddress: string) {
		return axiosInstance.get(
			`/accounts/${ownerAddress}/jettons/${tokenAddress}`
		);
	},
};

export default tonService;
