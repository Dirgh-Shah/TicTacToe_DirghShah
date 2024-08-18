// Initialize the game variables
let currentPlayer = 'X'; // X starts the game
let gameStatus = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 grid

// Function to handle a player's move
function playerMove(cellId) {
    // Check if the cell is empty and the game is still ongoing
    let cell = document.getElementById(cellId);
    if (gameStatus[cellId] === '' && !isGameFinished()) {
        gameStatus[cellId] = currentPlayer; // Update the game status
        cell.textContent = currentPlayer; // Display the move on the UI
        // Check if the current move resulted in a win
        if (checkWin(currentPlayer)) {
            //alert(currentPlayer + ' wins!');
            result.innerHTML = currentPlayer + ' wins!!!'
            result.style.color = '#4ef037'
            resetGame();
        } else if (checkDraw()) { // Check if the game is a draw
            //alert('It\'s a draw!');
            result.innerHTML = 'It is a draw.'
            result.style.color = 'red'
            resetGame();
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check if the game is finished (win or draw)
function isGameFinished() {
    return checkWin('X') || checkWin('O') || checkDraw();
}

// Function to check if a player has won
function checkWin(player) {
    // Define winning combinations (indices of gameStatus)
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check each winning combination
    return winCombos.some(combination => {
        return combination.every(index => {
            return gameStatus[index] === player;
        });
    });
}

// Function to check if the game is a draw
function checkDraw() {
    return gameStatus.every(cell => cell !== ''); // Check if all cells are filled
}

// Function to reset the game
function resetGame() {
    gameStatus = ['', '', '', '', '', '', '', '', '']; // Reset game status
    currentPlayer = 'X'; // X starts the game again
    // Clear the UI
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).textContent = '';
    }
}

// Initialize the game grid
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.first, .second, .third');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            playerMove(cell.id);
        });
    });
});
const result =  document.querySelector(".result");