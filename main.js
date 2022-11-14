const boxes = Array.from(document.getElementsByClassName('box'));
// console.log(boxes);

// keep track what is in the boxes
const spaces = [];
const player1_text = "O";
const player2_text = "X";
let currentPlayer;

const restartButton = document.getElementById('restartButton');

const gameText = document.getElementById('gameText')

// logic to draw the lines for the board
const lines = () => {
  boxes.forEach((box, index) => {
      let grid = '';
      // top boxes
      if (index < 3) {
        grid += `border-bottom: 3px solid black;`
      }
      // left
      if(index % 3 === 0){
        grid += `border-right: 3px solid black;`
      }
      // right
      if(index % 3 ===2){
        grid += `border-left: 3px solid black;`
      }
      // bottom
      if (index > 5){
        grid += `border-top: 3px solid black;`
      }
      box.style = grid;
      box.addEventListener('click', boxClicked)
  });
};


// logic for X and O 
const boxClicked = (e) => {
  // console.log('box clicked');
  const id = e.target.id;
  // console.log(id);
  if (!spaces[id]) {
    // update spaces
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer;

      if(playerWin()){
        gameText.innerText = `${currentPlayer} has won!`;
        return;
      }      
      currentPlayer = currentPlayer === player1_text ? player2_text : player1_text;
  }  

};

const playerWin = () => {
  if(spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      console.log(`${currentPlayer} wins up top`); 
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      console.log(`${currentPlayer} wins on the left`);
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      console.log(`${currentPlayer} wins diagonally`);
      return true;
    }
  } else if(spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      console.log(`${currentPlayer} wins right side`); 
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      console.log(`${currentPlayer} wins on the bottom`);
      return true;
    }
}
    if(spaces[4] === currentPlayer) {
      if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
        console.log(`${currentPlayer} wins vertically in the middle`);
        return true;
      }
      if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
        console.log(`${currentPlayer} wins horizontally in the middle`);
        return true;
      }
    }
};




const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = '';
  });
  gameText.innerText = `Play`;
  currentPlayer = player1_text;
};


restartButton.addEventListener('click', restart);
 
restart();
lines();