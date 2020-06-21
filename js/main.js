"use strict";

{
  class Panel {
    constructor() {
      this.el = document.createElement("li");
      // this.el.textContent = "0";

      const board = document.getElementById("board");
      board.appendChild(this.el);
    }
  }

  class Board {
    constructor(){

    }
  }

  const nums = [0,1,2,3]

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
    new Panel()
  ];

  panels.forEach(panel => {
    //まだテスト中
    panel.el.textContent = Math.floor(Math.random() * nums.length);;
  });

}
