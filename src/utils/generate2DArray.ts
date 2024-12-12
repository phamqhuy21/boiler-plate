export const generate2DArray = (rows: number, cols: number): number[][] => {
	const actualRows = rows + 2;
	const actualCols = cols + 2;
	const array = new Array(actualRows)
		.fill(null)
		.map((_, rowIndex) =>
			new Array(actualCols)
				.fill(null)
				.map((_, colIndex) =>
					rowIndex === 0 ||
					rowIndex === actualRows - 1 ||
					colIndex === 0 ||
					colIndex === actualCols - 1
						? 0
						: 1
				)
		);
	return array;
};
