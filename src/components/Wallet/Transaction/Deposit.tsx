/* eslint-disable @typescript-eslint/no-empty-function */
import styled from 'styled-components';
import './transaction.css';
import { fadeIn } from '../../../styles/animation.style';
import ButtonUI from '../../Button';
import { Button, Flex, Form, Input, Modal, QRCode, Select } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import ArrowSquareIc from '../../Icons/ArrowSquareIc';
import CopySecondIc from '../../Icons/CopySecondIc';
import DepositInfoPopup from './DepositInfoPopup';
import ImportantModal from '../ImportantModal';
import {
	FieldItem,
	FieldItemButton,
	LabelBlock,
	StyledForm,
	StyledFormItem,
	StyledInput,
	StyledQRCode,
	StyledSelect,
	Title,
	Wrapper,
} from './index.styled';

// const networks = [
// 	{
// 		label: 'TON Network',
// 		value: Network.TON,
// 		icon: 'TON',
// 	},
// 	{
// 		label: 'Binance Smart Chain',
// 		value: Network.BSC,
// 		icon: 'BNB',
// 	},
// ];

export interface IDeposit {
	network: string;
	walletAddress: string;
	memo: string;
	token: string;
}

const Deposit = () => {
	// const queryClient = useQueryClient();
	const [form] = Form.useForm();
	const network = Form.useWatch('network', form);
	const token = Form.useWatch('token', form);
	const memo = Form.useWatch('memo', form);
	// const currencies = useAppSelector((state) => state.wallet.currencies);
	// const [loading, setLoading] = useState(true);
	// const wallets = useAppSelector((state) => state.wallet.wallets);
	// const [open, setOpen] = useState(false);
	// const [depositInfo, setDepositInfo] = useState<IDeposit>();
	// const [depositSettings, setDepositSettings] = useState<DepositSetting[]>([]);
	// const [accounts, setAccounts] = useState<PaymentWallet['info']['accounts']>(
	// 	[]
	// );
	// const depositSetting = useMemo(
	// 	() =>
	// 		depositSettings?.find(
	// 			(item) => item.network === network && item.symbol === token
	// 		),
	// 	[depositSettings, network, token]
	// );

	// const account = useMemo(() => {
	// 	let networkType = network;
	// 	if (network === Network.BSC) networkType = 'BINANCE';
	// 	return accounts?.find(
	// 		(item) => item.networkType === networkType && item.symbol === token
	// 	);
	// }, [accounts, network, token]);

	// const tokenOptions: SelectProps['options'] = useMemo(() => {
	// 	return wallets
	// 		.filter((wallet) => {
	// 			const tokenSetting = depositSettings.find(
	// 				(cur) => cur.symbol === wallet.symbol
	// 			);
	// 			return !!tokenSetting;
	// 		})
	// 		.map((wallet) => {
	// 			const currency = currencies.find((cur) => cur.symbol === wallet.symbol);
	// 			return {
	// 				label: (
	// 					<StyledOptionLabel>
	// 						<OptionIcon src={currency?.logo || ''} alt={wallet.symbol} />
	// 						<OptionValue>{wallet.symbol}</OptionValue>
	// 					</StyledOptionLabel>
	// 				),
	// 				value: wallet.symbol,
	// 			};
	// 		});
	// }, [currencies, depositSettings, wallets]);

	// const networkOptions: SelectProps['options'] = useMemo(() => {
	// 	return networks
	// 		.filter((network) => {
	// 			return !!depositSettings
	// 				.filter((item) => item.symbol === token)
	// 				.find((item) => item.network === network.value);
	// 		})
	// 		.map((item) => ({
	// 			label: (
	// 				<StyledOptionLabel>
	// 					<OptionIcon
	// 						src={`/images/tokens/${item.icon}.svg`}
	// 						alt={item.icon}
	// 					/>
	// 					<OptionValue>{item.label}</OptionValue>
	// 				</StyledOptionLabel>
	// 			),
	// 			value: item.value,
	// 		}));
	// }, [depositSettings, token]);

	// const getCurrencyDepositSetting = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const res = await queryClient.fetchQuery({
	// 			queryKey: [QUERY_KEYS.GET_CURRENCY_DEPOSIT_SETTING],
	// 			queryFn: () => walletRequest.getCurrencyDepositSetting(),
	// 			staleTime: getStaleTime(30),
	// 		});
	// 		setDepositSettings(res.data.data);
	// 	} catch (error) {
	// 		console.log('error', error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// const getPaymentWallet = async (tokens: DepositSetting[]) => {
	// 	setLoading(true);
	// 	try {
	// 		const res = await queryClient.fetchQuery({
	// 			queryKey: [QUERY_KEYS.GET_PAYMENT_WALLET],
	// 			queryFn: () =>
	// 				walletRequest.getPaymentWallet({
	// 					pageSize: 100,
	// 				}),
	// 			staleTime: getStaleTime(30),
	// 		});
	// 		const resData = res.data?.data as PaymentWallet;
	// 		const info = resData?.info;
	// 		const checkTokens = tokens.every((token) =>
	// 			info?.accounts?.some((account) => token.symbol === account.symbol)
	// 		);
	// 		if (info && checkTokens) {
	// 			setAccounts(info.accounts);
	// 		} else {
	// 			const paymentWallet = await walletRequest.paymentWalletAccounts();
	// 			const checkTokens = tokens.every((token) =>
	// 				paymentWallet.data?.data?.info?.accounts?.some(
	// 					(account: any) => token.symbol === account.symbol
	// 				)
	// 			);
	// 			if (!checkTokens) {
	// 				toast.warning('Some tokens in the token list are not supported.');
	// 				return;
	// 			}
	// 			if (paymentWallet.data?.data?.info) {
	// 				setAccounts(paymentWallet.data?.data?.info.accounts);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!depositSettings.length) return;
	// 	const firstSupported = depositSettings[0];
	// 	form.setFieldsValue({
	// 		token: firstSupported.symbol,
	// 		network: firstSupported.network,
	// 	});
	// }, [form, depositSettings]);

	// useEffect(() => {
	// 	getCurrencyDepositSetting();
	// }, []);

	// useEffect(() => {
	// 	if (depositSettings) getPaymentWallet(depositSettings);
	// }, [depositSettings]);

	// useEffect(() => {
	// 	if (account) {
	// 		form.setFieldsValue({
	// 			walletAddress: account.depositAddress,
	// 			memo: account.memo,
	// 		});
	// 	} else {
	// 		form.setFieldsValue({
	// 			walletAddress: '',
	// 			memo: '',
	// 		});
	// 	}
	// }, [account]);

	const onFinish = async (values: any) => {
		console.log('values', values);
		// setDepositInfo(values);
		// setOpen(true);
	};

	// const onChangeToken = (token: any) => {
	// 	const filteredNetwork = networks.filter((network) => {
	// 		return !!depositSettings
	// 			.filter((item) => item.symbol === token)
	// 			.find((item) => item.network === network.value);
	// 	});
	// 	if (!filteredNetwork.length) return;
	// 	const firstSupported = filteredNetwork[0];
	// 	form.setFieldValue('network', firstSupported.value);
	// };

	// if (loading) return <Loading />;

	return (
		<>
			<Wrapper>
				<Title>Deposit</Title>
				<StyledQRCode
					// icon={
					// 	network
					// 		? `/images/tokens/${
					// 				network === Network.BSC ? 'BNB' : network
					// 		  }.svg`
					// 		: undefined
					// }
					icon={`/images/tokens/ton.svg`}
					value={'0xa43c4341D9e0A27a935B255Cb63eA7DE4A8a28da'}
				/>
				<StyledForm form={form} onFinish={onFinish} layout="vertical">
					<FieldItem>
						<LabelBlock>Select Token</LabelBlock>
						<StyledFormItem
							name={'token'}
							rules={[
								{
									required: true,
									message: 'Select Token is required',
								},
							]}
						>
							<StyledSelect
								popupClassName="select-network-wrapper"
								suffixIcon={<ArrowSquareIc />}
								// options={tokenOptions}
								// onChange={onChangeToken}
							/>
						</StyledFormItem>
					</FieldItem>
					<FieldItem>
						<LabelBlock>Network</LabelBlock>

						<StyledFormItem
							name={'network'}
							rules={[
								{
									required: true,
									message: 'Network is required',
								},
							]}
						>
							<StyledSelect
								popupClassName="select-network-wrapper"
								suffixIcon={<ArrowSquareIc />}
								options={[]}
							/>
						</StyledFormItem>
					</FieldItem>
					<FieldItem>
						<LabelBlock>Deposit Address</LabelBlock>
						<StyledFormItem name={'walletAddress'}>
							<StyledInput
								disabled
								suffix={
									<Flex gap={6}>
										<CopySecondIc
										// onClick={() => onCopy(account?.depositAddress || '')}
										/>
									</Flex>
								}
							/>
						</StyledFormItem>
						{/* {depositSetting?.supportMemo &&
							network === depositSetting?.network && (
								<ErrorText>
									Both a memo/tag and an address are required to successfully
									deposit your assets to PadTON
								</ErrorText>
							)} */}
					</FieldItem>
					{/* {depositSetting?.supportMemo &&
						network === depositSetting?.network && (
							<FieldItem>
								<LabelBlock>MEMO</LabelBlock>
								<StyledFormItem name={'memo'}>
									<StyledInput
										disabled
										suffix={
											<Flex gap={6}>
												<QrCodeMemoModal value={account?.memo || memo || ''} />
												<CopySecondIc
													onClick={() => onCopy(account?.memo || memo || '')}
												/>
											</Flex>
										}
									/>
								</StyledFormItem>
								<ErrorText>
									MEMO is required, or you will lose your coins
								</ErrorText>
							</FieldItem>
						)} */}
					<FieldItemButton>
						<ButtonUI type="submit" radius={'10px'}>
							<p>Save & Share Address</p>
						</ButtonUI>
					</FieldItemButton>
				</StyledForm>
			</Wrapper>
			{/* {depositInfo && (
				<DepositInfoPopup
					dataSource={depositInfo}
					onClose={() => setOpen(false)}
					open={open}
				/>
			)} */}
			<ImportantModal confirmText="Both a memo/tag and an address are required to successfully deposit your assets to Mario Coin" />
		</>
	);
};

export default Deposit;
