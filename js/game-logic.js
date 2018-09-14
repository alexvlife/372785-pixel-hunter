import {getClone} from "./utils";
import {
  AnswerTimeType,
  AnswerType} from "./game-config";

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

export const ResultType = {
  RIGHT_ANSWER: `right`,
  FAST_ANSWER: `fast`,
  SLOW_ANSWER: `slow`,
  LIVES_BALANCE: `alive`,
};

export const ResultTitleMap = {
  [ResultType.RIGHT_ANSWER]: `За правильные ответы`,
  [ResultType.FAST_ANSWER]: `Бонус за скорость`,
  [ResultType.LIVES_BALANCE]: `Бонус за жизни`,
  [ResultType.SLOW_ANSWER]: `Штраф за медлительность`,
};

export const switchGameLevel = (currentLevel) => {
  if (typeof currentLevel !== `number` || currentLevel === GameLevel.MAX) {
    return currentLevel;
  }
  return ++currentLevel;
};

export const calcLivesBalance = (currentLivesBalance, currentAnswer) => {
  return (!currentAnswer.isCorrect || currentAnswer.time >= AnswerTimeType.LIMIT)
    ? --currentLivesBalance : currentLivesBalance;
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

export const isGameEnded = (newGameState, questions) => {
  const isLastLevel = (newGameState.level === questions.length);
  return (isLastLevel || (newGameState.lives < 0));
};

export const getCorrectAnswerCount = (answers) => {
  return answers.filter((answer) => answer.isCorrect).length;
};

export const getFastAnswerCount = (answers) => {
  return answers.filter((answer) => answer.type === AnswerType.FAST).length;
};

export const getSlowAnswerCount = (answers) => {
  return answers.filter((answer) => answer.type === AnswerType.SLOW).length;
};

export const getTotalPoints = (gameResult) => {
  return gameResult.count * gameResult.points;
};

export const getGameResults = (finalGameState) => {
  const gameResults = [
    {
      title: ResultTitleMap[ResultType.RIGHT_ANSWER],
      type: ResultType.RIGHT_ANSWER,
      count: getCorrectAnswerCount(finalGameState.answers),
      points: AnswerScoreType.CORRECT,
    },
    {
      title: ResultTitleMap[ResultType.FAST_ANSWER],
      type: ResultType.FAST_ANSWER,
      count: getFastAnswerCount(finalGameState.answers),
      points: AnswerScoreType.FAST,
    },
    {
      title: ResultTitleMap[ResultType.LIVES_BALANCE],
      type: ResultType.LIVES_BALANCE,
      count: finalGameState.lives,
      points: AnswerScoreType.LIFE,
    },
    {
      title: ResultTitleMap[ResultType.SLOW_ANSWER],
      type: ResultType.SLOW_ANSWER,
      count: getSlowAnswerCount(finalGameState.answers),
      points: AnswerScoreType.SLOW,
    },
  ];
  return gameResults;
};

export const getGameResultTotal = (gameResults) => {
  const totalPoints = gameResults.reduce((sum, type) => {
    return sum + getTotalPoints(type);
  }, 0);

  return totalPoints;
};
