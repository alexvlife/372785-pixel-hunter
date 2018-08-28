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

export const INITIAL_GAME_STATE = Object.freeze({
  livesBalance: 3,
  level: 1,
});

export const currentGameState = {
  livesBalance: INITIAL_GAME_STATE.livesBalance,
  level: INITIAL_GAME_STATE.level
};

export const switchGameLevel = (gameState, level) => {
  if (typeof level !== `number` || level <= gameState.level) {
    return gameState.level;
  }
  const newGameState = Object.assign({}, gameState, {level});
  return newGameState.level;
};

export const modifyLivesBalance = (gameState, currentAnswer) => {
  const newGameState = Object.assign({}, gameState);
  if (!currentAnswer.isCorrect) {
    newGameState.livesBalance -= 1;
  }
  return newGameState.livesBalance;
};

export const calcGameScore = (answers, gameState) => {
  if (answers.length < 10) {
    return -1;
  }
  const newGameState = Object.assign({}, gameState);
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring();
  }, 0);

  const bonusScore = newGameState.livesBalance * AnswerScoreType.LIFE;
  newGameState.score = answersScore + bonusScore;

  return newGameState.score;
};
