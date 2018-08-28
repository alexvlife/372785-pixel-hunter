export const AnswerTimeType = {
  FAST: 10,
  SLOW: 20,
  LIMIT: 30,
};

export const AnswerScoreType = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50,
};

export const GameLevel = {
  MIN: 1,
  MAX: 10,
};

export const switchGameLevel = (currentLevel, nextLevel) => {
  if (typeof nextLevel !== `number` || nextLevel <= currentLevel || nextLevel > GameLevel.MAX) {
    return currentLevel;
  }
  let result;
  const stepLevel = nextLevel - currentLevel;
  if (stepLevel === 1) {
    result = nextLevel;
  }
  return result;
};

export const calcLivesBalance = (currentLivesBalance, currentAnswer) => {
  return (!currentAnswer.isCorrect) ? --currentLivesBalance : currentLivesBalance;
};

export const calcGameScore = (answers, currentLivesBalance) => {
  if (answers.length < 10) {
    return -1;
  }
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring();
  }, 0);

  const bonusScore = currentLivesBalance * AnswerScoreType.LIFE;
  return answersScore + bonusScore;
};
