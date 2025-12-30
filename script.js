let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleClick(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = "X";
    cells[index].innerText = "❌";

    if (checkWinner("X")) {
        statusText.innerText = "You Win 🎉";
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.innerText = "It's a Draw 😐";
        gameActive = false;
        return;
    }

    statusText.innerText = "Computer's turn 🤖";
    setTimeout(computerMove, 600);
}

function computerMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].innerText = "⭕";

    if (checkWinner("O")) {
        statusText.innerText = "Computer Wins 🤖";
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.innerText = "It's a Draw 😐";
        gameActive = false;
        return;
    }

    statusText.innerText = "Your turn (❌)";
}

function checkWinner(player) {
    return winningConditions.some(condition =>
        condition.every(index => board[index] === player)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerText = "Your turn (❌)";
    cells.forEach(cell => cell.innerText = "");
}
