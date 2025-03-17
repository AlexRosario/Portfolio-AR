export default function Battleship() {
	let playerBoard = {};
	let computerBoard = {};
	let boardSize = 10;
	let computerBattleshipsDown = 0;
	let playerBattleshipsDown = 0;
	let compLastHit = '';

	const shipKind = {
		1: 'Destroyer',
		2: 'Submarine',
		3: 'Cruiser',
		4: 'Battleship',
		5: 'Carrier',
	};

	const ships = [
		{ name: '1', size: 2 },
		{ name: '2', size: 3 },
		{ name: '3', size: 3 },
		{ name: '4', size: 4 },
		{ name: '5', size: 5 },
	];
	const playerShips = [
		{ name: '1', size: 2 },
		{ name: '2', size: 3 },
		{ name: '3', size: 3 },
		{ name: '4', size: 4 },
		{ name: '5', size: 5 },
	];

	function createGrid(size) {
		const grid = {};

		for (let i = 1; i <= size; i++) {
			const row = String.fromCharCode(i + 64);
			grid[row] = {};
			for (let j = 1; j <= size; j++) {
				grid[row][j] = '';
			}
		}
		return grid;
	}

	function placeShipRandomly(grid, size, name) {
		let space;
		do {
			let startRow = String.fromCharCode(Math.ceil(Math.random() * boardSize) + 64);
			let startCol = Math.ceil(Math.random() * boardSize);
			const isHorizontal = Math.random() < 0.5;
			space = 0;

			if (isHorizontal) {
				for (let i = 0; i < size; i++) {
					if (grid[startRow][startCol + i] === '') space += 1;
					else break;
				}
				if (space === size) {
					for (let i = 0; i < size; i++) grid[startRow][startCol + i] = name;
				}
			} else {
				for (let i = 0; i < size; i++) {
					let nextRow = String.fromCharCode(startRow.charCodeAt(0) + i);
					if (grid[nextRow] && grid[nextRow][startCol] === '') space += 1;
					else break;
				}
				if (space === size) {
					for (let i = 0; i < size; i++) {
						let nextRow = String.fromCharCode(startRow.charCodeAt(0) + i);
						if (grid[nextRow]) grid[nextRow][startCol] = name;
					}
				}
			}
		} while (space < size);
	}

	function renderBoard(board, containerId, isComputer) {
		const boardDiv = document.getElementById(containerId);
		boardDiv.innerHTML = '';

		for (let row = 1; row <= boardSize; row++) {
			for (let col = 1; col <= boardSize; col++) {
				let rowKey = String.fromCharCode(row + 64);
				let cell = document.createElement('div');
				cell.classList.add('cell');
				cell.dataset.position = `${rowKey}${col}`;

				if (isComputer) {
					cell.textContent = '';
					cell.addEventListener('click', () => {
						playerMove(rowKey, col, cell);
					});
				}
				if (!isComputer) {
					const value = board[rowKey][col];
					if (value !== '') {
						let icon = document.createElement('i');
						icon.classList.add('fas', 'fa-ship');
						icon.style.color = 'black';
						cell.appendChild(icon);
					}
				}
				boardDiv.appendChild(cell);
			}
		}
	}

	function playerMove(row, col, cell) {
		let icon = document.createElement('i');
		let index = computerBoard[row][col] - 1;

		if (computerBoard[row][col] === '') {
			cell.classList.add('miss');
			icon.classList.add('fas', 'fa-water');
			icon.style.color = 'black';
			cell.appendChild(icon);
			computerBoard[row][col] = 'O';
		} else if (+computerBoard[row][col] > 0) {
			cell.classList.add('player-hit');
			icon.classList.add('fas', 'fa-ship');
			icon.style.color = 'black';
			cell.appendChild(icon);
			ships[index].size--;
			computerBoard[row][col] = 'X';
			if (ships[index].size === 0) {
				alert(`You sunk computer's ${shipKind[ships[index].name]}`);
				computerBattleshipsDown++;
			}

			if (computerBattleshipsDown === 5) {
				alert("You sunk all of the computer's battleships and won the game!");
				return Battleship().startGame();
			}
		}
		cell.style.pointerEvents = 'none';

		setTimeout(() => computerMove(), 1000);
	}

	function getLogicalMoves(row, col) {
		let moves = {};

		let rowKey = String.fromCharCode(row + 64);
		let rowAbove = String.fromCharCode(row - 1 + 64);
		let rowBelow = String.fromCharCode(row + 1 + 64);

		if (row - 1 >= 1 && playerBoard[rowAbove][col] !== 'X' && playerBoard[rowAbove][col] !== 'O')
			moves.up = [row - 1, col];
		if (row + 1 <= boardSize && playerBoard[rowBelow][col] !== 'X' && playerBoard[rowBelow][col] !== 'O')
			moves.down = [row + 1, col];
		if (col - 1 >= 1 && playerBoard[rowKey][col - 1] !== 'X' && playerBoard[rowKey][col - 1] !== 'O')
			moves.left = [row, col - 1];
		if (col + 1 <= boardSize && playerBoard[rowKey][col + 1] !== 'X' && playerBoard[rowKey][col + 1] !== 'O')
			moves.right = [row, col + 1];
		return moves;
	}

	function computerMove() {
		let row, col, rowKey;

		if (compLastHit) {
			row = compLastHit[0];
			col = compLastHit[1];
			let moves = getLogicalMoves(...compLastHit);
			let keys = Object.keys(moves);
			if (keys.length > 0) {
				let direction = keys[Math.floor(Math.random() * keys.length)];
				row = moves[direction][0];
				col = moves[direction][1];
				rowKey = String.fromCharCode(row + 64);
			} else {
				compLastHit = '';
			}
		}
		if (!compLastHit) {
			do {
				row = Math.ceil(Math.random() * boardSize);
				col = Math.ceil(Math.random() * boardSize);
				rowKey = String.fromCharCode(row + 64);
			} while (playerBoard[rowKey][col] === 'O' || playerBoard[rowKey][col] === 'X');
		}

		let cell = document.querySelector(`#playerBoard .cell[data-position='${rowKey}${col}']`);
		if (playerBoard[rowKey][col] === '') {
			cell.classList.add('miss');
			playerBoard[rowKey][col] = 'O';
		} else if (+playerBoard[rowKey][col] > 0) {
			let index = playerBoard[rowKey][col] - 1;
			cell.classList.add('computer-hit');

			playerBoard[rowKey][col] = 'X';
			playerShips[index].size--;
			if (playerShips[index].size == 0) {
				playerBattleshipsDown++;
				compLastHit = '';
				alert(`Computer sunk your ${shipKind[+ships[index].name]}`);
			}

			if (playerBattleshipsDown === 5) {
				alert('Computer sunk all of your battleships. You lost the game!');
				return Battleship().startGame();
			}
			if (playerShips[index].size !== 0) {
				compLastHit = [row, col];
			}
		}
	}

	function startGame() {
		playerBoard = createGrid(boardSize);
		computerBoard = createGrid(boardSize);

		for (const ship of ships) {
			placeShipRandomly(playerBoard, ship.size, ship.name);
			placeShipRandomly(computerBoard, ship.size, ship.name);
		}

		renderBoard(playerBoard, 'playerBoard', false);
		renderBoard(computerBoard, 'computerBoard', true);
	}

	return { startGame };
}
