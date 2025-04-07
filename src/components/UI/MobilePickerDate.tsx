import Picker from 'react-mobile-picker';
import styled from 'styled-components';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const getDaysInMonth = (year: number) => {
	return [
		31, // January
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, // February (check leap year)
		31, // March
		30, // April
		31, // May
		30, // June
		31, // July
		31, // August
		30, // September
		31, // October
		30, // November
		31, // December
	];
};

const years = Array.from({ length: 100 }, (_, i) => 2010 + i);

const MobilePickerDate = ({
	value,
	onChange,
}: {
	value: any;
	onChange: (value: any) => void;
}) => {
	const getDays = (month: string, year: number) => {
		let length = 31;
		const foundIndexMonth = months.findIndex((m) => m === month);
		if (foundIndexMonth) {
			length = getDaysInMonth(year)[foundIndexMonth];
		}
		return Array.from({ length }, (_, i) => i + 1);
	};
	return (
		<PickerWrapper>
			<Picker wheelMode="natural" value={value} onChange={onChange}>
				<MobilePickerDateColumn options={months} name="month" />
				<MobilePickerDateColumn
					options={getDays(value.month, value.year)}
					name="day"
				/>
				<MobilePickerDateColumn options={years} name="year" />

				<SelectedLayer>
					<SelectedLayerLineTop />
					<SelectedLayerLineBottom />
				</SelectedLayer>
			</Picker>
		</PickerWrapper>
	);
};

const MobilePickerDateColumn = ({
	options,
	name,
}: {
	options: any[];
	name: string;
}) => {
	return (
		<Picker.Column name={name} className="pickerColumn">
			{options.map((option: string) => (
				<Picker.Item
					key={option}
					value={option.toString()}
					className="pickerItem"
				>
					{({ selected }) => {
						return (
							<StyledPickerItemText selected={selected}>
								{option}
							</StyledPickerItemText>
						);
					}}
				</Picker.Item>
			))}
		</Picker.Column>
	);
};

const PickerWrapper = styled.div`
	.pickerColumn {
		position: relative;
		z-index: 2;
	}
`;

const SelectedLayer = styled.div`
	height: 36px;
	margin-top: -18px;
	position: absolute;
	top: 50%;
	left: 0px;
	width: 100%;
	pointer-events: none;
	border-radius: 8px;
	background: #0000004c;
	z-index: 1;
`;

const SelectedLayerLineTop = styled.div`
	position: absolute;
	inset: 0px auto auto 0px;
	width: 100%;
	height: 1px;
	background: linear-gradient(90deg, #082954 0%, #143b6e 100%);
`;
const SelectedLayerLineBottom = styled.div`
	position: absolute;
	inset: auto auto 0px 0px;
	width: 100%;
	height: 1px;
	background: linear-gradient(90deg, #082954 0%, #143b6e 100%);
`;
const StyledPickerItemText = styled.div<{ selected: boolean }>`
	color: ${(props) => (props.selected ? '#fff' : '#5B6A84')};
	text-align: center;
	font-family: Poppins;
	font-style: normal;
	font-weight: 500;
	line-height: 28px;
	font-size: 18px;
`;

export default MobilePickerDate;
