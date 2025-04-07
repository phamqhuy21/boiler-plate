import Assets from './Assets';

export default function Rewards() {
	// const queryClient = useQueryClient();
	// const currencies = useAppSelector((state) => state.wallet.currencies);
	// const wallets = useAppSelector((state) => state.wallet.wallets);
	// const isLoading = useAppSelector((state) => state.wallet.isLoadingWallet);
	// const balancePatc = useAppSelector((state) => state.loyaltyWallet.balance);
	// const [dataSources, setDataSources] = useState<IAsset[]>([]);
	// const [withdrawalSetting, setWithdrawalSetting] = useState<
	// 	WithdrawalSetting[]
	// >([]);
	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	if (wallets.length) {
	// 		const convertData: IAsset[] = wallets
	// 			.filter((wallet) =>
	// 				new BigNumber(wallet.availableBalance).isGreaterThan(0)
	// 			)
	// 			.map((wallet) => {
	// 				const currency = currencies.find(
	// 					(cur) => cur.symbol === wallet.symbol
	// 				);
	// 				const tokenSetting = withdrawalSetting.find(
	// 					(cur) => cur.symbol === wallet.symbol
	// 				);
	// 				// const limit = coinLimits.find((coin) => coin.token === wallet.symbol);
	// 				return {
	// 					tokenUrl: currency?.logo || '',
	// 					symbol: wallet.symbol,
	// 					token: wallet.symbol,
	// 					amount: currency?.showDecimals
	// 						? formatToken(wallet.availableBalance, currency?.showDecimals)
	// 						: new BigNumber(wallet.availableBalance).toString(),
	// 					canWithdrawal: !!tokenSetting || false,
	// 					showWithdrawal: true,
	// 				};
	// 			});
	// 		new BigNumber(balancePatc).isGreaterThan(0) &&
	// 			convertData.unshift({
	// 				tokenUrl: '/images/wallet/patc.svg?v=1',
	// 				symbol: 'PATC',
	// 				token: 'PATC',
	// 				amount: formatToken(balancePatc, 0),
	// 				canWithdrawal: false,
	// 				showWithdrawal: true,
	// 			});
	// 		setDataSources(convertData);
	// 	}
	// }, [wallets, balancePatc, withdrawalSetting]);

	// useEffect(() => {
	// 	dispatch(getWalletReq());
	// 	getWithdrawalConfig();
	// }, []);

	// const getWithdrawalConfig = async () => {
	// 	try {
	// 		const res = await queryClient.fetchQuery({
	// 			queryKey: [QUERY_KEYS.GET_CURRENCY_WITHDRAW_SETTING],
	// 			queryFn: () => walletRequest.getCurrencyWithdrawSetting(),
	// 			staleTime: getStaleTime(30),
	// 		});
	// 		setWithdrawalSetting(res.data.data);
	// 	} catch (error) {
	// 		console.log('error', error);
	// 	}
	// };
	return <Assets title={'Rewards'} assets={[]} loading={false} />;
}
