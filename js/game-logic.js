import {getClone} from "./utils";
import {INITIAL_GAME_STATE} from "./game-config";

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

export const ResultTypesMap = {
  RIGHT_ANSWER: `rigth`,
  FAST_ANSWER: `fast`,
  SLOW_ANSWER: `slow`,
  LIVES_BALANCE: `alive`,
};

export const ResultTitleMap = {
  [ResultTypesMap.RIGHT_ANSWER]: `За правильные ответы`,
  [ResultTypesMap.FAST_ANSWER]: `Бонус за скорость`,
  [ResultTypesMap.LIVES_BALANCE]: `Бонус за жизни`,
  [ResultTypesMap.SLOW_ANSWER]: `Штраф за медлительность`,
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

export const getCorrectAnswerCount = (answers) => {
  return answers.filter((answer) => {
    return answer.isCorrect;
  }).length;
};

export const getTotalPoints = (gameResult) => {
  return gameResult.count * gameResult.points;
};

export const getGameResults = (finalGameState) => {
  const gameResults = [
    {
      title: ResultTitleMap[ResultTypesMap.RIGHT_ANSWER],
      count: getCorrectAnswerCount(finalGameState.answers),
      points: AnswerScoreType.CORRECT,
    },
    {
      title: ResultTitleMap[ResultTypesMap.FAST_ANSWER],
      type: ResultTypesMap.FAST_ANSWER,
      count: 0, // в текущем задании не требуется
      points: AnswerScoreType.FAST,
    },
    {
      title: ResultTitleMap[ResultTypesMap.LIVES_BALANCE],
      type: ResultTypesMap.LIVES_BALANCE,
      count: finalGameState.lives,
      points: AnswerScoreType.LIFE,
    },
    {
      title: ResultTitleMap[ResultTypesMap.SLOW_ANSWER],
      type: ResultTypesMap.SLOW_ANSWER,
      count: 0, // в текущем задании не требуется
      points: AnswerScoreType.SLOW,
      total: 0,
    },
  ];
  return gameResults;
};

export const getGameResultTotal = (gameResults) => {
  const totalPoints = gameResults.reduce((sum, type) => {
    return sum + getTotalPoints(type);
  }, 0);

  const isGamePassed = (gameResults[0].count > (GameLevel.MAX - INITIAL_GAME_STATE.lives));
  const gameStatusTitle = (isGamePassed) ? `Победа!` : `Увы.. Попробуйте еще раз`;

  return {totalPoints, isGamePassed, gameStatusTitle};
};
