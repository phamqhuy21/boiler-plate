import React from 'react';
import styled from 'styled-components';

export default function TokenSale() {
	return (
		<TokenSalesContent>
			<TokenSalesValue>
				<Label>Total Mario token sales:</Label>
				<Value>25,987,000.00</Value>
			</TokenSalesValue>

			<ProgressWrapper>
				<ProgressBar>
					<ProgressContent>
						<ProgressLabel>Until price increase</ProgressLabel>
						<Percent>62.30%</Percent>
					</ProgressContent>
				</ProgressBar>
				<CoinImg src="/images/coin.png" alt="Mario Coin" />
			</ProgressWrapper>
		</TokenSalesContent>
	);
}

const TokenSalesContent = styled.div`
	gap: 8px;
	border-radius: 8px;
	padding: 12px;
	background: #00000033;
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex-grow: 1;
`;

const TokenSalesValue = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 4px;
`;

const Label = styled.p`
	font-family: SF Pro Display;
	font-weight: 400;
	font-size: 12px;
	letter-spacing: 0%;
	vertical-align: middle;
	color: #ffffffb2;
`;

const Value = styled.p`
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0%;
	text-align: right;
	vertical-align: middle;
	color: #ffffff;
`;

export const ProgressWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #1b1b36;
	padding: 4px;
	position: relative;
	height: 28px;
	width: 100%;
	border-radius: 20px;
	box-sizing: border-box;
`;

export const ProgressBar = styled.div`
	position: absolute;
	height: 20px;
	width: calc(50% - 8px);
	left: 4px;
	top: 4px;
	border-radius: 20px;
	background: linear-gradient(
		90deg,
		#eca740 -23.14%,
		#ffe58a 33.71%,
		#dd7617 120.37%,
		#ffee95 154.63%
	);
	padding: 0 10px;
	overflow: hidden;
`;

export const CoinImg = styled.img`
	position: absolute;
	right: 4px;
	top: 4px;
	height: 20px;
`;

export const ProgressContent = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

export const ProgressLabel = styled.p`
	font-family: SF Pro Display;
	font-weight: 500;
	font-size: 10px;
	letter-spacing: 0%;
	vertical-align: middle;
	color: #090b29;
`;

export const Percent = styled.p`
	font-family: SF Pro Display;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: 0%;
	text-align: right;
	vertical-align: middle;
	color: #090b29;
`;
