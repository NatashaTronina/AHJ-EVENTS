import goblinImage from "../../asset/goblin.png";

export default function createGoblin(board) {
  let element = null;
  let timeoutId = null; 

  function appear() {
    const randomCell = board.getRandomCell();
    if (!randomCell) {
      return;
    }

    if (element) { 
      element.remove();
      element = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    element = document.createElement("img");
    element.src = goblinImage;
    element.classList.add("goblin");
    randomCell.appendChild(element);

    timeoutId = setTimeout(() => {
      handleMiss(); 
    }, 1000); 
  }
  
  function removeGoblin() { 
    if (element) {
      element.remove();
      element = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function handleMiss() { 
    removeGoblin(); 
    board.game.score.incrementMisses(); 
    
    if (board && board.game && board.game.board && typeof board.game.board.scheduleNextAppearance === 'function') {
      board.game.board.scheduleNextAppearance();
    }
  }

  function hit() {
    removeGoblin(); 
    board.game.score.incrementScore(); 
    
    if (board && board.game && board.game.board && typeof board.game.board.scheduleNextAppearance === 'function') {
      board.game.board.scheduleNextAppearance();
    }
  } 
  
  return {
    element: element, 
    appear,
    removeGoblin, 
    hit
  };
}