const gameboard = document.querySelector("#gameboard");
const startBtn = document.querySelector("#startBtn");

const populateBoard = () => {
    for (let i = 0; i < 200; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        gameboard.append(square)
    }
}
populateBoard()
const squaresArray = Array.from(document.querySelectorAll(".square"))

console.log(squaresArray)