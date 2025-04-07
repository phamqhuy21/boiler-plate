import React from 'react';
import styled from 'styled-components';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonType?: 'primary' | 'secondary' | 'tertiary';
	children?: React.ReactNode;
	radius?: string;
}

export default function ButtonUI({
	buttonType = 'primary',
	radius = '200px',
	children,
	...props
}: IProps) {
	return (
		<Wrapper buttonType={buttonType} radius={radius} {...props}>
			{children}
		</Wrapper>
	);
}

export const Wrapper = styled.button<{ buttonType?: string; radius?: string }>`
	width: 100%;
	background: ${({ buttonType }) =>
		buttonType === 'primary'
			? 'linear-gradient(180deg, #009cda 0%, #016f9a 100%)'
			: buttonType === 'secondary'
			? 'linear-gradient(180deg, #42B032 0%, #18630D 100%)'
			: '#1B1B36'};
	border: 1px solid;
	border-color: ${({ buttonType }) =>
		buttonType === 'primary'
			? '#016f9a'
			: buttonType === 'secondary'
			? '#18630D'
			: 'rgba(255, 255, 255, 0.2)'};
	padding-top: 6px;
	padding-right: 20px;
	padding-bottom: 6px;
	padding-left: 20px;
	border-radius: ${({ radius }) => radius};
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
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
