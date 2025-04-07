import React from 'react';
import styled from 'styled-components';
import ButtonUI from '../Button';

export default function EmptyFriend() {
	return (
		<Wrapper>
			<FriendsImg src={'/images/friends-img.png'} alt="friends" />
			<ButtonsGroup>
				<InviteFriendsWrapper>
					<ButtonUI radius="10px">
						<InviteFriendsContent>
							<img
								src={'/images/icons/invite-friend-ic.svg'}
								alt="invite friends"
							/>
							<p>Invite Friends</p>
						</InviteFriendsContent>
					</ButtonUI>
				</InviteFriendsWrapper>

				<CopyWrapper>
					<ButtonUI radius="10px">
						<img
							src={'/images/icons/copy-ic.svg'}
							alt="copy"
							style={{ padding: '2px' }}
						/>
					</ButtonUI>
				</CopyWrapper>
			</ButtonsGroup>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	gap: 16px;
`;

const FriendsImg = styled.img`
	max-width: 234px;
`;

const ButtonsGroup = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const InviteFriendsWrapper = styled.div`
	width: calc(80% - 40px);
`;

const InviteFriendsContent = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	p {
		font-family: SF Pro Display;
		font-weight: 600;
		font-size: 16px;
		line-height: 28px;
		letter-spacing: 0%;
		vertical-align: middle;
		color: #ffffff;
	}
`;

const CopyWrapper = styled.div`
	width: 40px;
`;
