export const gameLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const gameStore = {
  livesBalance: 3,
  minLevel: 1,
  currentLevel: 1,
  maxLevel: gameLevels.length,
  score: 0
};

export const questionTimer = (timer) => {

  const limit = timer.limit * 1000;
  // начать повторы с интервалом 1 сек.
  let timerId = setInterval(() => {
    timer.tick();
  }, 1000);

  const stop = () => {
    clearInterval(timerId);
    return `Время на данный вопрос истекло..`;
  };

  // через limit сек. остановить повторы
  setTimeout(() => {
    stop();
  }, limit);
};

export const switchGameLevel = () => {
  if (gameStore.livesBalance < 0 || gameStore.currentLevel === gameStore.maxLevel) {
    return -1;
  }
  gameStore.currentLevel += 1;
  return gameStore.currentLevel;
};

export const calcLivesBalance = (currentAnswer) => {
  if (!currentAnswer.isTrue) {
    gameStore.livesBalance -= 1;
  }
  return gameStore.livesBalance;
};

export const calcGameScore = (answers, lives, rules) => {
  if (answers.length < 10) {
    return -1;
  }
  const answersScore = answers.reduce((sum, answer) => {
    return sum + answer.calcScoring(rules);
  }, 0);

  const bonusScore = lives * rules.score.life;
  gameStore.score = answersScore + bonusScore;

  return gameStore.score;
};
