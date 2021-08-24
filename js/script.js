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

const initializeGame = (() => {
  const squares = document.querySelectorAll(".square-text");
  let winningArray = [];
  let winner = null;
  let isDraw = false;
  squares.forEach((square) =>
    square.addEventListener("click", (e) => {
      playRound(e, playerX);
    })
  );
  const compTurn = () => {
    let num = Math.floor(Math.random() * 9);
    let array = Gameboard.getGamearray();
    while (array[num] !== "") {
      num = Math.floor(Math.random() * 9);
    }
    return num;
  };
  const checkWinningConditions = (() => {
    let drawCheck = [];
    let array = Gameboard.getGamearray();
    let i = 0;
    array.forEach((el) => {
      if (el === "") i++;
    });
    if (i === 8) return;
    const checkDiagonals = () => {
      let d1 = false;
      let d2 = false;
      if (array[0] === array[4] && array[8] === array[0]) {
        array[0] === ""
          ? (d1 = false)
          : (d1 = true && winningArray.push("0", "4", "8") && drawCheck.push(array[0]));
      }
      if (array[2] === array[4] && array[6] === array[2]) {
        array[2] === ""
          ? (d2 = false)
          : (d2 = true && winningArray.push("2", "4", "6") && drawCheck.push(array[2]));
      }
      if (d1 || d2) {
        if (d1) winner = array[0];
        if (d2) winner = array[2];
        return true;
      } else {
        return false;
      }
    };
    const checkVerticals = () => {
      let v1 = false;
      let v2 = false;
      let v3 = false;
      if (array[0] === array[3] && array[6] === array[0]) {
        array[0] === ""
          ? (v1 = false)
          : (v1 = true && winningArray.push("0", "3", "6") && drawCheck.push(array[0]));
      } else if (array[1] === array[4] && array[7] === array[1]) {
        array[1] === ""
          ? (v2 = false)
          : (v2 = true && winningArray.push("1", "4", "7") && drawCheck.push(array[1]));
      } else if (array[2] === array[5] && array[8] === array[2]) {
        array[2] === ""
          ? (v3 = false)
          : (v3 = true && winningArray.push("2", "5", "8") && drawCheck.push(array[2]));
      }
      if (v1 || v2 || v3) {
        if (v1) winner = array[0];
        if (v2) winner = array[1];
        if (v3) winner = array[2];
        return true;
      } else {
        return false;
      }
    };
    const checkHorizontals = () => {
      let h1 = false;
      let h2 = false;
      let h3 = false;
      if (array[0] === array[1] && array[2] === array[0]) {
        array[0] === ""
          ? (h1 = false)
          : (h1 = true && winningArray.push("0", "1", "2") && drawCheck.push(array[0]));
      }
      if (array[3] === array[4] && array[5] === array[3]) {
        array[3] === ""
          ? (h2 = false)
          : (h2 = true && winningArray.push("3", "4", "5") && drawCheck.push(array[3]));
      }
      if (array[6] === array[7] && array[8] === array[6]) {
        array[6] === ""
          ? (h3 = false)
          : (h3 = true && winningArray.push("6", "7", "8") && drawCheck.push(array[6]));
      }
      if (h1 || h2 || h3) {
        if (h1) winner = array[0];
        if (h2) winner = array[3];
        if (h3) winner = array[6];
        return true;
      } else {
        return false;
      }
    };

    const overall = () => {
      let ch = checkHorizontals();
      let cv = checkVerticals();
      let cd = checkDiagonals();
      if (cd || cv || ch) {
        console.log("TRUE");
        return true;
      }
    };
    return { overall };
  })();

  const endGame = () => {
    const popUp = document.querySelector(".end-game-pop-up");
    winningArray.forEach((el) => {
      squares[el].classList.add("winner");
    });
    const resetGame = () => {
      Gameboard.resetGamearray();
      popUp.classList.remove("pop-up-active");
        for(i=0; i < 8; i++){
            squares[i].textContent = ''
            if(squares[i].classList.contains('winner')){
                squares[i].classList.remove('winner');
            }
        }
    }
    squares.forEach((el) => {
      el.addEventListener("animationend", () => {
        popUp.classList.add("pop-up-active");
        const resetBtn = document.querySelector(".reset-btn");
        resetBtn.addEventListener("click", resetGame);
      });
    });
  };

  const playRound = (e, player) => {
    let isWinner = false;
    let iteration = 1;
    while (!isWinner) {
      if (iteration % 2 !== 0) {
        let index = e.target.id;
        let array = Gameboard.getGamearray();
        let sign = player.getSign();
        if (array[index] !== "") {
          return;
        } else {
          Gameboard.setGameArray(index, sign);
          e.target.textContent = sign;
        }
        iteration++;
        let midRoundWinner = checkWinningConditions.overall();
        console.log(midRoundWinner);
        if (midRoundWinner) endGame();
      } else {
        let ct = compTurn();
        Gameboard.setGameArray(ct, "O");
        squares[ct].textContent = "O";
        iteration++;
        isWinner = checkWinningConditions.overall();
        if (isWinner) endGame();
      }
    }
  };
})();
