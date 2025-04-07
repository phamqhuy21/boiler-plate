import React from 'react';

const ArrowSquareLeftIc = ({
	onClick,
}: {
	onClick?: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return (
		<svg
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			width={25}
			height={25}
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				opacity="0.2"
				d="M15.5 2.5L9.5 2.5C4.5 2.5 2.5 4.5 2.5 9.5L2.5 15.5C2.5 20.5 4.5 22.5 9.5 22.5L15.5 22.5C20.5 22.5 22.5 20.5 22.5 15.5L22.5 9.5C22.5 4.5 20.5 2.5 15.5 2.5Z"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.5 16L14.5 12.5L11.5 9"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ArrowSquareLeftIc;
