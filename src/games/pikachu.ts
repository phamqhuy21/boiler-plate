import { generate2DArray } from '../utils/generate2DArray';

const barricade = -1;
const footmark = -2;
const path = 0;

const defaultBoard = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 2, 3, 4, 5, 6, 0],
	[0, 7, 8, 1, 9, 2, 5, 0],
	[0, 3, 6, 10, 4, 10, 11, 0],
	[0, 12, 7, 11, 12, 9, 8, 0],
	[0, 14, 13, 15, 15, 13, 14, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

export class Pikachu {
	private board: number[][];
	private turnNumber: number;
	private maxTurnNumber: number;
	private footMarks: number[][];
	private currentPosition: number[];
	private boardSize: number[];

	constructor(size?: number[]) {
		this.turnNumber = 0;
		this.maxTurnNumber = 3;
		this.board = defaultBoard;
		this.footMarks = [];
		this.currentPosition = [];
		this.boardSize = !size ? [10, 10] : [size[0], size[1]];
	}

	generateBoard() {
		const pairs = (this.boardSize[0] * this.boardSize[1]) / 2;
		const tileValues = [];
		for (let i = 1; i <= pairs; i++) {
			tileValues.push(i, i); // Add each pair twice
		}
		tileValues.sort(() => Math.random() - 0.5); // Shuffle
		const generatedBoard = generate2DArray(
			this.boardSize[0],
			this.boardSize[1]
		);
		for (let row = 1; row < this.boardSize[0] + 1; row++) {
			for (let col = 1; col < this.boardSize[1] + 1; col++) {
				generatedBoard[row][col] = tileValues.shift() || 1;
			}
		}
		this.board = generatedBoard;
	}

	getBoard() {
		return this.board;
	}

	updatePosition(x: number, y: number) {
		this.currentPosition = [x, y];
	}

	canConnect(start: number[], end: number[]) {
		const directions = [
			[0, 1], // right
			[1, 0], // down
			[0, -1], // left
			[-1, 0], // up
		];
		const queue = [start];
		const visited = new Set();

		while (queue.length > 0) {
			const [x, y] = queue.shift() as number[];
			if (x === end[0] && y === end[1]) return true;

			for (const [dx, dy] of directions) {
				const nx = x + dx;
				const ny = y + dy;
				if (this.isValidMove(nx, ny) && !visited.has(`${nx},${ny}`)) {
					visited.add(`${nx},${ny}`);
					queue.push([nx, ny]);
				}
			}
		}
		return false;
	}

	isValidMove(x: number, y: number) {
		return (
			x >= 0 &&
			x < this.board.length &&
			y >= 0 &&
			y < this.board[0].length &&
			this.board[x][y] !== 0
		);
	}

	bfsWithBranchLimit(start: number[], destination: number, maxBranch = 3) {
		const rows = this.boardSize[0];
		const cols = this.boardSize[1];

		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]; // up, down, left, right

		const queue = [[start, 0]]; // Starting point with 0 directions explored
		const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
		const parent = {}; // For path reconstruction
		visited[start[0]][start[1]] = true;

		while (queue.length > 0) {
			const [[currentRow, currentCol], directionsExplored] = queue.shift();

			// If we reach the destination, reconstruct the path
			if (currentRow === destination[0] && currentCol === destination[1]) {
				return this.reconstructPath(parent, destination);
			}

			// Explore all 4 possible directions
			for (const [dr, dc] of directions) {
				const nextRow = currentRow + dr;
				const nextCol = currentCol + dc;

				// Check if the next cell is within bounds and not a barricade
				if (
					this.isWithinBounds(nextRow, nextCol, rows, cols) &&
					!visited[nextRow][nextCol] &&
					matrix[nextRow][nextCol] === 0
				) {
					visited[nextRow][nextCol] = true;
					parent[`${nextRow},${nextCol}`] = `${currentRow},${currentCol}`;

					// If we have not exceeded the branch limit, continue exploring
					if (directionsExplored < maxBranch) {
						queue.push([[nextRow, nextCol], directionsExplored + 1]);
					}
				}
			}
		}

		return []; // No path found
	}

	isWithinBounds(row, col, rows, cols) {
		return row >= 0 && row < rows && col >= 0 && col < cols;
	}

	reconstructPath(parent, destination) {
		const path = [];
		let current = `${destination[0]},${destination[1]}`;

		while (current in parent) {
			path.push(current);
			current = parent[current];
		}

		path.push(`${destination[0]},${destination[1]}`);
		return path.reverse(); // Reverse the path to get start to end order
	}
}
