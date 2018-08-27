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

export const GAME_STATE = Object.freeze({
  livesBalance: 3,
  level: 1,
  score: 0
});

export const switchGameLevel = (gameState, level) => {
  if (typeof level !== `number` || level <= gameState.level) {
    return gameState;
  }
  const currentGameState = Object.assign({}, gameState, {level});
  return currentGameState;
};

export const calcLivesBalance = (gameState, currentAnswer) => {
  const currentGameState = Object.assign({}, gameState);
  if (!currentAnswer.isCorrect) {
    currentGameState.livesBalance -= 1;
  }
  return currentGameState;
};

export const calcGameScore = (answers, gameState) => {
  if (answers.length < 10) {
    return -1;
  }
  const currentGameState = Object.assign({}, gameState);
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring();
  }, 0);

  const bonusScore = currentGameState.livesBalance * AnswerScoreType.LIFE;
  currentGameState.score = answersScore + bonusScore;

  return currentGameState;
};
