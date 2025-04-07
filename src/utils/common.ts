import BigNumber from 'bignumber.js';

export const formatNumber = (value: number | string) => {
	const number = new BigNumber(value);
	const formattedNumber = number.toFormat(0);
	return formattedNumber;
};

export const nthNumber = (n: number) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
};

export const shortenNumber = (value: number, defaultDecimals?: number) => {
	const decimals = defaultDecimals === undefined ? 1 : defaultDecimals;
	if (value < 1000) return value;
	if (value < 1000000) return `${(value / 1000).toFixed(decimals)}K`;
	if (value < 1000000000) return `${(value / 1000000).toFixed(decimals)}M`;
	return `${(value / 1000000000).toFixed(decimals)}B`;
};

export const hideName = (name: string, characterNumber?: number) => {
	if (!name) return '';
	return name.slice(0, characterNumber || 5) + '***';
};

export const renderFriendText = (value: number) => {
	if (value <= 1) return `${value} Friend`;
	return `${formatToken(value)} Friends`;
};
export function createMarkup(content: string) {
	return { __html: content };
}

export const shortenAddress = (address: string) => {
	if (!address) return '';
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatToken = (
	number: number | string,
	decimal?: number
): string => {
	const value = new BigNumber(number).toNumber();
	return new Intl.NumberFormat('en-US', {
		style: 'decimal',
		maximumFractionDigits: decimal || 3,
	}).format(value);
};

export const getStaleTime = (time: number) => {
	return 1000 * 60 * time;
};

export const getName = (
	firstName: string,
	lastName: string,
	username: string
) => {
	return (firstName + ' ' + lastName)?.trim()?.length > 0
		? firstName + ' ' + lastName
		: username;
};

//encode function
export function encode(data: string) {
	return encodeURIComponent(data);
}
