import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../routes';

interface Tab {
	key: number;
	name: string;
	route: string;
	icon: JSX.Element;
	activeIcon: JSX.Element;
}

export default function Tabbar() {
	const location = useLocation();
	const tabs = [
		{
			key: 1,
			name: 'Mission',
			route: ROUTES.MISSION,
			icon: <img src="/images/icons/earn-ic.svg" alt="earn-ic" />,
			activeIcon: (
				<img src="/images/icons/earn-active-ic.svg" alt="earn-active-ic" />
			),
		},
		{
			key: 2,
			name: 'Friends',
			route: ROUTES.REFERRAL,
			icon: <img src="/images/icons/ranking-ic.svg" alt="ranking-ic" />,
			activeIcon: (
				<img
					src="/images/icons/ranking-active-ic.svg"
					alt="ranking-active-ic"
				/>
			),
		},
		{
			key: 3,
			name: 'Home',
			route: ROUTES.HOME,
			icon: <img src="/images/icons/friend-ic.svg" alt="friend-ic" />,
			activeIcon: (
				<img src="/images/icons/friend-active-ic.svg" alt="friend-active-ic" />
			),
		},
		{
			key: 4,
			name: 'Ranking',
			route: ROUTES.RANKING,
			icon: <img src="/images/icons/market-ic.svg" alt="market-ic" />,
			activeIcon: (
				<img src="/images/icons/market-active-ic.svg" alt="market-active-ic" />
			),
		},

		{
			key: 5,
			name: 'Wallet',
			route: ROUTES.WALLET,
			icon: <img src="/images/icons/wallet-ic.svg" alt="wallet-ic" />,
			activeIcon: (
				<img src="/images/icons/wallet-active-ic.svg" alt="wallet-active-ic" />
			),
		},
	] as Tab[];
	const [tabKey, setTabKey] = useState<number>(1);
	const navigate = useNavigate();

	const onSelectTab = (tab: Tab) => {
		setTabKey(tab.key);
		navigate(tab.route);
	};

	useEffect(() => {
		setTabKey(tabs.find((tab) => tab.route === location.pathname)?.key || 3);
	}, [location.pathname]);

	return (
		<Wrapper>
			{tabs.map((tab, index) => {
				const isActive = index === 0;
				return (
					<TabItem key={tab.key} isActive={isActive}>
						{isActive ? tab.activeIcon : tab.icon}
						{isActive && <p>{tab.name}</p>}
					</TabItem>
				);
			})}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background: linear-gradient(360deg, #0a0a27 0%, #0d0a7d 100%);
	border-radius: 24px 24px 0 0;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	/* height: 93px; */
	display: flex;
	justify-content: space-between;
	padding: 16px 24px 36px;
	gap: 16px;
	box-sizing: border-box;
`;

const TabItem = styled.div<{ isActive?: boolean }>`
	display: flex;
	align-items: center;
	gap: 8px;
	height: max-content;
	padding: ${({ isActive }) => (isActive ? '4px 10px' : '4px 0px')};
	border-radius: 12px;
	background-color: ${({ isActive }) => (isActive ? '#1737A0' : 'transparent')};
	p {
		font-family: SF Pro Display;
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		letter-spacing: 0%;
		vertical-align: middle;
		color: #fcd000;
	}
`;
