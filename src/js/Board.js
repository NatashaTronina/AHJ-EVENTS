import createGoblin from "./Goblin.js";

export default function createBoard(gameInstance, size = 4) {
  let cells = [];
  let goblin = null; 
  let boardElement = null;
  let goblinTimeoutId = null; 
  let lastCell = null;

  const APPEARANCE_DELAY = 1; 

  function createBoardElements() {
    boardElement = document.createElement("div");
    boardElement.classList.add("game-board");
    
    let htmlString = '';
    for (let i = 0; i < size * size; i++) {
      htmlString += '<div class="board-cell"></div>';
    }
    boardElement.innerHTML = htmlString; 
    
    const cellElements = boardElement.querySelectorAll('.board-cell');
    cellElements.forEach(cell => {
      cell.addEventListener("click", () => handleCellClick(cell));
      cells.push(cell);
    });
    
    const gameField = document.querySelector("#game-field");
    if (gameField) {
      gameField.append(boardElement);
    }
  }
  
  function getRandomCell() {
    let randomCell;
    do {
      randomCell = cells[Math.floor(Math.random() * cells.length)];
    } while (randomCell === lastCell); // Исключаем предыдущую ячейку
    lastCell = randomCell;
    return randomCell;
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
    lastCell = null;
  }

  createBoardElements(); 
  return {
    getRandomCell,
    scheduleNextAppearance,
    reset,
    game: gameInstance 
  };
}