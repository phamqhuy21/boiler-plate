import { Button, Typography } from 'antd';
import styled from 'styled-components';
import { IAsset } from '.';
interface IProps extends IAsset {
	onWithdraw?: () => void;
}
export default function AssetItem({
	token,
	amount,
	symbol,
	tokenUrl,
}: // canWithdrawal,
// showWithdrawal,
// onWithdraw,
IProps) {
	return (
		<CardWrapper>
			<SymbolWrapper>
				<Symbol src={tokenUrl} alt={symbol} />
				<CurrencyName>{token}</CurrencyName>
			</SymbolWrapper>
			<AmountWrapper>
				<Amount>{amount}</Amount>
				{/* {showWithdrawal && (
					<WithdrawBtn
						onClick={() => {
							if (onWithdraw) {
								onWithdraw();
							}
						}}
						disabled={!canWithdrawal}
					>
						Withdraw
					</WithdrawBtn>
				)} */}
			</AmountWrapper>
		</CardWrapper>
	);
}

const CardWrapper = styled.div`
	border-radius: 10px;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	);
	display: flex;
	padding: 12px;
	justify-content: space-between;
	align-items: center;
`;

const SymbolWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Symbol = styled.img`
	width: 34px;
	height: 34px;
`;

const CurrencyName = styled(Typography.Text)`
	font-weight: 600 !important;
	line-height: 26px !important;
`;

const AmountWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Amount = styled(Typography.Text)`
	color: #fec424;
	font-weight: 600 !important;
`;

const WithdrawBtn = styled(Button)`
	border-radius: 6px;
	background: #007aff;
	border: none;
`;
