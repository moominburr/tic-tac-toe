"use Strict";

const Gameboard = (() => {
  let _gameArray = ["", "", "", "", "", "", "", "", ""];
  const getGamearray = function () {
    return _gameArray;
  };
  const resetGamearray = function () {
    _gameArray = ["", "", "", "", "", "", "", "", ""];
    return _gameArray;
  };
  const setGameArray = function (index, sign) {
    let newArray = _gameArray.splice(index, 1, sign);
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

const player = (() => {
  let _name = document.querySelector("#name").value || "player";
  const signBtns = document.querySelectorAll(".selector");
  let _sign = "X";
  const selectSign = (e) => {
    _sign = e.target.textContent;
    e.target.classList.add("active-selector");
    let children = e.target.parentNode.childNodes;
    for (i = 0; i < children.length; i++) {
      if (e.target === children[i]) {
      } else if (children[i].classList.contains("active-selector")) {
        children[i].classList.remove("active-selector");
      }
    }
  };
  signBtns.forEach((btn) => {
    btn.addEventListener("click", selectSign);
  });
  let player1 = Player(_name, _sign);
  const updateName = () => {
    _name = document.querySelector("#name").value || "player";
    player1 = Player(_name, _sign);
  };
  return { player1, updateName };
})();

const initializeGame = (() => {
  const newGameBtn = document.querySelector(".new-game-btn");
  const startPopUp = document.querySelector(".start-game-pop-up");
  const startBtn = document.querySelector(".start-btn");
  const squares = document.querySelectorAll(".square-text");

  let iteration = 1;
  let winningArray = [];
  let isWinner = false;
  let winner = null;
  let isDraw = false;

  startBtn.addEventListener("click", () => {
    player.updateName();
    startPopUp.classList.add("pop-up-not-active");
  });

  newGameBtn.addEventListener("click", () => {
    if (isWinner) return;
    startPopUp.classList.remove("pop-up-not-active");
    Gameboard.resetGamearray();
    checkWinningConditions.resetConditions();
    isWinner = false;
    isDraw = false;
    winner = null;
    squares.forEach((square) => {
      square.textContent = "";
    });
  });

  squares.forEach((square) =>
    square.addEventListener("click", (e) => {
      playRound(e, player.player1);
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
    const _checkDiagonals = () => {
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
    const _checkVerticals = () => {
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
    const _checkHorizontals = () => {
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
    const resetConditions = () => {
      d1 = false;
      d2 = false;
      v1 = false;
      v2 = false;
      v3 = false;
      h1 = false;
      h2 = false;
      h3 = false;
      winningArray.length = 0;
      array = Gameboard.getGamearray();
    };
    const overall = () => {
      let ch = _checkHorizontals();
      let cv = _checkVerticals();
      let cd = _checkDiagonals();
      if (cd || cv || ch) {
        return true;
      } else {
        return false;
      }
    };
    return { overall, resetConditions };
  })();

  const checkForDraw = () => {
    let xCount = 0;
    let oCount = 0;
    if (winningArray.length > 3) {
      let gArray = Gameboard.getGamearray();
      let winningSigns = [];
      winningArray.forEach((el) => {
        winningSigns.push(gArray[el]);
      });
      winningSigns.forEach((el) => {
        if (winningSigns[el] === "X") {
          xCount++;
        } else if (winningSigns[el] === "O") {
          oCount++;
        }
      });
    }
    if (xCount === oCount && xCount !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const endGame = () => {
    iteration = 1;
    const popUp = document.querySelector(".end-game-pop-up");
    const winningText = document.querySelector(".winning-text");
    winningArray.forEach((el) => {
      squares[el].classList.add("winner");
    });
    if (!winner && !isDraw) {
      winningText.textContent = "No winners here! Try again.";
    } else if (winner && !isDraw) {
      if (winner === player.player1.getSign()) {
        let playerName = player.player1.getName();
        winningText.textContent = `${playerName === 'player' ? 'Player' : playerName}, you are the winner!`;
      } else {
        winningText.textContent = `The winner is ${winner}.`;
      }
    } else if (isDraw) {
      winningText.textContent = "A draw. Try again.";
    }
    const resetGame = () => {
      popUp.classList.remove("pop-up-active");
      squares.forEach((square) => {
        if (square.classList.contains("winner")) {
          square.classList.remove("winner");
        }
        square.textContent = "";
      });
      Gameboard.resetGamearray();
      checkWinningConditions.resetConditions();
      isWinner = false;
      isDraw = false;
      winner = null;
    };
    squares.forEach((el) => {
      el.addEventListener("animationend", () => {
        popUp.classList.add("pop-up-active");
        const resetBtn = document.querySelector(".reset-btn");
        resetBtn.addEventListener("click", resetGame);
      });
    });
    if (isDraw) {
      popUp.classList.add("pop-up-active");
      const resetBtn = document.querySelector(".reset-btn");
      resetBtn.addEventListener("click", resetGame);
    }
  };

  const playRound = (e, player) => {
    if (iteration === 9) {
      let index = e.target.id;
      let array = Gameboard.getGamearray();
      let sign = player.getSign();
      if (array[index] !== "") {
        return;
      } else {
        Gameboard.setGameArray(index, sign);
        e.target.textContent = sign;
        console.log(Gameboard.getGamearray());
      }
      isWinner = checkWinningConditions.overall();
      if (!isWinner) isDraw = true;
      if (isDraw || isWinner) endGame();
    }
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
          console.log(Gameboard.getGamearray());
        }
        iteration++;
        isDraw = checkForDraw();
        if (isDraw) endGame();
        isWinner = checkWinningConditions.overall();
        if (isWinner) endGame();
      } else {
        let ct = compTurn();
        let compSign;
        if (player.getSign() === "X") compSign = "0";
        else compSign = "X";
        Gameboard.setGameArray(ct, compSign);
        squares[ct].textContent = compSign;
        iteration++;
        isDraw = checkForDraw();
        if (isDraw) endGame();
        isWinner = checkWinningConditions.overall();
        if (isWinner) endGame();
      }
    }
    return { isWinner };
  };
})();
