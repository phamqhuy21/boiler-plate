import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pikachu } from '../../games/pikachu';

export default function PikachuGame() {
	const [selectedIdxCell, setSelectedIdxCell] = useState<number[]>([]);
	const [pikachu, setPikachu] = useState<Pikachu>();
	const [board, setBoard] = useState<number[][]>([]);

	const handleSelectCell = (rIdx: number, cIdx: number) => {
		const rSelectedIdx = selectedIdxCell[0];
		const cSelectedIdx = selectedIdxCell[1];
		// if (rIdx === rSelectedIdx) {

		// }
		if (selectedIdxCell.length > 0) {
			return setSelectedIdxCell([]);
		}
		return setSelectedIdxCell([rIdx, cIdx]);
	};

	useEffect(() => {
		const pikachu = new Pikachu();
		setPikachu(pikachu);
		pikachu.generateBoard();
		setBoard(pikachu.getBoard());
	}, []);

	return (
		<Wrapper>
			{board.length && (
				<MapWrapper col={board[0].length}>
					{board.map((row, rIdx) => {
						return row.map((cell, cIdx) => {
							if (cell === 0) {
								return <div key={`${rIdx}-${cIdx}`}>{cell}</div>;
							}
							return (
								<Cell
									key={`${rIdx}-${cIdx}`}
									onClick={() => {
										handleSelectCell(rIdx, cIdx);
									}}
									selected={
										selectedIdxCell.length > 0 &&
										rIdx === selectedIdxCell[0] &&
										cIdx === selectedIdxCell[1]
									}
								>
									{cell}
								</Cell>
							);
						});
					})}
				</MapWrapper>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MapWrapper = styled.div<{ col: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.col}, 1fr)`};
	gap: 1px;
`;

const Cell = styled.div<{ selected: boolean }>`
	background-color: ${(props) => (props.selected ? 'yellow' : 'red')};
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
