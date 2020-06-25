"use strict";

{
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement("li");
      this.el.classList.add("pushed");
      this.time = timer.textContent;

      const board = document.getElementById("board");
      board.appendChild(this.el);

      this.getEl().addEventListener("click", () => {
        this.startGame();
      });
    }

    

    getEl() {
      return this.el;
    }

    getCurrentNum() {
      return this.game.currentNum;
    }

    addCurrentNum() {
      this.game.currentNum++;
    }

    startGame() {
      if (this.getCurrentNum() === parseInt(this.getEl().textContent)) {
        this.getEl().classList.add("pushed");
        this.addCurrentNum();
      }
      if (this.getCurrentNum() === this.game.getLevel() ** 2) {
        clearTimeout(this.game.timeoutId);
        this.game.startBtn.classList.remove("pushed");
        this.game.showScore();
        this.time = timer.textContent;
        console.log(this);
        tweet.classList.add("active");
      }
    }
  }
  //ここまでPanelクラス

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game));
      }
    }

    boardStyle() {
      const container = document.querySelector(".container");
      container.style.width = 60 * this.game.level + 10 + "px";
    }

    showNumber() {
      this.nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.nums.push(i);
      }
      this.panels.forEach((panel) => {
        panel.el.textContent = this.nums.splice(
          Math.floor(Math.random() * this.nums.length),
          1
        )[0];
        panel.el.classList.remove("pushed");
      });
    }
  }
  //ここまでBoardクラス

  class Game {
    constructor(level) {
      this.level = level;
      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      this.timer = document.getElementById("timer");
      const board = new Board(this);

      board.boardStyle();
      this.changeTitle();

      this.startBtn = document.getElementById("start-btn");
      this.startBtn.addEventListener("click", () => {
        this.startBtn.classList.add("pushed");
        tweet.classList.remove("active");
        this.currentNum = 0;
        this.startTime = Date.now();
        board.showNumber();
        this.countUp();
      });
    }

    getLevel() {
      return this.level;
    }

    changeTitle() {
      const titleLevel = document.querySelector(".level");
      titleLevel.textContent = gameLevel;
    }

    showScore() {
      const coments = [
        "まだ行けます！",
        "これは早い！ …方だと思います",
        "そろそろレベルを上げてみては？",
        "おそらく最速です！ おそらくですよ？",
        "人の領域を超えました",
        "この反応速度、神かもしれない…",
      ];
      const scoreComent = document.getElementById("score");
      if (gameLevel < 4) {
        console.log("test");
        if (this.timer.textContent < 10) {
          scoreComent.textContent = coments[2];
        } else {
          scoreComent.textContent = coments[0];
        }
      } else {
        if (this.timer.textContent < 8) {
          scoreComent.textContent = coments[5];
        } else if (this.timer.textContent < 10) {
          scoreComent.textContent = coments[4];
        } else if (this.timer.textContent < 12) {
          scoreComent.textContent = coments[3];
        } else if (this.timer.textContent < 15) {
          scoreComent.textContent = coments[1];
        } else {
          scoreComent.textContent = coments[0];
        }
      }
    }

    countUp() {
      this.timeoutId = setTimeout(() => {
        this.timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(
          2
        );
        this.countUp();
      }, 10);
    }
  }
  //ここまでGameクラス

  let gameLevel;
  // let time = game.timer.textContent;


  function startGame() {
    gameLevel = prompt("ゲームレベルを数字の2〜4の中で入力してください");
    if (
      !parseInt(gameLevel) ||
      gameLevel === "" ||
      gameLevel === null ||
      parseInt(gameLevel) < 2 ||
      parseInt(gameLevel) > 4
    ) {
      console.log(gameLevel);
      alert("もう一度入力してください");
      startGame();
    } else {
      if (parseInt(gameLevel) !== NaN) {
        new Game(gameLevel);
      }
    }
  }


  function tweetHref() {
    tweet.href = `https://twitter.com/intent/tweet?text=ゲームレベル${gameLevel}でスコアは${time}秒でした`;
  };

  startGame();

  this.tweet = document.getElementById("tweet");
  tweet.addEventListener("click", () => {
    tweetHref();
  });
}
