"use strict";

{
  class Panel {
    constructor() {
      this.panel = document.createElement("li");
      this.panel.textContent = "0";

      const board = document.getElementById("board");
      board.appendChild(this.panel);
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
    new Panel()
  ];
}
