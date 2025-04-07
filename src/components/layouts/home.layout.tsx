import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Tabbar from '../Tabbar';
import Header from '../Header';

export default function HomeLayout() {
	return (
		<Wrapper>
			<Header />
			<Outlet />
			<Tabbar />;
		</Wrapper>
	);
}

const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
	position: relative;
	height: 100dvh;
	background-color: #0a0a27;
	background-image: url('/images/background.png');
	background-size: 100% auto;
	background-position: bottom;
	background-repeat: no-repeat;
	padding: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	p {
		margin: 0px;
	}
`;
