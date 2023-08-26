let playerText = document.getElementById('playerText')//set variable //
let restartBtn = document.getElementById('restartBtn')//set btn variable//
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"//set variable for the o letter//
const X_TEXT = "X"////set variable for the x letter//
let currentPlayer = X_TEXT//sets current player var to x//
let spaces = Array(9).fill(null)

const startGame = ()=> {//initialize game//
    boxes.forEach(box =>box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText= currentPlayer

        if(playerHasWon()!==false){//player won function what should show up on display//
            playerText = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            console.log(winning_blocks)

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)//indicator for if you won//
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT//booolean to confirm if x or o text appears//
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return[a,b,c]
        }
        
    }
    return false
}
restartBtn.addEventListener('click',restart)

function restart(){
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText= ''
        box.style.backgroundColor=''
    })
    playerText ='Tic Tac Toe'

    currentPlayer =X_TEXT
}

startGame()