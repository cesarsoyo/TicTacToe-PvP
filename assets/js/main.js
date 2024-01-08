document.addEventListener('DOMContentLoaded', function () {

    let board = document.getElementById('board');
    let cells = document.querySelectorAll('.cell');
    let restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let playerOne = window.prompt("Nom du joueur 1 : ")
    let playerTwo = window.prompt("Nom du joueur 2 : ")

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (isGameActive && !cell.textContent) {
                cell.textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    currentPlayer = currentPlayer === 'X' ? playerOne : playerTwo;
                    endGame(`${currentPlayer} est le gagnant`);
                } else if (isDraw()) {
                    endGame("C'est un match");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    restartBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        restartBtn.style.display = 'none';
        isGameActive = true;
        currentPlayer = 'X';
    });

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => cells[index].textContent === player);
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function endGame(message) {
        isGameActive = false;
        restartBtn.style.display = 'block';
        alert(message);
    }
});
