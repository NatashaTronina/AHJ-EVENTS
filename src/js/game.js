import createBoard from "./Board.js"; 
import createScore from "./Score.js"; 

export default function createGame() {
  let board = null;
  let score = null;
  let isRunning = false;

  const game = {
    init,
    start,
    stop,
    gameOver,
    win, 
    get score() { return score; },
    get board() { return board; },

    get isRunning() { return isRunning; },
    set isRunning(value) { isRunning = value; }
  };

  function init() {
    score = createScore(() => game.gameOver(), () => game.win()); 
    board = createBoard(game);
  }

  function start() {
    if (isRunning) {
      return;
    }
    isRunning = true;
    score.reset();
    board.scheduleNextAppearance(); 
    document.getElementById("stop-button").disabled = false;
  }

  function stop() {
    if (!isRunning) {
      return;
    }
    isRunning = false;
    board.reset();
    document.getElementById("stop-button").disabled = true;
  }

  function gameOver() {
    game.stop();
    alert("Игра окончена! Вы пропустили 5 гоблинов.");
  }
  
  function win() { 
    game.stop();
    alert("ПОБЕДА! Вы набрали 10 очков!");
  }

  init();
  return game;
}