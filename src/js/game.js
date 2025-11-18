import createBoard from "./Board.js";
import createScore from "./Score.js";
import createCursor from "./Cursor.js";

export default function createGame() {
  let board = null;
  let score = null;
  let cursor = null;
  let isRunning = false;

  const game = { 
    init,
    start,
    stop,
    gameOver,
    get score() { return score; }, 
    get board() { return board; },
    get cursor() { return cursor; }, 
    get isRunning() { return isRunning; },
    set isRunning(value) { isRunning = value; }
  };

  function init() {
    cursor = createCursor();
    score = createScore(() => game.gameOver());
    board = createBoard(game);
    
    // >>> ДОБАВЬТЕ ЭТО ДЛЯ ОТЛАДКИ <<<
    console.log("Board object returned:", board);
    console.log("Does scheduleNextAppearance exist?", typeof board.scheduleNextAppearance === 'function');
    // >>> КОНЕЦ ОТЛАДКИ <<<
}

  function start() {
    if (game.isRunning) return;
    game.isRunning = true;
    score.reset();
    board.scheduleNextAppearance();
    document.getElementById("stop-button").disabled = false; 
  }

  function stop() {
    if (!game.isRunning) return;
    game.isRunning = false;
    board.reset();
    document.getElementById("stop-button").disabled = true; 
  }

  function gameOver() {
    game.stop(); 
    alert("Игра окончена! Вы пропустили 5 гоблинов.");
    cursor.reset();
  }

  init();
  return game; 
}