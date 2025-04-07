import React from 'react';
import styled from 'styled-components';
import RankingList from './List';

export default function Ranking() {
	return (
		<Wrapper>
			<Title>Top Ranking</Title>
			<RankingList />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Title = styled.p`
	font-family: SF Pro Display;
	font-weight: 700;
	font-size: 18px;
	line-height: 100%;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	color: #fff;
`;
