import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { StyledQRCode, StyledQRCodeOutlined } from './index.styled';

const QrCodeMemoModal = ({ value }: { value: string }) => {
	const [open, setOpen] = useState(false);
	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<StyledQRCodeOutlined onClick={() => setOpen(true)} />
			<StyledModal footer={null} title="Memo" open={open} onCancel={onClose}>
				<Wrapper>
					<StyledQRCode value={value} />
					<Content>
						<StyledDescription>{value}</StyledDescription>
						<Action>
							<StyledButton onClick={onClose}>Close</StyledButton>
						</Action>
					</Content>
				</Wrapper>
			</StyledModal>
		</>
	);
};

export const StyledModal = styled(Modal)`
	.ant-modal .ant-modal-content {
		background: linear-gradient(90deg, #082954 0%, #143b6e 100%) !important;
	}
	.ant-modal-content {
		background: linear-gradient(90deg, #082954 0%, #143b6e 100%) !important;
	}
	.ant-modal-close {
		color: #fff !important;
	}
	.ant-modal-header {
		background: transparent;
		.ant-modal-title {
			color: #fff !important;
		}
	}
`;

const StyledButton = styled(Button)`
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
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 8px;
	width: 100%;
`;

const Action = styled.div`
	width: 100%;
`;

const StyledDescription = styled.div`
	color: #fff;
	text-align: center;
	font-size: 14px;
	line-height: 18px;
	padding: 10px 0 0;
`;

export default QrCodeMemoModal;
