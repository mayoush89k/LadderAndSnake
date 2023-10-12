// DOM Catcher players
const redPlayer = document.querySelector(".activeRed");
const yellowPlayer = document.querySelector(".activeYellow");
const greenPlayer = document.querySelector(".activeGreen");
const bluePlayer = document.querySelector(".activeBlue");

//catch DOM Buttons and Dice
const newGame = document.querySelector("#new-game");
const roll = document.querySelector("#roll-dice");
const diceImage1 = document.querySelector("#dice1");
const currentPlayerName = document.querySelector("#current-player");

// body catcher
const body = document.getElementsByTagName("body")[0];

// current player
const players = [
  { player: redPlayer, Position: 0, color: "red" },
  { player: bluePlayer, Position: 0, color: "blue" },
  { player: yellowPlayer, Position: 0, color: "yellow" },
  { player: greenPlayer, Position: 0, color: "green" },
];
let currentPlayer = 0;
let currentPosition;

// dice
const dice = [1, 2, 3, 4, 5, 6];
let ifSix = false;

// generate dice number
function randomDice() {
  const rollDice = Number((Math.random() * (dice.length - 1)).toFixed()) + 1;
  diceImage1.setAttribute("src", `assets/Images/dice-${rollDice}.png`);
  ifSix = rollDice == 6;
  return rollDice;
}

// roll dice listener
roll.addEventListener("click", diceRoll);
function diceRoll() {
  players[currentPlayer].Position = Number(
    players[currentPlayer].Position + randomDice()
  );
  players[currentPlayer].player.classList.add("move");

  if (players[currentPlayer].Position <= 100) {
    currentPosition = document.getElementById(
      `cell${players[currentPlayer].Position}`
    );
    if (currentPosition.classList[1] == "ladder") {
      jump();
    }
    if (currentPosition.classList[1] == "snake") {
      jump();
    } else {
      document
        .getElementById(`cell${players[currentPlayer].Position}`)
        .appendChild(players[currentPlayer].player);
      if (!ifSix) changePlayers();
    }
  } else {
    alert(
      "Game Over!" +
        players[currentPlayer].player.className.substring(13) +
        " Won"
    );
  }
}

function jump() {
  players[currentPlayer].Position = Number(currentPosition.classList[2]);
  players[currentPlayer].player.style.transition = "5sec";
  document
    .getElementById(`cell${players[currentPlayer].Position}`)
    .appendChild(players[currentPlayer].player);
  changePlayers();
}

function changePlayers() {
  if (currentPlayer == players.length - 1) {
    currentPlayer = 0;
  } else currentPlayer++;
  currentPlayerName.innerText =
    players[currentPlayer].player.className.substring(13);

  body.style.backgroundColor = players[currentPlayer].color;
}

// new game listener
newGame.addEventListener("click", newGameFunc);

function newGameFunc() {
  document.getElementById(`cell0`).appendChild(players[0].player);
  document.getElementById(`cell0`).appendChild(players[1].player);
  document.getElementById(`cell0`).appendChild(players[2].player);
  document.getElementById(`cell0`).appendChild(players[3].player);
  players[0].Position = 0;
  players[1].Position = 0;
  players[2].Position = 0;
  players[3].Position = 0;

  currentPlayer = 0;
  currentPosition = 0;
}

// keyboard Listener
document.addEventListener("keydown", keyDownFunction);
function keyDownFunction(e) {
  switch (e.key) {
    case "N":
    case "n":
      newGameFunc();
      break;
    case "R":
    case "r":
      diceRoll();
      break;
    default:
      break;
  }
}
