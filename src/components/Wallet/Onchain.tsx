import { useState } from 'react';
import Assets from './Assets';
// import ConnectWallet from '../UI/ConnectWallet';
import { Typography } from 'antd';
import styled from 'styled-components';
import { IAsset } from '.';

const assets: IAsset[] = [
	{
		tokenUrl: '/images/tokens/ton.svg',
		token: 'TON',
		amount: '0',
		canWithdrawal: false,
		showWithdrawal: false,
		symbol: 'TON',
	},
	{
		tokenUrl: '/images/tokens/btc.svg',
		token: 'BTC',
		amount: '0',
		canWithdrawal: false,
		showWithdrawal: false,
		symbol: 'BTC',
	},
	{
		tokenUrl: '/images/tokens/eth.svg',
		token: 'ETH',
		amount: '0',
		canWithdrawal: false,
		showWithdrawal: false,
		symbol: 'ETH',
	},
];

export default function Onchain() {
	// const okxTonConnect = useAppSelector((state) => state.wallet.okxTonConnect);
	const [onchainAssets, setOnchainAssets] = useState(assets);
	// const userFriendlyAddress = useTonAddress();
	// const tonWallet = useTonWallet();
	// const [tonConnectUi] = useTonConnectUI();
	// const getAssets = async (address: string) => {
	// 	try {
	// 		const res = await tonService.getAssets(address);
	// 		const resBalanceTon = await tonService.getTonBalance(address);
	// 		const balances = res.data.balances;
	// 		const mapPriceAssets = assets.map((asset) => {
	// 			const findAssetBySymbol = balances.find(
	// 				(balance: any) => balance.jetton.symbol === asset.token
	// 			);
	// 			const decimals = findAssetBySymbol?.jetton.decimals || 0;
	// 			let balance = '0';
	// 			if (tonWallet && asset.symbol === 'TON') {
	// 				balance = resBalanceTon.data.balance
	// 					? new BigNumber(resBalanceTon.data.balance)
	// 							.dividedBy(`1e9`)
	// 							.toString()
	// 					: '0';
	// 			} else {
	// 				balance = findAssetBySymbol?.balance
	// 					? new BigNumber(findAssetBySymbol.balance)
	// 							.dividedBy(`1e${decimals}`)
	// 							.toString()
	// 					: '0';
	// 			}
	// 			return { ...asset, amount: balance || '0' };
	// 		});
	// 		setOnchainAssets(mapPriceAssets);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	const address =
	// 		userFriendlyAddress || okxTonConnect?.wallet?.account.address;
	// 	if (!address) return;
	// 	getAssets(address);
	// }, [okxTonConnect, userFriendlyAddress]);

	// useEffect(() => {
	// 	if (tonConnectUi.connected === false) setOnchainAssets(assets);
	// }, [tonConnectUi.connected]);

	return (
		<>
			<Title>Connect Wallet</Title>
			{/* <ConnectWallet /> */}
			<Assets title={'Tokens'} assets={onchainAssets} />
		</>
	);
}

const Title = styled(Typography.Text)`
	font-size: 16px !important;
	font-weight: 600 !important;
`;
