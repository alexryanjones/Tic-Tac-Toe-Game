const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessage = document.getElementById('endGameMessage');
const xClass = 'x';
const oClass = 'o';
const restartButton = document.getElementById('restartButton');
let oTurn;
const winningMessageText = document.querySelector('[outcome-message-text]');
const winningCombinations = [
    [0, 1, 2], // horizontals
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // verticals
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
]

startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show');

}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurns();
        setBoardHoverClass();
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageText.innerHTML = 'Draw!'
    } else {
        winningMessageText.innerHTML = `${oTurn ? "O's" : "X's"} Win!`
    }
    winningMessage.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass () {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (oTurn) {
        board.classList.add(oClass);
    } else {
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}