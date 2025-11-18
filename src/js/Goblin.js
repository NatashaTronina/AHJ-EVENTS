import goblinImage from "../../asset/goblin.png";

export default function createGoblin(board) { 
  let element = null;
  let timeoutId = null;

  function appear() {
    const randomCell = board.getRandomCell();
    if (!randomCell) return;

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
        disappear(true);
        board.scheduleNextAppearance(); 
    }, 1000); 
  }

  function disappear(isMiss = false) {
    if (element) {
      element.remove();
      element = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (isMiss) {
      board.game.score.incrementMisses(); 
    }
  }

  function hit() {
    disappear(false); 
    board.game.score.incrementScore(); 
    board.scheduleNextAppearance(); 
  }

  return {
    element, 
    appear,
    disappear,
    hit
  };
}