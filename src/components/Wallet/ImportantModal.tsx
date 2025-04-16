import styled from 'styled-components';
import { Button } from 'antd';
import { useState } from 'react';
import PopupUI from '../UI/PopupUI';

interface CongratulationModalProps {
	confirmText: string;
}
const ImportantModal = ({ confirmText }: CongratulationModalProps) => {
	const [open, setOpen] = useState(true);
	const onClose = () => {
		setOpen(false);
	};
	return (
		<PopupUI open={open} onClose={onClose} title="Important">
			<Wrapper>
				<StyledImage src={'/images/ring.png'} alt={'important'} />
				<Content>
					<StyledDescription>{confirmText}</StyledDescription>
					<Action>
						<ContinueBtn
							onClick={() => {
								onClose();
							}}
						>
							Continue
						</ContinueBtn>
					</Action>
				</Content>
			</Wrapper>
		</PopupUI>
	);
};

export default ImportantModal;

const ContinueBtn = styled(Button)`
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
const StyledImage = styled.img`
	width: 104.452px;
	height: 100.018px;
	object-fit: contain;
	margin-bottom: 6px;
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
	font-family: SF Pro Display;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0%;
	text-align: center;
	vertical-align: middle;
	padding: 16px 0 16px;
`;
