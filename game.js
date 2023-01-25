var gameBoard = ["", "", "", "", "", "", "", "", ""];
var player = "X";
var computer = "O";
var gameOver = false;
var moves = 0;

// Function to handle clicks on the game board
function handleClick(event) {
  // Check if the game is over or the square has already been played
  if (gameOver || event.target.textContent != "") {
    return;
  }

  // Update the game board with the player's move
  event.target.textContent = player;
  gameBoard[event.target.id] = player;

  // Check for a win or a draw
  checkForWin();

  // Switch to the computer's turn
  if (!gameOver) {
    computerTurn();
  }
}

// Function to handle the computer's turn
function computerTurn() {
  var emptySquares = [];
  for (var i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] == "") {
      emptySquares.push(i);
    }
  }

  // Choose a random empty square for the computer's move
  var randomIndex = Math.floor(Math.random() * emptySquares.length);
  var square = document.getElementById(emptySquares[randomIndex]);
  square.textContent = computer;
  gameBoard[emptySquares[randomIndex]] = computer;

  // Check for a win or a draw
  checkForWin();
}

// Function to check for a win or a draw
function checkForWin() {
  var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

for (var i = 0; i < winningCombinations.length; i++) {
  if (gameBoard[winningCombinations[i][0]] == player && gameBoard[winningCombinations[i][1]] == player && gameBoard[winningCombinations[i][2]] == player) {
    document.getElementById("result").innerHTML = "Player wins!";
    gameOver = true;
    return;
  } else if (gameBoard[winningCombinations[i][0]] == computer && gameBoard[winningCombinations[i][1]] == computer && gameBoard[winningCombinations[i][2]] == computer) {
    document.getElementById("result").innerHTML = "Computer wins!";
    gameOver = true;
    return;
  }
}

moves++;
if(moves == 9) {
  document.getElementById("result").innerHTML = "It's a draw!";
  gameOver = true;
}
}

// Add event listeners to the squares on the game board
var squares = document.getElementsByTagName("td");
for (var i = 0; i < squares.length; i++) {
squares[i].addEventListener("click", handleClick);
}
