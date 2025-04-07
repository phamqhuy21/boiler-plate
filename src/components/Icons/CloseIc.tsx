import React from 'react';

export default function CloseIc() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={30}
			height={30}
			viewBox="0 0 30 30"
			fill="none"
		>
			<rect width={30} height={30} rx={15} fill="white" fillOpacity="0.1" />
			<path
				d="M20 10L10 20"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10 10L20 20"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
