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
    return answer.isCorrect === true;
  }).length;
};


export const getGameResults = (finalGameState) => {
  const gameResults = [
    {
      title: `За правильные ответы`,
      count: getCorrectAnswerCount(finalGameState.answers),
      pointsOfOne: AnswerScoreType.CORRECT,
      getTotalPoints() {
        return this.count * this.pointsOfOne;
      }
    },
    {
      title: `Бонус за скорость`,
      type: `fast`,
      count: 0, // в текущем задании не требуется
      pointsOfOne: AnswerScoreType.FAST,
      getTotalPoints() {
        return this.count * this.pointsOfOne;
      }
    },
    {
      title: `Бонус за жизни`,
      type: `alive`,
      count: finalGameState.lives,
      pointsOfOne: AnswerScoreType.LIFE,
      getTotalPoints() {
        return this.count * this.pointsOfOne;
      }
    },
    {
      title: `Штраф за медлительность`,
      type: `slow`,
      count: 0, // в текущем задании не требуется
      pointsOfOne: AnswerScoreType.SLOW,
      total: 0,
      getTotalPoints() {
        return this.count * this.pointsOfOne;
      }
    },
  ];
  return gameResults;
};

export const getGameResultTotal = (gameResults) => {
  const totalPoints = gameResults.reduce((sum, type) => {
    return sum + type.getTotalPoints();
  }, 0);

  const gameStatus = (gameResults[0].count > (GameLevel.MAX - INITIAL_GAME_STATE.lives))
    ? `Победа!`
    : `Увы.. Попробуйте еще раз`;
  return {totalPoints, gameStatus};

};
