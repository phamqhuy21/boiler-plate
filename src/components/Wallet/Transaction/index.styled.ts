import styled from 'styled-components';
import { Button, Form, Input, Modal, QRCode, Select } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { fadeIn } from '../../../styles/animation.style';

export const Wrapper = styled.div`
	min-height: 100vh;
	color: #fff;
	background-image: url('/images/layout/light.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position: center -65px;
	animation: ${fadeIn} 0.5s ease;
	box-sizing: border-box;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Title = styled.div`
	color: var(--Main, var(--Native-text_color, #fff));
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	text-align: center;
`;

export const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const StyledFormItem = styled(Form.Item)`
	margin-bottom: 0;
	.ant-col {
		gap: 10px;
		display: flex;
		flex-direction: column;
	}
	.ant-form-item-explain-error {
		color: #d43637;
		font-family: Poppins;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px; /* 150% */
	}
	svg {
		cursor: pointer;
	}
`;

export const StyledSelect = styled(Select)`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	height: 46px;
	color: #fff !important;
	.rc-virtual-list {
		background: var(
			--Button-Linear,
			linear-gradient(90deg, #082954 0%, #143b6e 100%)
		) !important;
	}
	.ant-select-selector {
		background: var(
			--Button-Linear,
			linear-gradient(90deg, #082954 0%, #143b6e 100%)
		) !important;
		border-radius: 10px;
		border: none !important;
		backdrop-filter: blur(13px);
		padding: 10px 12px !important;
		height: 46px !important;
		box-sizing: border-box;
		color: #fff !important;
	}
	.ant-select-selection-placeholder {
		color: rgba(255, 255, 255, 0.6);
		font-family: Poppins !important;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px !important; /* 185.714% */
	}
	.ant-select-selection-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #fff !important;
		.ant-typography {
			color: #fff;
			font-family: Poppins !important;
			font-size: 14px;
			font-style: normal;
			font-weight: 500 !important;
			line-height: 26px !important; /* 185.714% */
		}
	}
	::after {
		line-height: 0 !important;
	}
`;

export const LabelBlock = styled.div<{ required?: boolean }>`
	color: var(--Native-text_color, #fff);
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	&::before {
		content: ${(props) => (props.required ? '* ' : '')};
		color: #ff4d4f;
	}
`;

export const StyledInput = styled(Input)`
	padding: 10px 12px;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	) !important;
	border: none;
	color: #fff;
	font-family: Poppins !important;
	font-size: 14px;
	font-style: normal;
	font-weight: 500 !important;
	line-height: 26px !important; /* 185.714% */
	::placeholder {
		color: rgba(255, 255, 255, 0.6) !important;
		font-family: Poppins !important;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px !important;
	}
	input:disabled {
		color: #fff !important;
		opacity: 1 !important;
	}
`;

export const FieldItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const FieldItemButton = styled.div`
	width: 100%;
	max-width: 306px;
	margin: 0 auto;
	margin-top: 10px;
`;

export const OptionIcon = styled.img`
	width: 26px;
	height: 26px;
	margin-inline-end: 0px;
`;

export const OptionValue = styled.span``;

export const StyledOptionLabel = styled.div`
	display: flex;
	color: #fff;
	gap: 10px;
	align-items: center;
`;

export const StyledQRCode = styled(QRCode)`
	background: #fff !important;
	padding: 6px;
	margin: 0 auto;
`;

export const ErrorText = styled.div`
	color: #d43637;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px; /* 150% */
`;

export const StyledModal = styled(Modal)`
	.ant-modal-content {
		background: linear-gradient(90deg, #082954 0%, #143b6e 100%) !important;
	}
	.ant-modal-close {
		color: #fff !important;
	}
`;

export const ModalContent = styled.div`
	color: #fff;
	font-size: 12px;
	font-family: Poppins;
	text-align: center;
	padding: 0 16px;
`;

export const ButtonPrimaryPopup = styled(Button)`
	width: 100%;
	border-radius: 10px;
	background: #00abeb;
	height: 45px;

	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 600;
	line-height: 21px;
	flex: 1;
`;

export const StyledQRCodeOutlined = styled(QrcodeOutlined)`
	color: #ffffff99;
	font-size: 20px;
`;
