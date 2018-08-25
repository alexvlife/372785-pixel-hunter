export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

export const showScreen = (el) => {
  const gameField = document.querySelector(`#main`);
  gameField.innerHTML = ``;
  gameField.appendChild(el);
};

export const gameStore = {
  livesBalance: 3,
  score: 0
};

export const calcLivesBalance = (currentAnswer) => {
  if (!currentAnswer.isTrue) {
    gameStore.livesBalance -= 1;
  }
  return gameStore.livesBalance;
};

export const calcGameScore = (answers, lives, rules) => {
  if (answers.length < 10) {
    return -1;
  }
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring(rules);
  }, 0);

  const bonusScore = lives * rules.score.life;
  gameStore.score = answersScore + bonusScore;

  return gameStore.score;
};

