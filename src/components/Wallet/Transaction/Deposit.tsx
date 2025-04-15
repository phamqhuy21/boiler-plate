import styled from 'styled-components';
import './transaction.css';
import { fadeIn } from '../../../styles/animation.style';
import ButtonUI from '../../Button';
import { Button, Flex, Form, Input, Modal, QRCode, Select } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import ArrowSquareIc from '../../Icons/ArrowSquareIc';
import CopySecondIc from '../../Icons/CopySecondIc';

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
						<ButtonUI type="submit">Save & Share Address</ButtonUI>
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
			{/* <ImportantModal confirmText="Both a memo/tag and an address are required to successfully deposit your assets to PadTON" /> */}
		</>
	);
};

export default Deposit;

export const Wrapper = styled.div`
	min-height: 100vh;
	color: #fff;
	background-image: url('/images/layout/light.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center -65px;
	animation: ${fadeIn} 0.5s ease;
	box-sizing: border-box;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Title = styled.div`
	color: var(--Main, var(--Native-text_color, #fff));
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	text-align: center;
`;

export const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const StyledFormItem = styled(Form.Item)`
	margin-bottom: 0;
	.ant-col {
		gap: 10px;
		display: flex;
		flex-direction: column;
	}
	.ant-form-item-explain-error {
		color: #d43637;
		font-family: Poppins;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px; /* 150% */
	}
	svg {
		cursor: pointer;
	}
`;

export const StyledSelect = styled(Select)`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 46px;
	color: #fff !important;
	.rc-virtual-list {
		background: var(
			--Button-Linear,
			linear-gradient(90deg, #082954 0%, #143b6e 100%)
		) !important;
	}
	.ant-select-selector {
		background: var(
			--Button-Linear,
			linear-gradient(90deg, #082954 0%, #143b6e 100%)
		) !important;
		border-radius: 10px;
		border: none !important;
		backdrop-filter: blur(13px);
		padding: 10px 12px !important;
		height: 46px !important;
		box-sizing: border-box;
		color: #fff !important;
	}
	.ant-select-selection-placeholder {
		color: rgba(255, 255, 255, 0.6);
		font-family: Poppins !important;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px !important; /* 185.714% */
	}
	.ant-select-selection-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #fff !important;
		.ant-typography {
			color: #fff;
			font-family: Poppins !important;
			font-size: 14px;
			font-style: normal;
			font-weight: 500 !important;
			line-height: 26px !important; /* 185.714% */
		}
	}
	::after {
		line-height: 0 !important;
	}
`;

export const LabelBlock = styled.div<{ required?: boolean }>`
	color: var(--Native-text_color, #fff);
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	&::before {
		content: ${(props) => (props.required ? '* ' : '')};
		color: #ff4d4f;
	}
`;

export const StyledInput = styled(Input)`
	padding: 10px 12px;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	) !important;
	border: none;
	color: #fff;
	font-family: Poppins !important;
	font-size: 14px;
	font-style: normal;
	font-weight: 500 !important;
	line-height: 26px !important; /* 185.714% */
	::placeholder {
		color: rgba(255, 255, 255, 0.6) !important;
		font-family: Poppins !important;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px !important;
	}
	input:disabled {
		color: #fff !important;
		opacity: 1 !important;
	}
`;

export const FieldItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const FieldItemButton = styled.div`
	width: 100%;
	max-width: 306px;
	margin: 0 auto;
	margin-top: 10px;
`;

export const OptionIcon = styled.img`
	width: 26px;
	height: 26px;
	margin-inline-end: 0px;
`;

export const OptionValue = styled.span``;

export const StyledOptionLabel = styled.div`
	display: flex;
	color: #fff;
	gap: 10px;
	align-items: center;
`;

export const StyledQRCode = styled(QRCode)`
	background: #fff !important;
	padding: 6px;
	margin: 0 auto;
`;

export const ErrorText = styled.div`
	color: #d43637;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px; /* 150% */
`;

export const StyledModal = styled(Modal)`
	.ant-modal-content {
		background: linear-gradient(90deg, #082954 0%, #143b6e 100%) !important;
	}
	.ant-modal-close {
		color: #fff !important;
	}
`;

export const ModalContent = styled.div`
	color: #fff;
	font-size: 12px;
	font-family: Poppins;
	text-align: center;
	padding: 0 16px;
`;

export const ButtonPrimaryPopup = styled(Button)`
	width: 100%;
	border-radius: 10px;
	background: #00abeb;
	height: 45px;

	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 600;
	line-height: 21px;
	flex: 1;
`;

export const StyledQRCodeOutlined = styled(QrcodeOutlined)`
	color: #ffffff99;
	font-size: 20px;
`;
