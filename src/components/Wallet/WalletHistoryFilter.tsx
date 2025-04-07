import React, { useEffect, useState } from 'react';
import ArrowSquareLeftIc from '../Icons/ArrowSquareLeftIc';
import styled from 'styled-components';
import { Flex } from 'antd';
import { HistoryStatus } from './WalletHistory';
import moment from 'moment';
import MobilePickerDate from '../UI/MobilePickerDate';
import PopupUI from '../UI/PopupUI';

const optionDates = ['day', 'week', 'month'];
const DATE_FORMAT = 'YYYY-MM-DD';

export interface IFilterValues {
	status?: HistoryStatus;
	startDate: string;
	endDate: string;
}

const WalletHistoryFilter = ({
	onFilterConfirm,
	onReset,
	tab,
}: {
	onFilterConfirm: (values: IFilterValues) => void;
	onReset: () => void;
	tab?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [statusActive, setStatusActive] = useState<HistoryStatus>();
	const [pickerValue, setPickerValue] = useState<any>({
		month: moment().format('MMMM'),
		day: moment().format('DD'),
		year: moment().format('YYYY'),
	});
	const [selectFieldDate, setSelectFieldDate] = useState<'start' | 'end'>();
	const [selectOptionDate, setSelectOptionDate] = useState<string>();
	const [fieldDates, setFieldDates] = useState({
		start: '',
		end: '',
	});

	const onClose = () => {
		setIsOpen(false);
	};
	const handleReset = () => {
		setStatusActive(undefined);
		setIsOpen(false);
		onReset();
	};
	const onSelectStatus = (status: HistoryStatus) => {
		setStatusActive(status);
	};
	const onConfirm = () => {
		const values = {
			status: statusActive,
			startDate: fieldDates.start,
			endDate: fieldDates.end,
		};
		onFilterConfirm(values);
		setIsOpen(false);
	};
	const handleSelectOptionDate = (option: string) => {
		setSelectOptionDate(option);
		switch (option) {
			case 'day':
				setFieldDates({
					start: moment().subtract(1, 'day').format(DATE_FORMAT),
					end: moment().format(DATE_FORMAT),
				});
				break;

			case 'week':
				setFieldDates({
					start: moment().subtract(6, 'day').format(DATE_FORMAT),
					end: moment().format(DATE_FORMAT),
				});
				break;

			case 'month':
				setFieldDates({
					start: moment().subtract(29, 'day').format(DATE_FORMAT),
					end: moment().format(DATE_FORMAT),
				});
				break;
		}
	};

	const onChangePicker = (value: any) => {
		setPickerValue(value);
		if (selectOptionDate) setSelectOptionDate('');
	};

	const resetFilter = () => {
		setStatusActive(undefined);
		setSelectFieldDate(undefined);
		setSelectOptionDate(undefined);
		setPickerValue({
			month: moment().format('MMMM'),
			day: moment().format('DD'),
			year: moment().format('YYYY'),
		});
		setFieldDates({
			start: '',
			end: '',
		});
	};

	useEffect(() => {
		resetFilter();
	}, [tab]);

	useEffect(() => {
		const result = [pickerValue.month, pickerValue.day, pickerValue.year].join(
			'-'
		);
		if (selectFieldDate === 'start') {
			setFieldDates({
				...fieldDates,
				start: moment(result, 'MMMM-DD-YYYY').format(DATE_FORMAT),
			});
		}
		if (selectFieldDate === 'end') {
			setFieldDates({
				...fieldDates,
				end: moment(result, 'MMMM-DD-YYYY').format(DATE_FORMAT),
			});
		}
	}, [pickerValue, selectFieldDate]);

	return (
		<>
			<FilterBlock onClick={() => setIsOpen(true)}>
				Filter By
				<ArrowSquareLeftIc />
			</FilterBlock>

			<PopupUI open={isOpen} title="Filter by" onClose={onClose}>
				<PopupFilterWrapper>
					<Flex justify="space-between" align="center">
						<Label>Status:</Label>

						<ListOption>
							<OptionPending
								$active={statusActive === HistoryStatus.PENDING}
								onClick={() => onSelectStatus(HistoryStatus.PENDING)}
							>
								Pending
							</OptionPending>
							<OptionFail
								$active={statusActive === HistoryStatus.FAIL}
								onClick={() => onSelectStatus(HistoryStatus.FAIL)}
							>
								Fail
							</OptionFail>
							<OptionSuccessful
								$active={statusActive === HistoryStatus.SUCCESSFUL}
								onClick={() => onSelectStatus(HistoryStatus.SUCCESSFUL)}
							>
								Successful
							</OptionSuccessful>
						</ListOption>
					</Flex>

					<Divider />

					<Flex justify="space-between" align="center">
						<Label>Dates:</Label>

						<ListOption>
							{optionDates.map((option) => (
								<Option
									$disable={option !== selectOptionDate}
									onClick={() => handleSelectOptionDate(option)}
									key={option}
								>
									1 {option}
								</Option>
							))}
						</ListOption>
					</Flex>

					<FieldSelectDate>
						<FieldDate
							$selected={selectFieldDate === 'start'}
							onClick={() => setSelectFieldDate('start')}
						>
							{fieldDates.start}
						</FieldDate>
						<LabelDate>To</LabelDate>
						<FieldDate
							$selected={selectFieldDate === 'end'}
							onClick={() => setSelectFieldDate('end')}
						>
							{fieldDates.end}
						</FieldDate>
					</FieldSelectDate>

					<MobilePickerDate onChange={onChangePicker} value={pickerValue} />

					<Flex gap={16}>
						<ResetButton onClick={handleReset}>Reset</ResetButton>
						<ConfirmButton onClick={() => onConfirm()}>Confirm</ConfirmButton>
					</Flex>
				</PopupFilterWrapper>
			</PopupUI>
		</>
	);
};

const PopupFilterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16px;
`;

const FilterBlock = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	color: #d5d5d5;
	font-family: Poppins;
	font-size: 12px;
	font-weight: 400;
	line-height: 22px;
	background: transparent;
	svg {
		transform: rotate(90deg);
	}
`;

const Label = styled.div`
	color: var(--Main, var(--Native-text_color, #fff));
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 26px; /* 185.714% */
`;

const ListOption = styled.div`
	display: flex;
	gap: 10px;
`;

const Option = styled.div<{ $disable?: boolean }>`
	border-radius: 5px;
	cursor: pointer;
	border: 0.5px solid ${(props) => (props.$disable ? '#757575' : '#fff')};
	background: rgba(0, 0, 0, 0.16);

	display: flex;
	padding: 2px 10px;
	justify-content: center;
	align-items: center;
	gap: 10px;

	color: ${(props) => (props.$disable ? '#B4B4B4' : '#fff')};
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
	text-transform: capitalize;

	min-width: 50px;
`;

const OptionPending = styled(Option)<{ $active?: boolean }>`
	border-radius: 5px;
	border: 0.5px solid #ffab35;
	background: ${(props) => (props.$active ? '#ffab35' : 'rgba(0, 0, 0, 0.16)')};
	color: ${(props) => (!props.$active ? '#ffab35' : '#07264e')};
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
`;

const OptionFail = styled(Option)<{ $active?: boolean }>`
	border-radius: 5px;
	border: 0.5px solid #d43637;
	background: ${(props) => (props.$active ? '#d43637' : 'rgba(0, 0, 0, 0.16)')};
	color: ${(props) => (!props.$active ? '#d43637' : '#07264e')};
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
`;

const OptionSuccessful = styled(Option)<{ $active?: boolean }>`
	border-radius: 5px;
	border: 0.5px solid #15b643;
	background: ${(props) => (props.$active ? '#15b643' : 'rgba(0, 0, 0, 0.16)')};
	color: ${(props) => (!props.$active ? '#15b643' : '#07264e')};
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
`;

const Divider = styled.div`
	height: 1px;
	width: 100%;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0) 100%
	);
`;

const FieldSelectDate = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	.ant-picker-outlined {
		background: transparent !important;
		text-align: center;
		font-family: Poppins;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 26px; /* 216.667% */
		width: 100%;
		text-align: center !important;
		border-radius: 5px !important;
		border: 0.5px solid #fff !important;
		input {
			color: #fff !important;
			text-align: center !important;
		}
	}
`;

const FieldDate = styled.div<{ $selected?: boolean }>`
	cursor: pointer;

	width: 100%;
	height: 28px;
	padding: 2px 10px;
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 5px;
	border: 0.5px solid ${(props) => (props.$selected ? '#fff' : '#757575')};
	background: rgba(0, 0, 0, 0.16);

	color: ${(props) => (props.$selected ? '#fff' : '#B4B4B4')};
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
`;

const LabelDate = styled.div`
	color: #b4b4b4;
	text-align: center;
	font-family: Poppins;
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	line-height: 26px; /* 216.667% */
`;

const ResetButton = styled.div`
	border-radius: 10px;
	border: 1px solid #00abeb;
	display: flex;
	/* height: 38px; */
	width: 100%;
	padding: 12px 20px;
	justify-content: center;
	align-items: center;
	gap: 8px;

	color: #00abeb;
	text-align: center;
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 21px; /* 150% */
	cursor: pointer;
`;

const ConfirmButton = styled.div`
	display: flex;
	width: 100%;
	/* height: 38px; */
	padding: 12px 20px;
	justify-content: center;
	align-items: center;
	gap: 8px;

	border-radius: 10px;
	background: var(--Web-Primary, #00abeb);

	color: #fff;
	text-align: center;
	font-family: Poppins;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 21px; /* 150% */
	cursor: pointer;
`;
export default WalletHistoryFilter;
