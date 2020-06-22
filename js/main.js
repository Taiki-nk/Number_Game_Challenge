"use strict";

{
  class Panel {
    constructor() {
      this.el = document.createElement("li");
      this.el.classList.add("pushed");

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
      if(currentNum === 4){
        clearTimeout(timeoutId);
        startBtn.classList.remove('pushed');
      }
    }
  }
  //ここまでPanelクラス

  class Board {
    constructor() {
      this.panels = [new Panel(), new Panel(), new Panel(), new Panel()];

    }

    showNumber(){
      this.nums = [0, 1, 2, 3];

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

  function countUp(){
    const timer = document.getElementById('timer');
    timeoutId = setTimeout(() => {
      timer.textContent = ((Date.now() - startTime)/1000).toFixed(2);
      countUp();
    },10);

  }

  let currentNum;
  let startTime;
  let timeoutId;

  const board = new Board()

  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", () => {
    startBtn.classList.add('pushed');
    currentNum = 0;
    startTime = Date.now()
    board.showNumber();
    countUp();
  });


}
