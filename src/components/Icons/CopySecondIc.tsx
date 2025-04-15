import React from 'react';

const CopySecondIc = ({
	onClick,
}: {
	onClick?: React.MouseEventHandler<SVGSVGElement>;
}) => {
	return (
		<svg
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M17.8931 3H9.70689C7.99392 3 6.6 4.39392 6.6 6.10689V6.6H6.10689C4.39392 6.6 3 7.99392 3 9.70689V17.893C3 19.6061 4.39392 21 6.10689 21H14.293C15.8667 21 17.157 19.8194 17.3588 18.3H17.893C19.6061 18.3 21 16.9061 21 15.1931V6.10689C21 4.39392 19.6061 3 17.8931 3ZM19.2 15.1931C19.2 15.9137 18.6137 16.5 17.8931 16.5H17.4V9.70689C17.4 7.99392 16.0061 6.6 14.2931 6.6H8.4V6.10689C8.4 5.38626 8.98626 4.8 9.70689 4.8H17.893C18.6137 4.8 19.2 5.38626 19.2 6.10689V15.1931Z"
				fill="white"
				fillOpacity="0.6"
			/>
		</svg>
	);
};

export default CopySecondIc;
