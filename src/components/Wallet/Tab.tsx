import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
interface IProps {
	isActive: boolean;
	select: () => void;
	tabName: any;
	icon?: React.ReactNode;
	isSubTab?: boolean;
}

export default function WalletTab({
	isActive,
	select,
	tabName,
	icon,
	isSubTab,
}: IProps) {
	return (
		<CoverLayout active={isActive} onClick={select}>
			<Wrapper active={isActive}>
				{icon}
				<Content active={isActive} isSubTab={isSubTab}>
					{tabName}
				</Content>
			</Wrapper>
		</CoverLayout>
	);
}

const CoverLayout = styled.div<{ active: boolean }>`
	padding: ${(props) => (props.active ? '1px' : '0px')};

	background: ${(props) =>
		props.active
			? 'linear-gradient(180deg, #009CDA 0%, #016F9A 100%)'
			: 'rgba(255, 255, 255, 0.2)'};
	border-radius: 8px;
	width: 100%;
`;

const Wrapper = styled.div<{ active: boolean }>`
	padding: 8px 0;
	border-radius: 8px;
	border-width: ${(props) => (props.active ? '0px' : '1px')};
	border-color: ${(props) => (props.active ? '#00000000' : '#273662')};
	background: ${(props) =>
		props.active
			? 'linear-gradient(180deg, #009CDA 0%, #016F9A 100%)'
			: '#1B1B36'};
	width: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	gap: 4px;
	justify-content: center;
	border-style: solid;
	cursor: pointer;
`;
const Content = styled(Typography.Text)<{
	active: boolean;
	isSubTab?: boolean;
}>`
	color: ${(props) => (props.active ? '#fff' : '#b4b4b4')};
	text-align: center;
	font-weight: 500 !important;
	font-size: ${(props) => (props.isSubTab ? '12px' : '14px')};
`;
