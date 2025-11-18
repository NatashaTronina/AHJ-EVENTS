import createGoblin from "./Goblin.js";

export default function createBoard(gameInstance, size = 4) {
  let cells = [];
  let goblin = null;
  let boardElement = null;

  function createBoardElements() { 
    boardElement = document.createElement("div");
    boardElement.classList.add("game-board");
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", () => handleCellClick(cell));
        boardElement.appendChild(cell);
        cells.push(cell);
      }
    }
    const gameField = document.querySelector("#game-field");
    if (gameField) {
      gameField.appendChild(boardElement);
    }
  }

  function getRandomCell() {
    return cells[Math.floor(Math.random() * cells.length)];
  }

  function handleCellClick(cell) {
    if (goblin && goblin.element && cell.contains(goblin.element)) {
      goblin.hit();
    }
  }

  function scheduleNextAppearance() {
    if (!gameInstance.isRunning) return; 
    if (goblin) {
        goblin.disappear(false); 
    }
    goblin = createGoblin({ getRandomCell, game: gameInstance }); 
    goblin.appear();
  }

  function reset() {
    if (goblin) goblin.disappear(false); 
    goblin = null; 
  }

  createBoardElements(); 
  return {
    getRandomCell,
    scheduleNextAppearance,
    reset,
    game: gameInstance 
  };
}