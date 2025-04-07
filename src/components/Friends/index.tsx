import React from 'react';
import styled from 'styled-components';
import EmptyFriend from './Empty';
import Summary from './Summary';

export default function Friends() {
	return (
		<Wrapper>
			<Title>Friends</Title>
			<Description>Invite friends & get more MARIO Token</Description>
			<Summary />
			{/* <EmptyFriend /> */}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const Title = styled.p`
	font-family: SF Pro Display;
	font-weight: 700;
	font-size: 18px;
	line-height: 100%;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffff;
`;

const Description = styled.p`
	font-family: SF Pro Display;
	font-weight: 500;
	font-size: 14px;
	line-height: 100%;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #ffffff99;
`;
