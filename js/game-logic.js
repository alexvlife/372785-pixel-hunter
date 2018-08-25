const AnswerTimeType = {
  FAST: 10,
  SLOW: 20,
  LIMIT: 30,
};

const AnswerScoreType = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50,
};

export const gameLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const gameStore = {
  livesBalance: 3,
  minLevel: 1,
  currentLevel: 1,
  maxLevel: gameLevels.length,
  score: 0
};

export const switchGameLevel = () => {
  if (gameStore.livesBalance < 0 || gameStore.currentLevel === gameStore.maxLevel) {
    return -1;
  }
  gameStore.currentLevel += 1;
  return gameStore.currentLevel;
};

export const calcLivesBalance = (currentAnswer) => {
  if (!currentAnswer.isCorrect) {
    gameStore.livesBalance -= 1;
  }
  return gameStore.livesBalance;
};

export const calcGameScore = (answers, lives) => {
  if (answers.length < 10) {
    return -1;
  }
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring(AnswerTimeType, AnswerScoreType);
  }, 0);

  const bonusScore = lives * AnswerScoreType.LIFE;
  gameStore.score = answersScore + bonusScore;

  return gameStore.score;
};
