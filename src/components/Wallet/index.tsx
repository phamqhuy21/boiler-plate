import { useState } from 'react';
import styled from 'styled-components';
import WalletTab from './Tab';
import Rewards from './Rewards';
import Onchain from './Onchain';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { fadeIn } from '../../styles/animation.style';
import WalletDepositIc from '../Icons/WalletDepositIc';
import WalletWithdrawIc from '../Icons/WalletWithdrawIc';
import WalletHistoryIc from '../Icons/WalletHistoryIc';

export interface IAsset {
	tokenUrl: string;
	token: string;
	amount: string;
	symbol: string;
	canWithdrawal: boolean;
	showWithdrawal: boolean;
}

enum AssetType {
	REWARD = 'REWARD',
	ONCHAIN = 'ONCHAIN',
	DEPOSIT = 'DEPOSIT',
	WITHDRAW = 'WITHDRAW',
	HISTORY = 'HISTORY',
}

const Wallet = () => {
	const [assetType, setAssetType] = useState<AssetType>(AssetType.REWARD);
	const navigate = useNavigate();

	return (
		<>
			<Wrapper>
				<HeaderWrapper>
					<Header>
						<Title>Wallet</Title>
						<SubTitle>This wallet manages assets</SubTitle>
					</Header>
					<TabsWrapper>
						<WalletTab
							isActive={assetType === AssetType.REWARD}
							tabName="Rewards"
							select={() => {
								setAssetType(AssetType.REWARD);
							}}
						/>
						<WalletTab
							isActive={assetType === AssetType.ONCHAIN}
							tabName="On chain"
							select={() => {
								setAssetType(AssetType.ONCHAIN);
							}}
						/>
					</TabsWrapper>
					<SpaceBlock />
					<TabsWrapper col={3}>
						<WalletTab
							isSubTab
							isActive={assetType === AssetType.DEPOSIT}
							tabName="Deposit"
							select={() => {
								navigate(ROUTES.DEPOSIT);
							}}
							icon={<WalletDepositIc />}
						/>
						<WalletTab
							isSubTab
							isActive={assetType === AssetType.WITHDRAW}
							tabName="Withdraw"
							select={() => {
								navigate(ROUTES.WITHDRAWAL);
							}}
							icon={<WalletWithdrawIc />}
						/>
						<WalletTab
							isSubTab
							isActive={assetType === AssetType.HISTORY}
							tabName="History"
							select={() => {
								navigate(ROUTES.WALLET_HISTORY);
							}}
							icon={<WalletHistoryIc />}
						/>
					</TabsWrapper>
				</HeaderWrapper>
				{assetType === AssetType.REWARD && <Rewards />}
				{assetType === AssetType.ONCHAIN && <Onchain />}
			</Wrapper>
		</>
	);
};

export default Wallet;

const Wrapper = styled.div`
	/* padding: 20px 16px; */
	display: flex;
	flex-direction: column;
	gap: 18px;
	animation: ${fadeIn} 0.5s ease;
	background-image: url('/images/layout/light.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center -65px;
`;
const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin-top: 20px;
	margin-bottom: 18px;
`;
const Title = styled.p`
	font-family: SF Pro Display;
	font-weight: 700;
	font-size: 18px;
	line-height: 100%;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffff;
`;
const SubTitle = styled.p`
	font-family: SF Pro Display;
	font-weight: 500;
	font-size: 14px;
	line-height: 100%;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffff99;
`;

const TabsWrapper = styled.div<{ col?: number }>`
	display: grid;
	grid-template-columns: ${({ col }) =>
		col ? `repeat(${col}, 1fr)` : 'repeat(2, 1fr)'};
	width: 100%;
	gap: 10px;
`;

const SpaceBlock = styled.div`
	height: 10px;
`;
