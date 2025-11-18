import characterImageUrl from "../../asset/goblin.png";
import "../css/style.css";

const BOARD_SIZE = 4;
const CELL_SIZE_PX = 100;
const MOVE_INTERVAL_MS = 1000;

let characterElement = null;
let currentRow = -1;
let currentCol = -1;
let boardElement = null;
let intervalId = null;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGameBoard() {
  boardElement = document.createElement("div");
  boardElement.classList.add("game-board");

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cell");
      cell.dataset.row = row.toString();
      cell.dataset.col = col.toString();
      boardElement.appendChild(cell);
    }
  }

  const gameFieldContainer = document.querySelector("#game-field");

  if (gameFieldContainer) {
    gameFieldContainer.appendChild(boardElement);
  }
}

function createCharacter() {
  characterElement = document.createElement("img");
  characterElement.src = characterImageUrl;
  characterElement.classList.add("character-img");

  const imgWidth = 80;
  const imgHeight = 80;
  const offsetX = (CELL_SIZE_PX - imgWidth) / 2;
  const offsetY = (CELL_SIZE_PX - imgHeight) / 2;

  characterElement.style.left = `${currentCol * CELL_SIZE_PX + offsetX}px`;
  characterElement.style.top = `${currentRow * CELL_SIZE_PX + offsetY}px`;

  if (boardElement) {
    boardElement.appendChild(characterElement);
  }
}

function moveCharacter() {
  if (!characterElement || !boardElement) return;

  let nextRow, nextCol;
  do {
    nextRow = getRandomInt(0, BOARD_SIZE - 1);
    nextCol = getRandomInt(0, BOARD_SIZE - 1);
  } while (nextRow === currentRow && nextCol === currentCol);

  currentRow = nextRow;
  currentCol = nextCol;

  const imgWidth = 80;
  const imgHeight = 80;
  const offsetX = (CELL_SIZE_PX - imgWidth) / 2;
  const offsetY = (CELL_SIZE_PX - imgHeight) / 2;

  characterElement.style.left = `${currentCol * CELL_SIZE_PX + offsetX}px`;
  characterElement.style.top = `${currentRow * CELL_SIZE_PX + offsetY}px`;
}

export function initializeGame() {
  if (intervalId) {
    console.warn("Game is already running. Stop it first.");
    return;
  }

  createGameBoard();
  if (boardElement) {
    currentRow = getRandomInt(0, BOARD_SIZE - 1);
    currentCol = getRandomInt(0, BOARD_SIZE - 1);
    createCharacter();
    intervalId = setInterval(moveCharacter, MOVE_INTERVAL_MS);
  }
}

export function stopGame() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
