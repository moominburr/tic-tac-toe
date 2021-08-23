"use Strict";

const Gameboard = (() => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];
  const getGamearray = function () {
    return gameArray;
  };
  const resetGamearray = function () {
    gameArray = ["", "", "", "", "", "", "", "", ""];
    return gameArray;
  };
  const setGameArray = function (index, sign) {
    let newArray = gameArray.splice(index, 1, sign);
  };
  return { setGameArray, getGamearray, resetGamearray };
})();

const Player = (name, sign) => {
  this.sign = sign;
  this.name = name;
  this.getName = () => {
    return this.name;
  };
  this.getSign = () => {
    return this.sign;
  };
  return { getName, getSign };
};
// Create a gameboard with event listeners that update the array with the players sign.

const playerX = Player("Kate", "X");

const squares = document.querySelectorAll(".gamesquare");
const computerTurn = function () {
  const turn = function () {
    let num = Math.floor(Math.random() * 9);
    console.log(num);
  };
  return turn;
};

const initializeGame = (e, player) => {
  let index = e.target.id;
  let array = Gameboard.getGamearray();
  let sign = player.getSign();
  let playingRound = false;
  if (array[index] !== "") {
    alert("Oops");
    return;
  } else {
    Gameboard.setGameArray(index, sign);
    e.target.textContent = sign;
    console.log(Gameboard.getGamearray());
    playingRound = true;
  }
  return {playingRound}
};

squares.forEach((square) =>
  square.addEventListener("click", (e) => {
      if(initializeGame.playingRound) {
        
      } else {
        initializeGame(e, playerX);
      }
    
  })
);
