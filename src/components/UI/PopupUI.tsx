import { Button, Drawer, Typography } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import CloseIc from '../Icons/CloseIc';

export interface IPackage {
	id: string;
	description: string;
	name: string;
	price: string;
	growthLoyaltyRate?: number;
	loyaltyBonus?: string;
	loyaltyTokenSymbol: string;
	reducedPeriodPercent: number;
	specialBonusCondition?: string;
	specialLoyaltyBonus?: string;
	validityPeriod: number;
}

interface IProps {
	children?: ReactNode;
	open: boolean;
	closeable?: boolean;
	onClose: () => void;
	footer?: ReactNode | null;
	title: string;
}

export default function PopupUI({
	children,
	open,
	onClose,
	footer,
	closeable = true,
	title,
}: IProps) {
	return (
		<StyledDrawer
			title={null}
			placement={'bottom'}
			closable={false}
			onClose={onClose}
			open={open}
			key={'bottom'}
			footer={null}
			height={'auto'}
		>
			<Wrapper>
				<HeaderWrapper closeable={closeable}>
					<Title>{title}</Title>
					{closeable && (
						<Button icon={<CloseIc />} type="text" onClick={onClose}></Button>
					)}
				</HeaderWrapper>
				<BodyWrapper>
					{children}
					{!!footer && <FooterWrapper>{footer}</FooterWrapper>}
				</BodyWrapper>
			</Wrapper>
		</StyledDrawer>
	);
}

const StyledDrawer = styled(Drawer)`
	.ant-drawer-content-wrapper {
		height: max-content;
	}
`;

const Wrapper = styled.div`
	background: linear-gradient(0deg, #072041 0%, #052b5c 100%);
	border-radius: 15px 15px 0px 0px;
`;
const HeaderWrapper = styled.div<{ closeable?: boolean }>`
	padding: 16px 20px;
	display: flex;
	justify-content: ${(props) => (props.closeable ? 'space-between' : 'center')};
	align-items: center;
	border-radius: 15px 15px 0px 0px;
	border-bottom: 1px solid rgba(255, 255, 255, 0);
	background: #131348;
`;
const Title = styled(Typography)`
	font-family: SF Pro Display;
	font-weight: 600;
	font-size: 16px;
	line-height: 26px;
	letter-spacing: 0%;
	text-align: center;
`;

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px 16px 30px;
	gap: 20px;
`;

const FooterWrapper = styled.div`
	border-top: 1px solid #28303f;
	padding: 16px 16px 20px;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	justify-content: center;
`;
