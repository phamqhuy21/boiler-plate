import { Form, Input, Modal, SelectProps, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ArrowSquareIc from '../../Icons/ArrowSquareIc';
import ScanIc from '../../Icons/ScanIc';
import { formatToken, getStaleTime } from '../../../utils/common';
import './transaction.css';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import BigNumber from 'bignumber.js';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '../../UI/Button/ButtonUI';
import walletRequest from '../../../service/wallet.request';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../routes';
import { getWalletReq } from '../../../redux/actions/wallet.action';
import { fadeIn } from '../../../constants/css';
import { Address } from '@ton/core';
import { isAddress } from 'ethers';
import { useQueryClient } from '@tanstack/react-query';
import { Network, QUERY_KEYS } from '../../../constants';
import Loading from '../../UI/Loading';
import {
	FieldItem,
	LabelBlock,
	OptionValue,
	StyledFormItem,
	StyledOptionLabel,
	StyledSelect,
} from './index.styled';

const networks = [
	{ value: Network.TON, label: 'TON Network', icon: 'TON' },
	{
		value: Network.BSC,
		label: 'Binance Smart Chain',
		icon: 'BSC',
	},
];

export default function Withdrawal() {
	const queryClient = useQueryClient();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const [token, setToken] = useState('');
	const currencies = useAppSelector((state) => state.wallet.currencies);
	const wallets = useAppSelector((state) => state.wallet.wallets);
	const isLoadingWallet = useAppSelector(
		(state) => state.wallet.isLoadingWallet
	);
	const [showAlert, setShowAlert] = useState(false);
	const [showFullDesc, setShowFullDesc] = useState(false);
	const [dataSources, setDataSources] = useState<WalletResponse[]>([]);
	const [withdrawalSettings, setWithdrawalSettings] = useState<
		WithdrawalSetting[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [isWithdrawing, setIsWithdrawing] = useState(false);

	const getCurrencyBySymbol = (symbol: string) => {
		return currencies.find((currency) => currency.symbol === symbol);
	};
	const withdrawToken = useMemo(
		() => dataSources.find((item) => item.symbol === token),
		[dataSources, token]
	);
	const tokenOptions: SelectProps['options'] = useMemo(() => {
		return wallets
			.filter((wallet) => {
				const tokenSetting = withdrawalSettings.find(
					(cur) => cur.symbol === wallet.symbol
				);
				return !!tokenSetting;
			})
			.map((wallet) => {
				const currency = currencies.find((cur) => cur.symbol === wallet.symbol);
				return {
					label: (
						<StyledOptionLabel>
							<OptionIcon src={currency?.logo || ''} alt={wallet.symbol} />
							<OptionValue>{wallet.symbol}</OptionValue>
						</StyledOptionLabel>
					),
					value: wallet.symbol,
				};
			});
	}, [currencies, withdrawalSettings, wallets]);
	const networkOptions: SelectProps['options'] = useMemo(() => {
		return networks
			.filter((network) => {
				return !!withdrawalSettings
					.filter((item) => item.symbol === token)
					.find((item) => item.network === network.value);
			})
			.map((item) => ({
				label: (
					<StyledOptionLabel>
						<OptionIcon
							src={`/images/tokens/${item.icon}.svg`}
							alt={item.icon}
						/>
						<OptionValue>{item.label}</OptionValue>
					</StyledOptionLabel>
				),
				value: item.value,
			}));
	}, [withdrawalSettings, token]);
	const network = Form.useWatch('network', form);
	const withdrawalSetting = useMemo(
		() =>
			withdrawalSettings.find(
				(item) => item.network === network && item.symbol === token
			),
		[withdrawalSettings, network, token]
	);

	const amount = Form.useWatch('amount', form);
	const isInvalidAmount = useMemo(() => {
		return (
			!amount ||
			isNaN(parseFloat(amount)) ||
			new BigNumber(amount).eq(0) ||
			!withdrawalSetting ||
			new BigNumber(amount).isLessThan(withdrawalSetting.minAmount)
		);
	}, [amount, withdrawalSetting]);

	const fee = useMemo(() => {
		if (isInvalidAmount) return 0;
		const fee = new BigNumber(amount)
			.multipliedBy(withdrawalSetting?.fee || 0)
			.plus(withdrawalSetting?.flatFee || 0)
			.toNumber();
		return fee;
	}, [isInvalidAmount, amount, withdrawalSetting]);

	const receiveAmount = useMemo(() => {
		if (isInvalidAmount) return 0;
		return new BigNumber(amount).minus(fee).toNumber();
	}, [amount, fee, isInvalidAmount]);

	const isMobile = /iphone|ipad|ipod|ios|android|XiaoMi|MiuiBrowser/i.test(
		navigator.userAgent
	);

	useEffect(() => {
		if (!user?.id) return;
		getCurrencyWithdrawSetting();
		dispatch(getWalletReq());
	}, [token, user?.id]);

	useEffect(() => {
		if (!withdrawalSettings.length) return;
		const firstSupported = withdrawalSettings[0];
		form.setFieldsValue({
			token: firstSupported.symbol,
			network: firstSupported.network,
		});
		setToken(firstSupported.symbol);
	}, [form, withdrawalSettings]);

	useEffect(() => {
		if (wallets.length) {
			const convertData: WalletResponse[] = wallets.filter(
				(wallet) =>
					new BigNumber(wallet.availableBalance).isGreaterThan(0) &&
					currencies.find((cur) => cur.symbol === wallet.symbol)
			);

			setDataSources(convertData);
		}
	}, [wallets, currencies]);

	const onOpenScanner = () => {
		try {
			if (!isMobile) {
				setShowAlert(true);
			} else {
				(window as any)?.Telegram?.WebApp?.showScanQrPopup(
					{ text: 'Scan QR Code' },
					(data: string) => {
						form.setFieldsValue({ walletAddress: data });
						(window as any)?.Telegram?.WebApp?.closeScanQrPopup();
					}
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onOpenScannerMemo = () => {
		try {
			if (!isMobile) {
				setShowAlert(true);
			} else {
				(window as any)?.Telegram?.WebApp?.showScanQrPopup(
					{ text: 'Scan QR Code' },
					(data: string) => {
						form.setFieldsValue({ memo: data });
						(window as any)?.Telegram?.WebApp?.closeScanQrPopup();
					}
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onMaxAmount = () => {
		form.setFieldValue('amount', withdrawToken?.availableBalance);
		form.validateFields(['amount']);
	};

	const checkValidAddress = (address: string, network: string) => {
		try {
			if (network === Network.TON) {
				return !!Address.parse(address);
			}
			if (network === Network.BSC) {
				return !!isAddress(address);
			}
			return false;
		} catch (error: any) {
			console.log('error', error);
		}
	};
	const onFinishForm = async (values: any) => {
		if (isWithdrawing || !withdrawToken) {
			return;
		}
		const isValidAddress = checkValidAddress(
			values.walletAddress,
			values.network
		);
		if (!isValidAddress) {
			toast.error('Invalid address');
			return;
		}

		try {
			setIsWithdrawing(true);
			const res = await walletRequest.withdraw({
				...values,
				symbol: withdrawToken.symbol,
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
			});
			toast.success('Withdraw successfully');
			navigate(`${ROUTES.TRANSACTION_DETAIL}?id=${res.data.data.id}`);
		} catch (error: any) {
			console.log('error', error);
			toast.error(error?.response?.data?.message || 'Withdraw failed');
		} finally {
			setIsWithdrawing(false);
		}
	};

	const getCurrencyWithdrawSetting = async () => {
		try {
			setLoading(true);
			const res = await queryClient.fetchQuery({
				queryKey: [QUERY_KEYS.GET_CURRENCY_WITHDRAW_SETTING],
				queryFn: () => walletRequest.getCurrencyWithdrawSetting(),
				staleTime: getStaleTime(30),
			});
			setWithdrawalSettings(res.data.data);
		} catch (error) {
			console.log('error', error);
		} finally {
			setLoading(false);
		}
	};

	const onChangeToken = (token: any) => {
		if (!token) return;
		const filteredNetwork = networks.filter((network) => {
			return !!withdrawalSettings
				.filter((item) => item.symbol === token)
				.find((item) => item.network === network.value);
		});
		if (!filteredNetwork.length) return;
		const firstSupported = filteredNetwork[0];
		form.setFieldValue('network', firstSupported.value);
		setToken(token.toString());
	};

	return (
		<>
			{loading || isLoadingWallet ? (
				<Loading />
			) : (
				<Wrapper>
					<FormUI
						layout="vertical"
						form={form}
						onFinish={onFinishForm}
						autoComplete="off"
						// onFinishFailed={onFinishFailed}
					>
						<Title>Withdraw</Title>

						<FieldItem>
							<LabelBlock>Select Token</LabelBlock>
							<StyledFormItem name={'token'}>
								<StyledSelect
									popupClassName="select-network-wrapper"
									suffixIcon={<ArrowSquareIc />}
									options={tokenOptions}
									onChange={onChangeToken}
								/>
							</StyledFormItem>
						</FieldItem>
						<SpaceFieldItemBlock />

						<FormItemUI
							name="walletAddress"
							label="Address"
							rules={[
								{
									required: true,
									message: 'Please input address',
								},
							]}
						>
							<InputUI
								placeholder="Long press to paste"
								suffix={
									<ScanIconWrapper onClick={onOpenScanner}>
										<ScanIc />
									</ScanIconWrapper>
								}
							/>
						</FormItemUI>
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
									options={networkOptions}
								/>
							</StyledFormItem>
						</FieldItem>
						<SpaceFieldItemBlock />
						{withdrawalSetting?.supportMemo &&
							network === withdrawalSetting?.network && (
								<FormItemUI name="memo" label="MEMO">
									<InputUI
										placeholder="Long press to paste"
										suffix={
											<ScanIconWrapper onClick={onOpenScannerMemo}>
												<ScanIc />
											</ScanIconWrapper>
										}
									/>
								</FormItemUI>
							)}
						<FormItemUI
							name="amount"
							label="Amount"
							rules={[
								{
									required: true,
									message: 'Please input amount',
								},
								{
									pattern: /^[0-9]*[.,]?[0-9]*$/,
									message: 'Invalid amount',
								},
								{
									validator: (_, value) => {
										if (
											new BigNumber(value).isGreaterThan(
												withdrawToken?.availableBalance || 0
											)
										) {
											return Promise.reject('Insufficient balance');
										}
										if (
											new BigNumber(value).isLessThan(
												withdrawalSetting?.minAmount || 0
											)
										) {
											return Promise.reject(
												'Amount must be greater than or equal to minimum'
											);
										}
										if (
											new BigNumber(value).isGreaterThan(
												withdrawalSetting?.maxAmount || 0
											)
										) {
											return Promise.reject(
												`Amount must be less than or equal to maximum withdrawal amount: ${withdrawalSetting?.maxAmount}`
											);
										}
										return Promise.resolve();
									},
								},
							]}
						>
							<InputUI
								type="number"
								placeholder={`Minimum ${withdrawalSetting?.minAmount || 0} `}
								suffix={
									<>
										<CurrencyIcon
											src={
												getCurrencyBySymbol(withdrawToken?.symbol || token)
													?.logo || ''
											}
										/>
										<CurrencyAffixText>
											{withdrawToken?.symbol || token}
										</CurrencyAffixText>
										<AmountMaxBtn onClick={onMaxAmount}>Max</AmountMaxBtn>
									</>
								}
							/>
						</FormItemUI>
						<AvailableWrapper>
							<Typography.Text>Available</Typography.Text>
							<Typography.Text>
								{withdrawToken?.availableBalance
									? formatToken(withdrawToken.availableBalance, 10)
									: '0'}{' '}
								{withdrawToken?.symbol}
							</Typography.Text>
						</AvailableWrapper>
						<Disclaimer>Disclaimer for Using the Withdraw Function</Disclaimer>
						<DisclaimerShortDesc>
							By using the Withdraw function on PadTON, you agree to the
							following terms:
						</DisclaimerShortDesc>
						{!showFullDesc ? (
							<LearnMoreBtn onClick={() => setShowFullDesc(true)}>
								Learn more
							</LearnMoreBtn>
						) : (
							<DisclaimerShortDesc>
								<div>
									<strong>1. Transaction risks:</strong> Cryptocurrency
									transactions may involve risks due to market volatility,
									network congestion, or smart contract errors. PadTON is not
									liable for any damages resulting from these risks.
								</div>
								<div>
									<strong>2. User responsibility:</strong> You are responsible
									for providing accurate wallet information and withdrawal
									amounts. PadTON is not responsible for any errors caused by
									incorrect information input.
								</div>
								<div>
									<strong>3. Acknowledgement:</strong> By using Withdraw, you
									accept the associated risks and agree to comply with
									applicable laws.{' '}
								</div>
								<div>
									<strong>4. Terms updates:</strong> PadTON reserves the right
									to update these terms without prior notice. Continued use of
									the service after updates constitutes your acceptance of the
									new terms.
								</div>
							</DisclaimerShortDesc>
						)}
						<WithdrawalBlock>
							<LeftBlock>
								<Label>Receive amount</Label>
								<WithdrawValue>
									{formatToken(receiveAmount, 10)} {withdrawToken?.symbol}
								</WithdrawValue>
								<Label>
									Fee:{' '}
									<WithdrawFee>
										{formatToken(fee, 10)} {token}
									</WithdrawFee>
								</Label>
							</LeftBlock>
							<WithdrawBtn loading={isWithdrawing} htmlType="submit">
								Withdraw
							</WithdrawBtn>
						</WithdrawalBlock>
					</FormUI>
				</Wrapper>
			)}
			<StyledModal
				open={showAlert}
				onCancel={() => setShowAlert(false)}
				footer={[]}
				centered
			>
				<ModalContent>
					QR Codes are not supported on Desktop. <br />
					{`Please use one of Telegram's mobile apps`}
				</ModalContent>
			</StyledModal>
		</>
	);
}

const SpaceFieldItemBlock = styled.div`
	height: 12px;
`;

const LearnMoreBtn = styled.button`
	display: flex;
	padding: 6px 0px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 5px;
	border: 0.6px solid #fec424;
	height: 28px;
	width: 88px;
	box-sizing: border-box;
	background: transparent;

	color: #fec424;
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;

	margin-top: 10px;
`;

const DisclaimerShortDesc = styled.div`
	color: #fff;
	font-family: Poppins;
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	margin-top: 6px;
	display: flex;
	flex-direction: column;
	gap: 6px;
	animation: ${fadeIn} 0.3s ease;
	div {
		margin-left: 6px;
	}
`;

const Disclaimer = styled.div`
	margin-top: 24px;
	color: #3998ff;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
`;
const StyledModal = styled(Modal)`
	.ant-modal-content {
		background: linear-gradient(90deg, #082954 0%, #143b6e 100%) !important;
	}
	.ant-modal-close {
		color: #fff !important;
	}
`;
const ModalContent = styled.div`
	color: #fff;
	font-size: 12px;
	font-family: Poppins;
	text-align: center;
	padding: 0 16px;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	background-image: url('/images/layout/light.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center -65px;
	animation: ${fadeIn} 0.5s ease;
`;
const Title = styled(Typography)`
	font-size: 16px !important;
	font-weight: 600 !important;
	text-align: center;
`;
const FormUI = styled(Form)`
	padding: 16px 16px 116px 16px;
`;
const FormItemUI = styled(Form.Item)`
	margin-bottom: 12px;
	.ant-col {
		gap: 10px;
		display: flex;
		flex-direction: column;
	}
	.ant-form-item-explain-error {
		color: #ff4d4f;
		font-family: Poppins;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px; /* 150% */
	}
	.ant-form-item-label {
		padding-bottom: 10px !important;
		label {
			color: #fff !important;
			font-family: Poppins !important;
			font-size: 14px !important;
			font-weight: 400 !important;
			line-height: 20px !important; /* 142.857% */
		}
	}
`;
const InputUI = styled(Input)`
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
`;
const ScanIconWrapper = styled.span`
	line-height: 0px;
`;
const AmountMaxBtn = styled.span`
	color: var(--Web-White, var(--Native-text_color, #fff)) !important;
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.1);
	width: 41px;
`;
const CurrencyIcon = styled.img`
	width: 24px;
	height: 24px;
`;
// const SelectUI = styled(Select)`
// 	display: flex;
// 	align-items: center;
// 	.rc-virtual-list {
// 		background: var(
// 			--Button-Linear,
// 			linear-gradient(90deg, #082954 0%, #143b6e 100%)
// 		) !important;
// 	}
// 	.ant-select-selector {
// 		background: var(
// 			--Button-Linear,
// 			linear-gradient(90deg, #082954 0%, #143b6e 100%)
// 		) !important;
// 		border-radius: 10px;
// 		backdrop-filter: blur(13px);
// 		border: none !important;
// 		padding: 10px 12px !important;
// 		height: max-content !important;
// 	}
// 	.ant-select-selection-placeholder {
// 		color: rgba(255, 255, 255, 0.6);
// 		font-family: Poppins !important;
// 		font-size: 14px;
// 		font-style: normal;
// 		font-weight: 500;
// 		line-height: 26px !important; /* 185.714% */
// 	}
// 	.ant-select-selection-item {
// 		display: flex !important;
// 		align-items: center;
// 		gap: 8px;
// 		.ant-typography {
// 			color: #fff;
// 			font-family: Poppins !important;
// 			font-size: 14px;
// 			font-style: normal;
// 			font-weight: 500 !important;
// 			line-height: 26px !important; /* 185.714% */
// 		}
// 	}
// 	::after {
// 		line-height: 0 !important;
// 	}
// `;
// const SelectOptionUI = styled(Select.Option)`
// 	.ant-select-item-option-content {
// 		display: flex;
// 		align-items: center;
// 		gap: 8px;
// 	}
// `;
const OptionIcon = styled.img`
	width: 26px;
	height: 26px;
	margin-inline-end: 0px;
`;
// const OptionText = styled(Typography.Text)`
// 	font-weight: 500 !important;
// 	line-height: 26px !important; /* 185.714% */
// `;
const CurrencyAffixText = styled(Typography.Text)`
	font-weight: 500 !important;
	margin-left: 6px;
	margin-right: 10px;
`;
const AvailableWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.ant-typography {
		color: rgba(255, 255, 255, 0.6);
	}
`;

const WithdrawalBlock = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #0c2340;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 18px 16px 30px 16px;
	box-sizing: border-box;
	margin: 0 -16px;
	z-index: 1030;
`;

const Label = styled.div`
	color: #9e9e9e;
	font-family: Poppins;
	font-size: 12px;
	font-weight: 400;
	line-height: 20px;
`;

const WithdrawValue = styled.div`
	color: #fec424;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
`;

const WithdrawFee = styled.span`
	color: #fff;
`;

const WithdrawBtn = styled(ButtonUI)`
	height: 44px;
	width: 120px;
	transition: all 0.3s;
`;

const LeftBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
	flex: 1;
`;
