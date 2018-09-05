import {getClone} from "./utils";

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

export const switchGameLevel = (currentLevel) => {
  if (typeof currentLevel !== `number` || currentLevel === GameLevel.MAX) {
    return currentLevel;
  }
  return ++currentLevel;
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

export const getNewGameState = (currentGameState, currentAnswer) => {
  const newGameState = getClone(currentGameState);
  newGameState.answers[currentAnswer.id] = currentAnswer;
  newGameState.level = switchGameLevel(newGameState.level);
  newGameState.lives = calcLivesBalance(newGameState.lives, currentAnswer);
  return newGameState;
};

export const goStatsScreen = (newGameState, questions) => {
  const isLastLevel = (newGameState.level === questions.length);
  return (isLastLevel || (newGameState.lives < 0));
};
