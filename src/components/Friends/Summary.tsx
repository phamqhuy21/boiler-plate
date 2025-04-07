import styled from 'styled-components';
import { fadeIn } from '../../styles/animation.style';
import { formatNumber, getName } from '../../utils/common';
import ButtonUI from '../Button';

const directFriends: any[] = [
	{
		avatar: '/images/avatar.png',
		username: 'huy',
		firstName: 'Huy',
		lastName: 'Pham',
		availableBalance: 100,
	},
	{
		avatar: '/images/avatar.png',
		username: 'Hong',
		firstName: 'Nguyen',
		lastName: 'Nguyen Hong',
		availableBalance: 50,
	},
];

export default function Summary() {
	return (
		<Wrapper>
			<StyledLayout>
				<Topblock>
					<Row>
						<TotalRefsWrapper>
							<StyledItemLabel>Total Referrals:</StyledItemLabel>
							<StyledItemLabel>
								<FriendIc
									src={'/images/icons/friend-white-ic.svg'}
									alt="friend white"
								/>
								<ReferralNumber>{formatNumber(10)}</ReferralNumber>
							</StyledItemLabel>
						</TotalRefsWrapper>
						<TotalFriendsWrapper>
							<StyledItemLabel>Total Friends:</StyledItemLabel>
							<StyledItemLabel>
								<FriendIc
									src={'/images/icons/friend-white-ic.svg'}
									alt="friend white"
								/>
								<ReferralNumber>{formatNumber(10)}</ReferralNumber>
							</StyledItemLabel>
						</TotalFriendsWrapper>
					</Row>
					<TotalEarned>
						<StyledItemLabel>Total Earned:</StyledItemLabel>
						<TotalEarnedData>
							{formatNumber(10)}
							<CoinIcon src="/images/coin.png" alt="mario coin" />
						</TotalEarnedData>
					</TotalEarned>
					<ReferralBlock>
						<ReferralCode>
							<StyledItemLabel>Referral Code:</StyledItemLabel>
							<ReferralData>
								{'1912412312'}
								<CopyIconWrapper
									onClick={() => {
										// onCopy(profile?.code || '');
									}}
								>
									<CopyIC src={'/images/icons/copy-ic.svg'} alt="copy" />
								</CopyIconWrapper>
							</ReferralData>
						</ReferralCode>
						<ButtonUI radius="10px">
							<AddUserIc
								src={'/images/icons/invite-friend-ic.svg'}
								alt="invite friends"
							/>{' '}
							<p>Invite Friends</p>
						</ButtonUI>
					</ReferralBlock>
				</Topblock>
				<DirectFriends>
					{/* <InfiniteLoad
						loading={isLoadingFriends}
						params={params}
						setParams={setParams}
						data={directFriends}
						loadingComponent={
							<LoadingWrapper>
								<img
									src="/images/loading.svg"
									alt="loading"
									width={'50px'}
									height={'50px'}
								/>
							</LoadingWrapper>
						}
					> */}
					{
						<FriendList>
							{directFriends.map((friend, index) => (
								<FriendItem key={index}>
									<LeftBlock>
										<AvatarWrapper>
											<Avatar src={friend.avatar} alt={friend.username} />
										</AvatarWrapper>
										<FriendName>
											{getName(
												friend.firstName,
												friend.lastName,
												friend.username
											)}
										</FriendName>
									</LeftBlock>
									<RightBlock>
										<TokenAmount>
											{formatNumber(friend.availableBalance)}
										</TokenAmount>
										<MarioToken src="/images/coin.png" alt="mario coin" />
									</RightBlock>
									{index < directFriends.length && <Divider />}
								</FriendItem>
							))}
						</FriendList>
					}
					{/* </InfiniteLoad> */}
				</DirectFriends>
			</StyledLayout>
		</Wrapper>
	);
}

export const Wrapper = styled.div`
	/* padding: 16px; */
	margin-top: 24px;
	color: #fff;
	height: fit-content;
	animation: ${fadeIn} 0.5s ease;
`;
export const StyledTitle = styled.div`
	font-size: 22px;
	font-weight: 600;
	text-align: center;
	color: #fff;
	margin-bottom: 30px;
`;

export const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const Topblock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 16px;
`;

export const Block = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12px;
	border-radius: 10px;
	background: #123768;
`;

export const TotalRefsWrapper = styled(Block)`
	background: linear-gradient(270deg, #8b6be6 -30.6%, #e2589a 134.33%);
`;

export const TotalFriendsWrapper = styled(Block)`
	background: linear-gradient(270deg, #78bd44 -34.33%, #29a961 135.68%);
`;

export const StyledItemLabel = styled.div`
	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
	display: flex;
	gap: 4px;
	align-items: center;
`;
export const ReferralNumber = styled.div`
	font-family: SF Pro Display;
	font-weight: 700;
	font-size: 14px;
	line-height: 100%;
	letter-spacing: 0%;
	vertical-align: middle;
	color: #f5d245;
	display: flex;
	align-items: center;
	gap: 6px;
`;

export const TotalEarnedData = styled(ReferralNumber)`
	color: #ffffff;
`;

export const ReferralData = styled(ReferralNumber)`
	/* color: #ffffff; */
`;

export const TotalEarned = styled(Block)`
	flex-direction: row;
	justify-content: space-between;
	padding: 16px 12px;
	background: linear-gradient(270deg, #ff633c -30.6%, #ffae3e 134.33%);
`;

export const ReferralBlock = styled(Block)`
	align-items: flex-start;
	gap: 12px;
`;
export const CoinIcon = styled.img`
	width: 24px;
	height: 24px;
	object-fit: contain;
`;
export const CopyIconWrapper = styled.div`
	width: 17px;
	height: 17px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const ReferralCode = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
export const StyledItem = styled.div<{ span?: number }>`
	grid-column: ${(props) => props.span || 1} span;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	border-radius: 14px;
	border: 1px solid var(--Colors-white-white, #fff);
	background: var(
		--Bg-App,
		radial-gradient(159.85% 51.7% at 51.7% 6.73%, #3744ce 0%, #10256a 100%)
	);
`;

export const StyledItemValue = styled.div<{ fontSize?: string }>`
	display: flex;
	align-items: center;
	gap: 4px;
	color: #f5d245;
	font-weight: 600;
	font-size: ${(props) => props.fontSize || '22px'};
	img {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}
`;

export const StyledErnInvite = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

export const DirectFriends = styled.div`
	margin-top: 20px;
`;
export const Loader = styled.div``;

// export const DirectFriendsTitle = styled(SectionTitle)`
// 	padding: 0;
// 	margin-bottom: 0;
// `;

export const FireIcon = styled.img`
	width: 24px;
	height: 24px;
	object-fit: contain;
`;

export const FriendList = styled.div`
	margin-top: 12px;
	border-radius: 10px;
	background: #0000004d;

	padding: 2px 16px;
`;
export const FriendItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 0;
	position: relative;
`;

export const Avatar = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
`;
export const AvatarWrapper = styled.div`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	overflow: hidden;
	background: linear-gradient(#accbee, #e7f0fd);
	padding: 1px;
	box-sizing: border-box;
`;

export const FriendName = styled.div`
	color: #fff;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 600;
	line-height: 21px;
	max-width: 120px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const LeftBlock = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

export const RightBlock = styled.div`
	display: flex;
	gap: 6px;
	align-items: center;
`;

export const MarioToken = styled.img`
	width: 20px;
	height: 20px;
	object-fit: contain;
`;

export const TokenAmount = styled(FriendName)`
	text-align: right;
	color: #fec424;
`;

export const Divider = styled.div`
	height: 1px;
	width: 100%;

	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.1) 51%,
		rgba(255, 255, 255, 0) 100%
	);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
`;

const FriendIc = styled.img``;

const CopyIC = styled.img``;

const AddUserIc = styled.img``;
