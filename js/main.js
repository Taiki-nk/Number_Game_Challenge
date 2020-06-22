"use strict";

{
  class Panel {
    constructor(game) {
      this.game = game
      this.el = document.createElement("li");
      this.el.classList.add("pushed");

      const board = document.getElementById("board");
      board.appendChild(this.el);

      this.getEl().addEventListener("click", () => {
        this.startGame();
      });
    }

    getEl(){
      return this.el;
    }

    getCurrentNum(){
      return this.game.currentNum;
    }

    addCurrentNum(){
      this.game.currentNum ++;
    }

    startGame() {
      if (this.getCurrentNum() === parseInt(this.getEl().textContent)) {
        this.getEl().classList.add("pushed");
        this.addCurrentNum();
      }
      if (this.getCurrentNum() === this.game.getLevel() ** 2) {
        clearTimeout(this.game.timeoutId);
        this.game.startBtn.classList.remove("pushed");
      }
    }
  }
  //ここまでPanelクラス

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for(let i = 0; i < this.game.getLevel() ** 2; i++){
        this.panels.push(new Panel(this.game));
      }
    }

    

    showNumber() {
      this.nums = [];
      for(let i = 0; i < this.game.getLevel() ** 2; i ++){
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
      const board = new Board(this);

      this.startBtn = document.getElementById("start-btn");
      this.startBtn.addEventListener("click", () => {
        this.startBtn.classList.add("pushed");
        this.currentNum = 0;
        this.startTime = Date.now();
        board.showNumber();
        this.countUp();
      });
    }

    getLevel(){
      return this.level;
    }

    countUp() {
      const timer = document.getElementById("timer");
      this.timeoutId = setTimeout(() => {
        timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
        this.countUp();
      }, 10);
    }
  }
  //ここまでGameクラス

  new Game(3);
}
