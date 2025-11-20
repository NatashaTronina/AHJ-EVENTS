export default function createScore(onGameOver, onWin) { 
  let score = 0;
  let misses = 0;
  const maxMisses = 5;
  const maxScore = 10; 
  let scoreElement = null;

  function init() {
    scoreElement = document.createElement("div");
    scoreElement.id = "score";
    scoreElement.innerHTML = `Счёт: ${score} | Пропуски: ${misses}`;
    document.body.append(scoreElement);
  }

  function incrementScore() {
    score += 1;
    updateDisplay();
    if (score >= maxScore) { 
        if (onWin) {
            onWin();
        }
    }
  }

  function incrementMisses() {
    misses += 1;
    updateDisplay();
    if (misses >= maxMisses) {
      onGameOver();
    }
  }

  function updateDisplay() {
    if (scoreElement) {
      scoreElement.innerHTML = `Счёт: ${score} | Пропуски: ${misses}`;
    }
  }

  function reset() {
    score = 0;
    misses = 0;
    updateDisplay();
  }

  init(); 
  return {
    incrementScore,
    incrementMisses,
    reset
  };
}