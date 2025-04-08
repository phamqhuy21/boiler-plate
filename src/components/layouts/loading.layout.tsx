import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LoadingLayout = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return prev;
				}
				return prev + 5;
			});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	const percentPolygon = () => {
		if (progress <= 10) return 75;
		if (progress <= 25) return 90;
		if (progress <= 35) return 92;
		if (progress <= 50) return 95;
		if (progress <= 75) return 97;
		if (progress < 100) return 98;
		return 100;
	};

	return (
		<Wrapper>
			<Loading autoPlay muted playsInline loop>
				<source src="/video/loading.mp4" type="video/mp4" />
			</Loading>
			<Body>
				<Background src="/images/loading-bg.png" alt="background" />
				<ProgressWrapper>
					<ProgressBar src="/images/progress-bar.png" alt="progress-bar" />
					<ProgressFill
						src="/images/progress.png"
						alt="progress-fill"
						progress={progress}
						percentPolygon={percentPolygon()}
					/>
				</ProgressWrapper>
			</Body>
		</Wrapper>
	);
};

export default LoadingLayout;

const Wrapper = styled.div`
	width: 100%;
	height: 100dvh;
	background: #041720;
	position: relative;
	overflow: hidden;
	z-index: 1040;
`;

const Loading = styled.video`
	/* position: absolute; */
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	object-position: center;
`;

const Body = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 80px;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Background = styled.img`
	width: 90%;
`;

const ProgressWrapper = styled.div`
	position: relative;
	display: flex;
	/* justify-content: center; */
	align-items: center;
`;

const ProgressBar = styled.img``;

const ProgressFill = styled.img<{ progress: number; percentPolygon: number }>`
	position: absolute;
	left: 4px;
	width: ${({ progress }) => `calc(${progress}% - 8px)`};
	height: calc(100% - 8px);
	object-fit: cover;
	object-position: left;
	clip-path: ${({ percentPolygon }) =>
		`polygon(${percentPolygon}% 0%, 100% 50%, ${percentPolygon}% 100%, 0% 100%, 0 50%, 0% 0%)`};
`;
