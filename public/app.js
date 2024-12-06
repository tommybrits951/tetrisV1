

document.addEventListener("DOMContentLoaded", () => {

  const gameboard = document.querySelector("#gameboard")
  const startBtn = document.querySelector("#startBtn")
  
  let timerID
  let curPos = 4
  let rotation = 0
  const width = 10
  for (let i = 0; i < 200; i++) {
  const square = document.createElement("div")
  square.classList.add("square")
  gameboard.append(square)
}
for (let i = 0; i < 10; i++) {
  const square = document.createElement("div")
  square.classList.add("taken")
  square.classList.add("square")
  square.classList.add("hidden")
  gameboard.append(square)
  
}
const squaresArray = Array.from(document.querySelectorAll(".square"))


const llTetromino = [
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2],
  [1, 2, width+1, width*2+1],
  [width, width+1, width+2, width*2+2]
]
const lrTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2],
  [0, 1, width+1, width*2+1],
  [width+2, width*2, width*2+1, width*2+2]
]

const zlTetromino = [
  [0,1,width+1,width+2],
  [1, width, width+1,width*2],
  [0,1,width+1,width+2],
  [1, width, width+1,width*2]  
]
const zrTetromino = [
  [1,2,width,width+1],
  [0, width, width+1,width*2+1],
  [1,2,width,width+1],
  [0, width, width+1,width*2+1]
]

const tTetromino = [
  [1,width,width+1,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width,width+1,width*2+1]
]

const oTetromino = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
]

const iTetromino = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]
]

const tetros = [iTetromino, oTetromino, zlTetromino, zrTetromino, llTetromino, lrTetromino, tTetromino]
const colorsArray = ["purple", "yellow", "grey", "green", "blue", "red", "orange", "brown"]


 



/* let rando = Math.floor(Math.random() * tetros.length) */
let rando = 5
let nextRando
let currentTetro = tetros[rando][rotation]
let currentColor = colorsArray[rando]
function draw() {
  currentTetro.forEach(index => {
    squaresArray[curPos + index].classList.add("tetro")
    squaresArray[curPos + index].style.background = currentColor
    squaresArray[curPos + index].style.borderColor = currentColor
  })
}
function undraw() {
  currentTetro.forEach(index => {
    squaresArray[curPos + index].classList.remove("tetro")
    squaresArray[curPos + index].style.background = "black"
  })
}
function handleFreeze() {
  
  rando = nextRando
  console.log(index)
  nextRando = Math.floor(Math.random() * tetros.length)
  currentTetro = tetros[nextRando][rotation]
  rotation = 0
  curPos = 4
  draw()
}


function freeze() {
  for (let i = 0; i < currentTetro.length; i++) {
    if (currentTetro.some(index => squaresArray[curPos + index + width].classList.contains("taken"))) {
      currentTetro.forEach(idx => squaresArray[curPos + idx].classList.add("taken"))
      clearInterval(timerID)
      timerID = null
      rando = nextRando
      nextRando = Math.floor(Math.random() * tetros.length)
      currentTetro = tetros[rando][rotation]
      currentColor = colorsArray[rando]
      rotation = 0
      curPos = 4
      draw()
      timerID = setInterval(moveDown, 400)
      nextRando = Math.floor(Math.random() * tetros.length)
    }
  }
}
function moveLeft() {
  undraw()
  curPos -= 1
  draw()
}
function moveRight() {
  undraw()
  curPos += 1
  draw()
}
function moveDown() {
  undraw()
  curPos += width;
  console.log(curPos)
  draw()
  freeze()
}
function rotateTetro() {
  undraw()
  rotation++
  if (rotation === 4) {
    rotation = 0
  } 
  currentTetro = tetros[rando][rotation]
  draw()
}

function isRight() {
  return currentTetro.some(index => (curPos + index + 1) % width === 0)
}
function isLeft() {
  return currentTetro.some(index => (curPos + index) % width === 0)
}

startBtn.addEventListener("click", () => {
  if (timerID) {
    clearInterval(timerID)
    timerID = null
  } else {
    draw()
    timerID = setInterval(moveDown, 400)
    nextRando = Math.floor(Math.random() * tetros.length)
  }
})

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 38) {
    rotateTetro()
  } else if (e.keyCode === 40) {
    moveDown()
  }
})
})