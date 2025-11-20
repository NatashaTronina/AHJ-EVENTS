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

    const modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <span id="modal-close" class="close">&times;</span>
        <p id="modal-message"></p>
      </div>
    `;
    document.body.append(modal);

    // Обработчик для закрытия модального окна
    const modalClose = document.getElementById("modal-close");
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  }

  function start() {
    if (isRunning) {
      return;
    }
    isRunning = true;
    score.reset();
    board.scheduleNextAppearance(); 
    document.getElementById("stop-button").disabled = false;
    document.getElementById("start-button").disabled = true; 
  }

  function stop() {
    if (!isRunning) {
      return;
    }
    isRunning = false;
    board.reset();
    document.getElementById("stop-button").disabled = true;
    document.getElementById("start-button").disabled = false; 
  }

  function gameOver() {
    game.stop();
    showModal("Игра окончена! Вы пропустили 5 гоблинов.");
  }
  
  function win() { 
    game.stop();
    showModal("ПОБЕДА! Вы набрали 10 очков!");
  }

  function showModal(message) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    if (modal && modalMessage) {
      modalMessage.textContent = message;
      modal.style.display = "block";
    } else {
      console.error("Модальное окно не найдено. Проверьте HTML.");
    }
  }

  init();
  return game;
}