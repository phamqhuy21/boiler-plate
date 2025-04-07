import React from 'react';
import styled from 'styled-components';

export default function Header() {
	return (
		<Wrapper>
			<InfoWrapper>
				<Avatar src="/images/avatar.png" alt="avatar" />
				<Info>
					<Name>John Doe</Name>
					<BalanceWrapper>
						<Balance>200,000.00</Balance>
						<CoinIc src="/images/coin.png" alt="coin-ic" />
					</BalanceWrapper>
				</Info>
			</InfoWrapper>
			<EnergyWrapper>
				<EnergyButtonWrapper>
					<EnergyIc src="/images/energy.svg" alt="energy-ic" />
					<p>10 / 10</p>
				</EnergyButtonWrapper>
				<EnergyButtonWrapper>
					<HealthIc src="/images/health.svg" alt="health-ic" />
				</EnergyButtonWrapper>
			</EnergyWrapper>
		</Wrapper>
	);
}

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Name = styled.p`
	font-family: SF Pro Display;
	font-weight: 500;
	font-size: 13px;
	line-height: 21px;
	color: #ffffff;
`;

export const BalanceWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const Balance = styled.p`
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 15px;
	/* line-height: 41px; */
	color: #fec424;
`;

export const CoinIc = styled.img`
	width: 20px;
	height: 20px;
`;

export const EnergyWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const EnergyButtonWrapper = styled.div`
	border: 1px solid #6e78b3;
	background: #1b1b36;
	min-width: 30px;
	height: 30px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;
	position: relative;
	box-sizing: border-box;

	p {
		font-family: SF Pro Display;
		font-weight: 600;
		font-size: 14px;
		line-height: 21px;
		color: #fec424;
		padding-left: 27px;
	}
`;

export const EnergyIc = styled.img`
	position: absolute;
	top: -3px;
	left: -5px;
	height: 37px;
`;

export const HealthIc = styled.img``;
