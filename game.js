const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
      console.log("  Type 'r' for Rock");
      console.log("  Type 'p' for Paper");
      console.log("  Type 's' for Scissors");
      console.log("  Type 'q' to quit");
      console.log("  Type 'h' for a list of valid commands\n");
}

function getWinner(move1, move2) {
  if (move1 === move2) { // tie
    return 0;
  }
  else if (VALID_MOVES[move1].winsAgainst === move2) { // win
    return 1;
  } else { // loss
    return -1;
  }
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length); 
  return validMoveKeys[randomIndex];
}

function processMove(move1, move2) {

  console.log(`You pick ${move1}, computer picks ${move2}.`);

  if (getWinner(move1, move2) === 0) { // tie
   console.log("You tie.\n");
   ties++;
 }
 else if (getWinner(move1, move2) === 1) { // win
   console.log("You win!\n");
   wins++;
 } else { // loss
   console.log("You lose...\n");
   losses++;
 } 
  
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (move1) => {
    move1 = move1.toLowerCase();

    if (move1 === 'h') {
     console.log("\nHelp:\n");
     printHelp();
     
    } else if (move1 === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[move1]){

      const move2 = getCPUMove();
      processMove(move1, move2);

    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();
  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};