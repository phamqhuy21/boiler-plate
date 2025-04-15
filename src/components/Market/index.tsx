import React from 'react';
import styled from 'styled-components';
import TokenSale from '../Home/TokenSale';
import BuyingToken from './BuyingToken';

export default function Market() {
	return (
		<Wrapper>
			<TokenSale />
			<BuyingToken />
		</Wrapper>
	);
}

const Wrapper = styled.div``;
