let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = false;

const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');

startGame();

function startGame() {
	isGameActive = true;
	currentPlayer = 'X';
	cells.forEach(cell => {
		cell.addEventListener('click', cellClicked);
	});
	result.textContent = '';
}

function cellClicked(e) {
	const cell = e.target;
	const index = cell.dataset.index;

	if (board[index] == '' && isGameActive) {
		board[index] = currentPlayer;
		cell.textContent = currentPlayer;
		cell.removeEventListener('click', cellClicked);
		checkForWin();
		changePlayer();
	}
}

function changePlayer() {
	currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

function checkForWin() {
	const winningCombos = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], 
		[0, 3, 6], [1, 4, 7], [2, 5, 8], 
		[0, 4, 8], [2, 4, 6]
	];

	winningCombos.forEach(combo => {
		const [a, b, c] = combo;
		if (board[a] && board[a] == board[b] && board[a] == board[c]) {
			isGameActive = false;
			result.textContent = `${board[a]} wins!`;
		}
	});

	if (!board.includes('') && isGameActive) {
		isGameActive = false;
		result.textContent = 'It\'s a draw!';
	}
}

function resetBoard() {
	board = ['', '', '', '', '', '', '', '', ''];
	cells.forEach(cell => {
		cell.textContent = '';
		cell.addEventListener('click',
        resetBoard);
});
result.textContent = '';
startGame();
}

resetButton.addEventListener('click', resetBoard);