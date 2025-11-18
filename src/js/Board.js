import createGoblin from "./Goblin.js";

export default function createBoard(gameInstance, size = 4) {
  let cells = [];
  let goblin = null; 
  let boardElement = null;
  let goblinTimeoutId = null; 

  const APPEARANCE_DELAY = 1000; 


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
    const goblinElementInCell = cell.querySelector(".goblin"); 
    
    if (goblinElementInCell) {
        if (goblin && typeof goblin.hit === 'function') {
            goblin.hit();
        }
    }
  }
  
  function scheduleNextAppearance() {
    if (!gameInstance.isRunning) return;
    
    if (!goblin) {
        goblin = createGoblin({ getRandomCell, game: gameInstance });
    }
    
    if (goblinTimeoutId) {
        clearTimeout(goblinTimeoutId);
    }
    
    goblinTimeoutId = setTimeout(() => {
      if (goblin && typeof goblin.appear === 'function') {
          goblin.appear();
      }
    }, APPEARANCE_DELAY); 
  }
  
  function reset() {
    if (goblin) {
        goblin.removeGoblin(); 
        goblin = null; 
    }
    if (goblinTimeoutId) {
        clearTimeout(goblinTimeoutId);
        goblinTimeoutId = null;
    }
  }

  createBoardElements(); 
  return {
    getRandomCell,
    scheduleNextAppearance,
    reset,
    game: gameInstance 
  };
}