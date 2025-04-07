import { Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IAsset } from '.';
import { ROUTES } from '../../routes';
import HistoryIc from '../Icons/HistoryIc';
import Notfound from '../UI/NotFound';
import AssetItem from './AssetItem';

interface IProps {
	assets?: IAsset[];
	showHistory?: boolean;
	title: string;
	loading?: boolean;
	showSwap?: boolean;
}

export default function Assets({
	showHistory = false,
	assets,
	title,
	loading,
	showSwap,
}: IProps) {
	const [withdrawedAsset, setWithdrawedAsset] = useState<IAsset>();
	const navigate = useNavigate();
	return (
		<>
			<Wrapper>
				<Header>
					<LabelWrapper>
						<Label>{title}</Label>
					</LabelWrapper>

					{showHistory && (
						<HistoryWrapper
							onClick={() => {
								navigate(ROUTES.WALLET_HISTORY);
							}}
						>
							<HistoryIc />
							<HistoryText>History</HistoryText>
						</HistoryWrapper>
					)}
					{showSwap && (
						<HistoryWrapper
							onClick={() => {
								navigate(ROUTES.SWAP);
							}}
						>
							<HistoryText> Swap</HistoryText>
						</HistoryWrapper>
					)}
				</Header>
				{loading ? (
					new Array(5)
						.fill(0)
						.map((_, index) => <AssetItemPlacecholder key={index} />)
				) : (
					<>
						{!assets?.length ? (
							<Notfound content="No tokens found" />
						) : (
							<AssetsWrapper>
								{assets?.map((assetItem) => (
									<AssetItem
										key={assetItem.token}
										{...assetItem}
										onWithdraw={() => {
											navigate(`${ROUTES.WITHDRAWAL}?token=${assetItem.token}`);
											setWithdrawedAsset(assetItem);
										}}
									/>
								))}
							</AssetsWrapper>
						)}
					</>
				)}
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LabelWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const Label = styled(Typography.Text)`
	font-size: 16px !important;
	font-weight: 600 !important;
`;

const HistoryWrapper = styled.div`
	padding: 4px 14px;
	border-radius: 18px;
	background: rgba(255, 255, 255, 0.1);
	display: flex;
	align-items: center;
	gap: 4px;
`;

const HistoryText = styled(Typography.Text)`
	font-weight: 500 !important;
	line-height: 21px !important; /* 150% */
`;

const AssetsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const AssetItemPlacecholder = styled.div`
	height: 58px;
	width: 100%;
	border-radius: 10px;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	);
`;
