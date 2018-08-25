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

export const calcGameScore = (answers, lives, rules) => {
  if (answers.length < 10) {
    return -1;
  }
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring(rules);
  }, 0);

  const bonusScore = lives * rules.score.life;
  const gameScore = answersScore + bonusScore;

  return gameScore;
};

