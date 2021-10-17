const width = 28
const grid = document.querySelector(".grid");
const startEvent = document.querySelector("#start")
const resetEvent = document.querySelector("#restart")
const scoreDisplay  = document.getElementById("score")
const pacmanSpeed = 300
const initialPacmanIndex = 490;
let won = false;
let ghostsScared = false;
let squares = []
let score  = 0;



const layout =  [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
   
]

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        // creating a square
        const square = document.createElement("div")
        // push the square in the grid 
        grid.appendChild(square) 
    // push the square in the squares array
        squares.push(square) 

        if (layout[i] === 0){
            squares[i].classList.add("pac-dot") 
        }
        else if (layout[i] === 2)  {
          squares[i].classList.add("ghost-liar")
        }
        else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        }
        else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet")
        }
    }
}


createBoard()
// starting position  index of pacman ,vc 
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add("pacman")

// console.log(squares.length)


function control(e) {
    squares[pacmanCurrentIndex].classList.remove("pacman")

    switch (e.key) {
        case 'ArrowUp':
            console.log("press up")
            if( !squares[pacmanCurrentIndex - width].classList.contains("ghost-liar") &&
                !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                pacmanCurrentIndex-width >= 0) 
            pacmanCurrentIndex -= width
            
            break
        case 'ArrowRight':
            console.log("press right")
            if( !squares[pacmanCurrentIndex + 1].classList.contains("ghost-liar") &&
                !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                pacmanCurrentIndex % width < width -1) 
            pacmanCurrentIndex += 1
            if(pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break
        case 'ArrowDown':
            console.log("press down")
            if( !squares[pacmanCurrentIndex + width].classList.contains("ghost-liar") &&
                !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                pacmanCurrentIndex + width < width * width) 
                pacmanCurrentIndex += width
            break
        case 'ArrowLeft':
            console.log("press left")
            if( !squares[pacmanCurrentIndex - 1].classList.contains("ghost-liar") &&
                !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                pacmanCurrentIndex % width !== 0) 
                 pacmanCurrentIndex -= 1
              
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
    }
squares[pacmanCurrentIndex].classList.add("pacman")
pacDotEaten()
powerpelletEaten()
checkForWin()
checkForGameOver()
}

document.addEventListener("keyup", control)


function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        squares[pacmanCurrentIndex].classList.remove("pac-dot")  
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerpelletEaten(){
    // if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")){
        // add a score of 10
        score += 10

        squares[pacmanCurrentIndex].classList.remove("power-pellet")

        ghosts.forEach(ghost => ghost.isScared = true)

    //  use setTimeout to unscare ghosts after 10 seconds
        setTimeout(unScareGhosts, 10000)
   
    }      

}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}








class Ghost {
    constructor(className, startIndex, speed){
              this.className = className
              this.startIndex = startIndex
              this.speed = speed
              this.currentIndex = startIndex
              this.isScared = false
              this.timerId = NaN
    }
}
const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]
// draw ghosts on the grid
ghosts.forEach(ghost => 
    {squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

ghosts.forEach(ghost => moveGhost(ghost))


function moveGhost(ghost){
const directions = [-1, +1, -width, +width]
let direction = directions[Math.floor(Math.random() * directions.length)]
console.log(direction)


ghost.timerId = setInterval (function(){
if (!squares[ghost.currentIndex + direction].classList.contains("wall")
&& !squares[ghost.currentIndex + direction].classList.contains("ghost")){

    // remove any ghost
    squares[ghost.currentIndex].classList.remove(ghost.className)
    squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
    
    // add directions to the current index
    ghost.currentIndex += direction
    // add ghost class
    
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("scared-ghost")

}else direction = directions[Math.floor(Math.random() * directions.length)]  


// if the ghost is currently scared 
if(ghost.isScared) {
    squares[ghost.currentIndex].classList.add("scared-ghost")
}

if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")){
    // remove classnames - ghost.className, "ghost", "scared-ghost"
    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
    score += 100
    // change ghosts currentIndex back to start index
    ghost.currentIndex += ghost.startIndex
//    re - add classnames of ghost.className and "ghost" to the ghosts new position
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
}
checkForGameOver()

}, ghost.speed) 

}


function toStart(){
    document.addEventListener("keyup", control)
    ghosts.forEach(ghost => moveGhost(ghost))
    let gameEnd = setInterval(checkForGameOver, 5)
    
}


// check for gameOver
function checkForGameOver(){
    // if the square pacman is in contains a ghost and square does not contains a scared ghost
    if(squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared") || score == 20){
        // for each ghost we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // remove eventlistener from our control function
        document.removeEventListener("keyup", control)

        resetEvent.style.display = "block"
        scoreDisplay.innerHTML = "GAME OVER"
    }
}


function checkForWin(){
    if(score === 20) {
        // stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // remove the removeEventListener for the control function
        document.removeEventListener("keyup", control)
        // layout.clearInterval(ghost.timerId) 
        scoreDisplay.innerHTML = "You have won"
        
} 
}
startEvent.addEventListener("click", toStart)
startEvent.addEventListener("click", function(){
    startEvent.style.display = "none"
})


function reStart(){
    toStart()
}

resetEvent.addEventListener("click", reStart)




