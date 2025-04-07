import styled from 'styled-components';
import { getName, hideName, renderFriendText } from '../../utils/common';
import BronzeMedalIc from '../Icons/BronzeMedalIc';
import GoldMedalIc from '../Icons/GoldMedalIc';
import SilverMedalIc from '../Icons/SilverMedalIc';

export default function RankingList() {
	const renderRanking = (ranking: number) => {
		switch (ranking) {
			case 1:
				return <GoldMedalIc />;
			case 2:
				return <SilverMedalIc />;
			case 3:
				return <BronzeMedalIc />;
			default:
				return `#${ranking}`;
		}
	};

	return (
		<Wrapper>
			<User>
				<LeftBlock>
					<RankBlock>{renderRanking(1)}</RankBlock>
					<UserAvatar src={'/images/avatar.png'} alt="avatar" />
					<UserInfo>
						<UserName>
							{hideName(getName('huy', 'pham', 'pham huy haha'))}
						</UserName>
					</UserInfo>
				</LeftBlock>
				<FriendNumber>
					<p>{renderFriendText(parseInt('100'))}</p>
					<img src={'/images/friend.svg'} alt="friend" />
				</FriendNumber>

				<Divider />
			</User>
		</Wrapper>
	);
}

export const Wrapper = styled.div`
	margin-top: 12px;
	border-radius: 10px;
	background: #0000004d;
`;

export const LeftBlock = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const UserAvatar = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 999px;
	overflow: hidden;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
`;
export const UserName = styled.div`
	color: #fff;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
`;

export const FriendNumber = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	p {
		font-family: Poppins;
		font-weight: 600;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: 0%;
		text-align: right;
		color: #19bbfc;
	}
	img {
		width: 20px;
	}
`;

export const RankBlock = styled.div`
	color: #fff;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 500;
	width: 38px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const User = styled.div`
	position: relative;
	display: flex;
	padding: 12px 16px;
	align-items: center;
	justify-content: space-between;
	&:last-child {
		border-bottom: none;
	}
`;

export const PopupContent = styled.div`
	max-height: 60vh;
	overflow-y: auto;
	overflow-x: hidden;
`;
export const Divider = styled.div`
	height: 1px;
	width: 80%;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
`;
