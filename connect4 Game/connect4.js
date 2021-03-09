/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
 const form = document.getElementById('newGa');
 const input = document.getElementById('firstName');
 const friendPlayerList = document.getElementById('PlayerList');
 
 friendPlayerList.addEventListener('click', function(e) {
   if (e.target.tagName === 'LI') {
     e.target.classList.add('play-friend');
   }
   else if (e.target.tagName === 'BUTTON') {
     e.target.parentElement.remove();
     }
 });
 
 form.addEventListener('submit', function(e) {
   e.preventDefault();
   const friend = document.createElement('li');
   const removeBtn = document.createElement('button');
   removeBtn.innerText = 'Remove Player'; 
   friend.innerText = input.value;
   friend.appendChild(removeBtn);
   friendPlayerList.appendChild(friend);
   input.value = '';
 });
 
let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *board = array of rows, each row is array of cells (board[y][x])
 */
function makeBoard() { //----------
  for (let y = 0; y < HEIGHT; y++) {
    board.push([])
    for (let x = 0; x < WIDTH; x++) {
    board[y].push(null);
  }}
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  //*TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code 
  //setting column top horizontal line and do clicking for adding circles, 
  //after this starting to work the handleClick function.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //Here is looping this value, where do creating data cells.
  //Using append for adding the new elements to the board (htmlBoard).
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // Here is looping this value, where do creating a new table row.
  //And main part when after setting numbers of columns with row
  // then adding more row to the board. 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT-1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const makeDiv = document.createElement('div');
  const tbCell = document.getElementById(`${y}-${x}`);
  makeDiv.classList.add('piece');
  makeDiv.classList.add(`p${currPlayer}`);
  tbCell.append(makeDiv);
}

/** endGame: announce game end */
function endGame(msg) {
  //* TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  //*get x from ID of clicked cell
  let x = +evt.target.id;
  //*get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // *place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
     return endGame(`Winner has been found! Player ${currPlayer} won!`);  
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))){
    return endGame('Board fills and it is tie!');
  }
  //*switch players, when one of the players made a move
  //*TODO: switch currPlayer 1 <-> 2 
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {  
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  // TODO: read and understand this code. Add comments to help you.
  //Making a sequential move of each player with circles for all directions 
  //"four-in-a-row" and fills in the board
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard(); 

// const board = [
//   [ null, null, null, null, null, null, null ],
//   [ null, null, null, null, null, null, null ],
//   [ null, null, null, null, null, null, null ],
//   [ null, null, null, null, null, null, null ],
//   [ null, null, null, null, null, null, null ],
//   [ null, null, null, null, null, null, null ],
// ];