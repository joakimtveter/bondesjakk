const X_CLASS = "x"
const OH_CLASS = "oh"
const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const restartButton = document.getElementById("restartButton")
const winningMessage = document.getElementsByClassName("winning-message")[0]
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
let ohTurn

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
    ohTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(OH_CLASS)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverTurn()
    winningMessage.classList.remove("show")
}


function handleClick(e) {
    const cell = e.target
    const currentTurn = ohTurn ? OH_CLASS : X_CLASS
    placeMark(cell, currentTurn)
    if (checkWin(currentTurn)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverTurn()
    }
    
}
 
function placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn)
}

function swapTurn() {
    ohTurn = !ohTurn
}

function setBoardHoverTurn() {
    board.classList.remove(X_CLASS)
    board.classList.remove(OH_CLASS)
    if (ohTurn) {
        board.classList.add(OH_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(OH_CLASS)
    })
}

function checkWin(currentTurn) {
    return WIN_CONDITIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentTurn)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "UAVGJORT!"
    } else {
        winningMessageTextElement.innerText = ohTurn ? "O ER VINNEREN" : "X ER VINNEREN!"
    }
    winningMessage.classList.add("show")
}