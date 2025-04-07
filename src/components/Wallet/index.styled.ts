import { Drawer } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
	padding: 16px 16px 0;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	* {
		box-sizing: border-box;
	}
	height: calc(100vh - 100px);
`;

export const StyledTitle = styled.div`
	font-size: 22px;
	font-weight: 600;
	text-align: center;
`;

export const StyledHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-bottom: 40px;
`;

export const StyledDescription = styled.div`
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 26px;
`;

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
`;

export const StyledButtonConnectWallet = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	font-weight: 600;
	border: 1px solid #fff;
	border-radius: 10px;
	width: 100%;
	cursor: pointer;
	height: 62px;
`;

export const StyledFieldConnectWallet = styled.div`
	width: 100%;
	height: 62px;
	img {
		width: 33px;
		height: 33px;
		object-fit: contain;
	}
`;

export const StyledButtonDisConnectWallet = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	font-weight: 600;
	border: 1px solid #fff;
	border-radius: 10px;
	max-width: 60px;
	cursor: pointer;
	width: 100%;
`;

export const StyledFieldAddressWallet = styled.div`
	width: 100%;
`;

export const StyledDrawer = styled(Drawer)`
	background: #001633 !important;
	border-radius: 15px 15px 0px 0px;
	box-sizing: border-box;
	.ant-drawer-header {
		padding: 20px;
		border-bottom: 1px solid #28303f;
		font-size: 16px;
		font-weight: 500;
	}
`;

export const ContentDrawer = styled.div`
	box-sizing: border-box;
	padding: 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

export const StyledQuestion = styled.div`
	text-align: center;
	color: #b4b4b4;
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	padding: 0 0 24px 0;
	line-height: 26px; /* 162.5% */
`;

export const StyledFooterDrawer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding-bottom: 30px;
`;

export const StyledButtonDisconnect = styled.button`
	background: #00abeb;
	width: 100%;
	padding: 12px 20px;
	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 21px; /* 131.25% */
	border-radius: 6px;
	border: 1px solid #00abeb;
`;

export const StyledButtonCancelDisconnect = styled.button`
	width: 100%;
	border-radius: 6px;
	border: 1px solid var(--Web-Primary, #00abeb);
	background: transparent;
	color: #fff;
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
`;

export const StyledWalletName = styled.div`
	color: #fff;
	font-family: Poppins;
	font-size: 22px;
	font-style: normal;
	font-weight: 600;
	line-height: 28px; /* 127.273% */
	margin-bottom: 12px;
`;

export const Version = styled.div`
	color: #fff;
	text-align: center;
	font-size: 16px;
	font-weight: 400;
	line-height: 26px;
	padding-bottom: 26px;
`;
