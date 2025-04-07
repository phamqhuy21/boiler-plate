import React from 'react';
import styled from 'styled-components';
import TokenSale from './TokenSale';
import ButtonUI from '../Button';

export default function Home() {
	return (
		<Wrapper>
			<TokenSale />

			<Body>
				<DecoratorWrapper>
					<SmokeImage src="/images/smoke.png" alt="Smoke" />
					{/* <CoinImage src="/images/coin.png" alt="Mario Coin" /> */}
					<ClaimImage src="/images/claim-img.png" alt="Claim" />
				</DecoratorWrapper>
				<ButtonGroups>
					<ClaimedToken>
						<ButtonUI buttonType="primary">
							<ClaimTokenValue>
								<img src="/images/coin.png" alt="Mario Coin" />
								<p>20.000 MARIO</p>
							</ClaimTokenValue>
						</ButtonUI>
					</ClaimedToken>

					<CountDownWrapper>
						<ButtonUI buttonType="tertiary">
							<p>00:00:00</p>
						</ButtonUI>
					</CountDownWrapper>

					{/* <ClaimButton>
						<ButtonUI buttonType="secondary">
							<p>CLAIM</p>
						</ButtonUI>
					</ClaimButton> */}
				</ButtonGroups>
			</Body>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding-bottom: 60px;
`;

const Body = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 20px;
`;

const DecoratorWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16px;
`;

const ClaimImage = styled.img`
	width: 50vw;
`;

const CoinImage = styled.img`
	width: 150px;
`;

const SmokeImage = styled.img`
	margin-bottom: -40px;
`;

const ButtonGroups = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const ClaimedToken = styled.div`
	width: 60%;
`;

const ClaimTokenValue = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	/* padding: 8px 16px; */
	img {
		width: 24px;
		height: 24px;
	}
	p {
		font-family: SF Pro Display;
		font-weight: 600;
		font-size: 16px;
		line-height: 28px;
		letter-spacing: 0%;
		vertical-align: middle;
		color: #ffffff;
	}
`;

const ClaimButton = styled.div`
	width: 40%;
`;

const CountDownWrapper = styled.div`
	width: 40%;
`;
