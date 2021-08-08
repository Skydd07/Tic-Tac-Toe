const X_CLASS = "x";
const O_CLASS = "o";
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
let xturn=true;
const winning_combinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-msg-text]');
const winningMessageElement = document.getElementById("winningMsg");

const restartButton = document.getElementById("restartButton");


startGame();
restartButton.addEventListener("click", startGame);

function startGame(){
    xturn=true;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}
function handleClick(e){
      const cell = e.target;
      const currentClass = xturn ? X_CLASS : O_CLASS;
      placeMark(cell, currentClass);
      if(checkWin(currentClass)){
        endGame(false);
      }
      else if(isDraw()){
          endGame(true);
      }
      else{
      swapTurns();
      setBoardHoverClass();
      }
}

function placeMark(cell, currentClass){
      cell.classList.add(currentClass);
}

function swapTurns() {
    xturn = !xturn;
}

function setBoardHoverClass(){
   board.classList.remove(X_CLASS);
   board.classList.remove(O_CLASS);
   if(xturn){
       board.classList.add(X_CLASS)
   }
   else{
       board.classList.add(O_CLASS);
   }
}

function checkWin(currentClass){
    return winning_combinations.some( combination => {
        return combination.every( index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw!"
    }
    else{
        winningMessageTextElement.innerText = `${xturn ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}