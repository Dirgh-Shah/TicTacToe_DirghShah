let currentPlayer = 'X';
let gameStatus = ['', '', '', '', '', '', '', '', '']; 

function playerMove(cellId) {
    let cell = document.getElementById(cellId);
    if (gameStatus[cellId] === '' && !isGameFinished()) {
        gameStatus[cellId] = currentPlayer; 
        cell.textContent = currentPlayer; 
        if (checkWin(currentPlayer)) {
            result.innerHTML = currentPlayer + ' wins!!!'
            result.style.color = '#4ef037'
            resetGame();
        } else if (checkDraw()) { 
            result.innerHTML = 'It is a draw.'
            result.style.color = 'red'
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function isGameFinished() {
    return checkWin('X') || checkWin('O') || checkDraw();
}

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    return winCombos.some(combination => {
        return combination.every(index => {
            return gameStatus[index] === player;
        });
    });
}

function checkDraw() {
    return gameStatus.every(cell => cell !== ''); 
}

function resetGame() {
    gameStatus = ['', '', '', '', '', '', '', '', '']; 
    currentPlayer = 'X';
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.first, .second, .third');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            playerMove(cell.id);
        });
    });
});

const result =  document.querySelector(".result");
