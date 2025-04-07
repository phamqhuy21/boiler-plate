import { Skeleton, Typography } from 'antd';
import styled from 'styled-components';
import ClockIc from '../Icons/ClockIc';
import { formatToken, getStaleTime } from '../../utils/common';
import { fadeIn } from '../../constants/css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useEffect, useState } from 'react';
import WalletTab from './Tab';
import WalletHistoryFilter from './WalletHistoryFilter';
import walletRequest from '../../service/wallet.request';
import moment from 'moment';
import { QUERY_KEYS, SearchTag, TransactionStatus } from '../../constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../redux/store';
import InfiniteLoad from '../../hooks/useInfiniteLoading';

export enum HistoryStatus {
	PENDING = 'Pending',
	SUCCESSFUL = 'Successful',
	FAIL = 'Fail',
}

export interface HistoryItem {
	action: string;
	amount: string | number;
	tokenName: string;
	tokenSymbol: string;
	dateTime: string;
	status: string;
	id: string;
	showDecimals: number;
	tokenUrl: string;
}

export enum Tab {
	WITHDRAW = 'withdraw',
	EARNED = 'earned',
	DEPOSIT = 'deposit',
}

const pageSize = 10;
const DEFAULT_PARAMS = {
	page: 1,
	pageSize,
	order: 'updatedAt desc',
	searchTag: Tab.DEPOSIT,
};

export const getStatusTransaction = (status: string) => {
	switch (status) {
		case TransactionStatus.PENDING:
		case TransactionStatus.PROCESSING:
		case TransactionStatus.WITHDRAW_CHECKING:
			return HistoryStatus.PENDING;

		case TransactionStatus.FAILED:
			return HistoryStatus.FAIL;

		case TransactionStatus.SUCCESS:
		case TransactionStatus.TRANSFERRED:
			return HistoryStatus.SUCCESSFUL;

		default:
			return '';
	}
};

export default function WalletHistory() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const currencies = useAppSelector((state) => state.wallet.currencies);
	const [histories, setHistories] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [params, setParams] = useState<TransactionParams>(DEFAULT_PARAMS);

	const onRerender = () => {
		setLoading(true);
		setHistories([]);
		setHasMore(true);
	};

	const onSelectTab = (tab: Tab) => {
		if (params.searchTag === tab) return;
		setParams({
			...DEFAULT_PARAMS,
			page: 1,
			searchTag: tab,
		});
		onRerender();
	};

	const getTransactions = async (transactionParams: TransactionParams) => {
		try {
			setLoading(true);
			if (!hasMore) return;
			let searchTag = transactionParams.searchTag;
			if (searchTag === Tab.EARNED) {
				searchTag = [
					SearchTag.CAMPAIGN,
					SearchTag.LUCKY_SPIN,
					SearchTag.MISSION,
					SearchTag.LOTTERY_PRIZE,
				].join(',');
			}
			const newParams = { ...transactionParams, searchTag };
			const res = await queryClient.fetchQuery({
				queryKey: [QUERY_KEYS.GET_TRANSACTIONS, newParams],
				queryFn: () => walletRequest.getTransactions(newParams),
				staleTime: getStaleTime(30),
			});
			const transactions = res.data.data as Transaction[];
			const end = transactionParams?.page && transactionParams.page * pageSize;
			if (
				transactions.length < pageSize ||
				(end && end >= res.data.meta.totalRecord)
			) {
				setHasMore(false);
			}
			const convertData = transactions.map((transaction) => {
				const currency = currencies.find(
					(cur) => cur.symbol === transaction.symbol
				);
				return {
					id: transaction.id,
					action: transaction.metadata.action.actionName,
					amount: transaction.amount,
					tokenName: transaction.symbol,
					tokenSymbol: transaction.symbol,
					dateTime: transaction.updatedAt
						? moment(transaction.updatedAt).format('hh:mm A, DD/MM/YYYY')
						: '',
					status: transaction.status
						? getStatusTransaction(transaction.status)
						: transaction.status,
					showDecimals: currency?.showDecimals || 3,
					tokenUrl: currency?.logo || '',
				};
			});
			setHistories((items) => [...items, ...convertData]);
		} catch (error) {
			console.log(error);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	};

	const onFilterConfirm = (values: {
		status?: HistoryStatus;
		startDate: string;
		endDate: string;
	}) => {
		const newParams = { ...params, page: 1 };
		if (values.status) {
			let statusParam = '';
			switch (values.status) {
				case HistoryStatus.PENDING:
					statusParam = `${TransactionStatus.PENDING},${TransactionStatus.PROCESSING}`;
					break;
				case HistoryStatus.FAIL:
					statusParam = `${TransactionStatus.FAILED}`;
					break;
				case HistoryStatus.SUCCESSFUL:
					statusParam = `${TransactionStatus.SUCCESS},${TransactionStatus.TRANSFERRED}`;
					break;
				default:
					break;
			}
			if (statusParam) {
				newParams.status = statusParam;
			}
		}
		if (values.startDate)
			newParams.fromDate = moment(values.startDate, 'YYYY-MM-DD')
				.startOf('day')
				.format('YYYY-MM-DD HH:mm');
		if (values.endDate)
			newParams.toDate = moment(values.endDate, 'YYYY-MM-DD')
				.endOf('day')
				.format('YYYY-MM-DD HH:mm');
		setParams(newParams);
		getTransactions(newParams);
		onRerender();
	};

	const onReset = () => {
		const newParams = { ...DEFAULT_PARAMS, searchTag: params.searchTag };
		onRerender();
		setParams(newParams);
		getTransactions(newParams);
	};

	useEffect(() => {
		getTransactions(params);
	}, [params.searchTag, params.page]);

	return (
		<Wrapper>
			<Title>History</Title>
			<WalletTabsWrapper>
				<WalletTab
					tabName={'Deposit'}
					isActive={params.searchTag === Tab.DEPOSIT}
					select={() => onSelectTab(Tab.DEPOSIT)}
				/>
				<WalletTab
					tabName={'Withdraw'}
					isActive={params.searchTag === Tab.WITHDRAW}
					select={() => onSelectTab(Tab.WITHDRAW)}
				/>

				<WalletTab
					tabName={'Earned'}
					isActive={params.searchTag === Tab.EARNED}
					select={() => onSelectTab(Tab.EARNED)}
				/>
			</WalletTabsWrapper>
			<WalletFilter>
				<WalletHistoryFilter
					onFilterConfirm={onFilterConfirm}
					onReset={onReset}
					tab={params.searchTag}
				/>
			</WalletFilter>
			<InfiniteLoad
				loadingComponent={<LoadingListRender />}
				data={histories}
				loading={loading}
				params={params}
				setParams={setParams}
				notFoundContent={
					<NotFound>
						<NotFoundImage src="/images/not-found.png" alt="not found" />
						<NotFoundText>No transactions have been made yet</NotFoundText>
					</NotFound>
				}
			>
				<List>
					{histories.map((historyItem) => (
						<CardWrapper
							key={
								historyItem.action + historyItem.amount + historyItem.tokenName
							}
							onClick={() =>
								navigate(`${ROUTES.TRANSACTION_DETAIL}?id=${historyItem.id}`)
							}
						>
							<InfoRow>
								<Text>{historyItem.action}</Text>
								<AmountWrapper>
									<Text weight={600}>
										{params.searchTag === Tab.DEPOSIT ? '+' : ''}
										{formatToken(historyItem.amount, historyItem.showDecimals)}
									</Text>
									<TokenIcon
										src={historyItem.tokenUrl}
										alt={historyItem.tokenName}
									/>
								</AmountWrapper>
							</InfoRow>
							<InfoRow>
								<TimeInfoWrapper>
									<ClockIconWrapper>
										<ClockIc />
									</ClockIconWrapper>

									<Text type="secondary">{historyItem.dateTime}</Text>
								</TimeInfoWrapper>

								<StatusTag status={historyItem.status}>
									<p>{historyItem.status}</p>
								</StatusTag>
							</InfoRow>
						</CardWrapper>
					))}
				</List>
			</InfiniteLoad>
		</Wrapper>
	);
}

const LoadingListRender = () => {
	return (
		<LoaderList>
			{Array.from({ length: 10 }, (_, i) => i).map((i) => (
				<LoaderItem key={i}>
					<LoaderLeft>
						<Skeleton.Input
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								width: '100%',
								minWidth: '100%',
								height: '16px',
								borderRadius: '5px',
							}}
						/>
						<Skeleton.Input
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								width: '100%',
								minWidth: '100%',
								height: '16px',
								borderRadius: '5px',
							}}
						/>
					</LoaderLeft>

					<LoaderRight>
						<Skeleton.Input
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								width: '100%',
								minWidth: '100%',
								height: '16px',
								borderRadius: '5px',
							}}
						/>
						<Skeleton.Input
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								width: '100%',
								minWidth: '100%',
								height: '16px',
								borderRadius: '5px',
							}}
						/>
					</LoaderRight>
				</LoaderItem>
			))}
		</LoaderList>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
	animation: ${fadeIn} 0.5s ease;
	background-image: url('/images/layout/light.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center -65px;
	animation: ${fadeIn} 0.5s ease;
	min-height: calc(100vh - 32px);
`;

const Title = styled(Typography)`
	font-size: 16px !important;
	font-weight: 600 !important;
	text-align: center;
`;

const WalletTabsWrapper = styled.div`
	display: flex;
	gap: 10px;
`;

const WalletFilter = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	animation: ${fadeIn} 0.5s ease;
`;

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 10px 16px;
	border-radius: 10px;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	);
`;

const InfoRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Text = styled.div<{
	weight?: number;
	type?: 'primary' | 'secondary';
}>`
	font-weight: ${(props) => props.weight || 500} !important;
	font-size: ${(props) =>
		props.type === 'secondary' ? '12px' : '14px'} !important;
	color: ${(props) =>
		props.type === 'secondary' ? '#B4B4B4' : '#fff'} !important;
	line-height: normal !important;
`;

const TimeInfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
`;

const ClockIconWrapper = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	path {
		fill: #b4b4b4;
	}
`;

const StatusTag = styled.div<{ status: string }>`
	border-radius: 5px;
	border: 1px solid
		${(props) =>
			props.status === HistoryStatus.SUCCESSFUL
				? '#15b643'
				: props.status === HistoryStatus.PENDING
				? '#FFAB35'
				: '#D43637'};
	background: rgba(0, 0, 0, 0.16);
	padding: 2px 10px;

	p {
		color: ${(props) =>
			props.status === HistoryStatus.SUCCESSFUL
				? '#15b643'
				: props.status === HistoryStatus.PENDING
				? '#FFAB35'
				: '#D43637'};
		text-align: center;
		font-family: Poppins;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px; /* 216.667% */
		margin: 0px;
	}
`;

const AmountWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;
const TokenIcon = styled.img`
	width: 16px;
	height: 16px;
`;

const NotFound = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	animation: ${fadeIn} 0.5s ease;
	flex-grow: 1;
`;
const NotFoundImage = styled.img`
	width: 130px;
	height: 110px;
`;
const NotFoundText = styled.div`
	color: var(--Native-text_color, #fff);
	text-align: center;
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 18px;
`;

const LoaderList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;
const LoaderItem = styled.div`
	display: flex;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	);
	height: 81px;
	border-radius: 10px;
	flex-direction: row;
	padding: 0 16px;
	gap: 80px;
	.ant-skeleton.ant-skeleton-element {
		width: 100% !important;
	}
`;

const LoaderLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
	width: 70%;
	height: 100%;
`;

const LoaderRight = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	height: 100%;
	gap: 16px;
	justify-content: center;
`;
