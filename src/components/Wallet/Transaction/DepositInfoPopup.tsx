import React, { useRef, useState } from 'react';
import PopupUI from '../../UI/Popup/PopupUI';
import styled from 'styled-components';
import { Button } from 'antd';
import { StyledQRCode } from './index.styled';
import ShareIc from '../../Icons/ShareIc';
import SaveIc from '../../Icons/SaveIc';
import { IDeposit } from './Deposit';
import { exportFileImage } from '../../../utils/common';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import uploadRequest from '../../../service/upload.request';
interface IProps {
	open: boolean;
	onClose: () => void;
	dataSource: IDeposit;
}

const DepositInfoPopup: React.FC<IProps> = ({ open, onClose, dataSource }) => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const [loading, setLoading] = useState(false);

	const isMobile = /iphone|ipad|ipod|ios|android|XiaoMi|MiuiBrowser/i.test(
		navigator.userAgent
	);

	const onSave = async () => {
		if (!bodyRef.current) return;
		setLoading(true);
		try {
			const dataUrl = await exportFileImage(bodyRef.current, {
				width: '360px',
			});
			if (!dataUrl) return;
			const blob = await fetch(dataUrl).then((res) => res.blob());
			const file = new File(
				[blob],
				`${dataSource.network}_${dataSource.walletAddress}.png`,
				{
					type: 'image/png',
				}
			);
			const tg = window.Telegram.WebApp as any;
			if (tg && isMobile) {
				if (Number(tg.version) < 8) {
					toast.error(
						'To use this feature, please update the Telegram app to the latest version.'
					);
					return;
				}
				const res = await uploadRequest.upload(file);
				if (res.data?.data?.url)
					tg.downloadFile({
						url: res.data.data.url,
						file_name: `${dataSource.network}_${dataSource.walletAddress}.png`,
					});
				return;
			}
			const url = URL.createObjectURL(file);
			const a = document.createElement('a');
			a.href = url;
			a.download = file.name || 'downloaded-file';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onShare = async () => {
		if (!bodyRef.current) return;
		if (!isMobile || !navigator.canShare) {
			toast.error(`Device is not supported sharing feature`);
			return;
		}
		try {
			setLoading(true);
			const dataUrl = await exportFileImage(bodyRef.current, {
				width: '320px',
			});
			if (!dataUrl) return;
			const blob = await fetch(dataUrl).then((res) => res.blob());
			const file = new File(
				[blob],
				`${dataSource.network}_${dataSource.walletAddress}.png`,
				{
					type: 'image/png',
				}
			);
			if (navigator.canShare({ files: [file] })) {
				await navigator.share({
					title: 'Deposit Address',
					text: dataSource.walletAddress,
					files: [file],
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<PopupUI title="Deposit" open={open} onClose={onClose}>
				<Wrapper>
					<Body ref={bodyRef}>
						{dataSource.walletAddress && (
							<QrCodeBlock>
								<StyledQRCode
									icon={`/images/tokens/${
										dataSource.network === 'BSC' ? 'BNB' : dataSource.network
									}.svg`}
									type="svg"
									iconSize={42}
									size={160}
									value={dataSource.walletAddress}
								/>
								<TokenWrapper>
									<TokenIcon
										src={`/images/tokens/${
											dataSource.network === 'BSC' ? 'BNB' : dataSource.network
										}.svg`}
										alt="token"
										crossOrigin="use-credentials"
									/>
								</TokenWrapper>
							</QrCodeBlock>
						)}
						<Content>
							<FieldItem>
								<FieldItemLabel>Network:</FieldItemLabel>
								<FieldItemValue>{dataSource.network} Network</FieldItemValue>
							</FieldItem>
							<FieldItem>
								<FieldItemLabel>Deposit Address:</FieldItemLabel>
								<FieldItemValue>{dataSource.walletAddress}</FieldItemValue>
							</FieldItem>
							{dataSource.memo && (
								<FieldItem>
									<FieldItemLabel>MEMO:</FieldItemLabel>
									<FieldItemValue>{dataSource.memo}</FieldItemValue>
								</FieldItem>
							)}
						</Content>
					</Body>
					<Action>
						<StyledButtonSecond onClick={onShare} disabled={loading}>
							Share {loading ? <LoadingOutlined /> : <ShareIc />}
						</StyledButtonSecond>
						<StyledButton onClick={onSave} disabled={loading}>
							Save {loading ? <LoadingOutlined /> : <SaveIc />}
						</StyledButton>
					</Action>
				</Wrapper>
			</PopupUI>
		</>
	);
};

const TokenWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const TokenIcon = styled.img`
	width: 38.33px;
	height: 38.33px;
	object-fit: contain;
`;

const QrCodeBlock = styled.div`
	position: relative;
	width: 160px;
	height: 160px;
`;

const StyledButton = styled(Button)`
	width: 100%;
	border-radius: 10px;
	background: #00abeb;
	height: 45px;

	color: #fff !important;
	text-align: center;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 600;
	line-height: 21px;
	flex: 1;
`;

const StyledButtonSecond = styled(StyledButton)`
	background: transparent !important;
	color: #00abeb !important;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	justify-content: center;
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	background: var(
		--Button-Linear,
		linear-gradient(90deg, #082954 0%, #143b6e 100%)
	);
`;

const Action = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

const FieldItem = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const FieldItemLabel = styled.div`
	color: #b4b4b4;
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px; /* 128.571% */
`;
const FieldItemValue = styled.div`
	color: #fff;
	text-align: right;
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 18px; /* 128.571% */
	max-width: 178px;

	word-wrap: break-word;
	word-break: break-word;
	overflow-wrap: break-word;
	white-space: normal;
`;

export default DepositInfoPopup;
