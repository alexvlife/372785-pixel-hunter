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

export const calcGameScore = (userAnswers, livesBalance, gameRules) => {
  if (userAnswers.length < 10) {
    return -1;
  }
  const answersScore = userAnswers.reduce((sum, answer) => {
    return sum + answer.calcScoring(gameRules);
  }, 0);

  const bonusScore = livesBalance * gameRules.score.life;
  const gameScore = answersScore + bonusScore;

  return gameScore;
};
