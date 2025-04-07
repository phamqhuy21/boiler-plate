import React from 'react';
import styled from 'styled-components';
import { VERSION } from '../../constants';

const LoadingLayout = () => {
	return (
		<Wrapper>
			<Loading autoPlay muted playsInline loop>
				<source src="/video/loading.mp4" type="video/mp4" />
			</Loading>

			{/* <Version /> */}
		</Wrapper>
	);
};

const Version = () => {
	return (
		<VersionWrapper>
			<VersionTag> Version {VERSION}</VersionTag>
		</VersionWrapper>
	);
};

const VersionTag = styled.div`
	background: url(/images/version-tag.png);
	background-position: center;
	background-size: contain;
	width: 142.86px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;

	color: rgba(255, 255, 255, 0.8);
	text-align: center;
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	margin: 0 auto;
`;

const VersionWrapper = styled.div`
	position: absolute;
	width: 100%;
	bottom: 20px;
	z-index: 10;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100dvh;
	background: #041720;
	position: relative;
	overflow: hidden;
	z-index: 1040;
`;

const Loading = styled.video`
	position: absolute;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	object-position: center;
`;

export default LoadingLayout;
