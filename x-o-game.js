let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let isHumanVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

document.getElementById('human-vs-human').addEventListener('click', function() {
    isHumanVsComputer = false;
    startGame();
});

document.getElementById('human-vs-computer').addEventListener('click', function() {
    isHumanVsComputer = true;
    startGame();
});

function startGame() {
    document.querySelector('.game-mode').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.grid').forEach(cell => cell.textContent = '');
}

document.querySelectorAll('.grid').forEach(cell => {
    cell.addEventListener('click', function() {
        const cellIndex = parseInt(this.id.replace('cell-', ''));
        if (board[cellIndex] !== '' || !gameActive) return;

        board[cellIndex] = currentPlayer;
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer === 'X' ? 'red' : 'blue');

        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== '')) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (isHumanVsComputer && currentPlayer === 'O') {
            computerMove();
        }
    });
});

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function computerMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomCell] = 'O';
    document.getElementById(`cell-${randomCell}`).textContent = 'O';
    document.getElementById(`cell-${randomCell}`).classList.add('blue');

    if (checkWin()) {
        alert('O wins!');
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = 'X';
    }
}
