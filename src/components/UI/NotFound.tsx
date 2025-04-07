import { ReactNode } from 'react';
import styled from 'styled-components';

const Notfound = ({ content }: { content: ReactNode }) => {
	return (
		<EmtyBlock>
			{/* <NotfoundImage src="/images/not-found.png" alt="notfound" /> */}
			{content}
		</EmtyBlock>
	);
};

export default Notfound;

const EmtyBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 300px;
	gap: 6px;
	box-sizing: border-box;
	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 18px;
`;

const NotfoundImage = styled.img`
	height: 110px;
	width: auto;
`;
