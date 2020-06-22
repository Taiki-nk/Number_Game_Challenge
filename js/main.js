"use strict";

{
  class Panel {
    constructor() {
      this.el = document.createElement("li");
      this.el.classList.add("pushed");
      // this.el.textContent = "0";

      const board = document.getElementById("board");
      board.appendChild(this.el);

      this.el.addEventListener("click", () => {
        this.startGame();
      });
    }
    startGame() {
      if (currentNum === parseInt(this.el.textContent)) {
        this.el.classList.add("pushed");
        currentNum++;
      }
    }
  }
  //ここまでPanelクラス

  class Board {
    constructor() {
      this.nums = [0, 1, 2, 3];
      this.panels = [new Panel(), new Panel(), new Panel(), new Panel()];

    }

    showNumber(){
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

  

  let currentNum = 0;

  const board = new Board()

  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", () => {
    board.showNumber();
  });
}
