import React from 'react';
import styled from 'styled-components';
import ButtonUI from '../Button';

export default function BuyingToken() {
	return (
		<Wrapper>
			<DecorLeft src="/images/buying-decor.png" alt="decor" />
			<DecorRight src="/images/buying-decor.png" alt="decor" />
			<Header>
				<Title>1 MARIO = $0,00848</Title>
				<Description>Limit: 20,000 MARIO per user</Description>
			</Header>

			<TokenSelectionWrapper>
				<ButtonWrapper active>
					<img src="/images/tokens/ton.svg" alt="ton" />
					<p>TON</p>
				</ButtonWrapper>
				<ButtonWrapper active={false}>
					<img src="/images/tokens/usdt.svg" alt="usdt" />
					<p>USDT</p>
				</ButtonWrapper>
			</TokenSelectionWrapper>

			<PayingWrapper>
				<LabelWrapper>
					<Label>
						Pay with TON <span>(10% Off)</span>
					</Label>
					{/* <Label>800/1000</Label> */}
				</LabelWrapper>
				<InputWrapper>
					<input placeholder="0.00" type="number" />
					<SuffixWrapper>
						<div>Max</div>
						<img src="/images/tokens/ton.svg" alt="ton" />
					</SuffixWrapper>
				</InputWrapper>
				<AmountOptions>
					<div>
						<p>10</p>
					</div>
					<div>
						<p>50</p>
					</div>
					<div>
						<p>100</p>
					</div>
					<div>
						<p>200</p>
					</div>
					<div>
						<p>500</p>
					</div>
					<div>
						<p>1000</p>
					</div>
					<div>
						<p>5000</p>
					</div>
				</AmountOptions>
			</PayingWrapper>

			<ReceiveWrapper>
				<Label>Receive MARIO</Label>
				<InputWrapper>
					<input value={0} disabled />
					<SuffixWrapper>
						<img src="/images/coin.png" alt="mario coint" />
					</SuffixWrapper>
				</InputWrapper>
			</ReceiveWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	position: relative;
	padding: 10px;
`;

const DecorLeft = styled.img`
	position: absolute;
	top: 20px;
	left: 0;
`;

const DecorRight = styled.img`
	position: absolute;
	top: 20px;
	right: 0;
	transform: rotateY(180deg);
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 2;
`;

const Title = styled.p`
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffff;
`;

const Description = styled.p`
	font-family: SF Pro Display;
	font-weight: 400;
	font-size: 12px;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffffb2;
`;

const TokenSelectionWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	width: 100%;
`;

const ButtonWrapper = styled.div<{ active: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid
		${({ active }) => (active ? '#19bbfc' : 'rgba(255, 255, 255, 0.2)')};
	background: #1b1b36;
	border-radius: 300px;
	padding: 6px 20px;

	img {
		height: 24px;
	}
	p {
		font-family: SF Pro Display;
		font-weight: 600;
		font-size: 14px;
		line-height: 28px;
		letter-spacing: 0%;
		vertical-align: middle;
		color: ${({ active }) => (active ? '#19bbfc' : '#ffffff')};
	}
`;

const PayingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const LabelWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const Label = styled.p`
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 14px;
	/* line-height: 41px; */
	letter-spacing: 0%;
	vertical-align: middle;
	color: #ffffffb2;
	span {
		color: #00ff37;
	}
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid rgba(255, 255, 255, 0.2);
	padding: 6px 20px;
	border-radius: 300px;
	background: #1b1b36;

	input {
		font-family: SF Pro Display;
		font-weight: 600;
		font-size: 14px;
		letter-spacing: 0%;
		vertical-align: middle;
		color: #ffffff;
		background-color: transparent;
		border: none;
		outline: none;
		&::placeholder {
			color: #ffffff;
			opacity: 1; /* Firefox mặc định giảm opacity */
		}
	}
`;

const SuffixWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 14px;
	line-height: 28px;
	letter-spacing: 0%;
	vertical-align: middle;
	color: #fcd000;

	img {
		height: 24px;
	}
`;

const AmountOptions = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	div {
		background: #1b1b3699;
		padding: 10px;
		border-radius: 8px;
		min-width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		p {
			font-family: SF Pro Display;
			font-weight: 500;
			font-size: 12px;
			line-height: 28px;
			letter-spacing: 0%;
			vertical-align: middle;
			color: #ffffff;
		}
	}
`;

const ReceiveWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const ActionWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;
