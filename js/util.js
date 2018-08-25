// import {gameRules} from './game-data/game-data';

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

export const gameLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const gameStore = {
  livesBalance: 3,
  minLevel: 1,
  currentLevel: 1,
  maxLevel: gameLevels.length,
  score: 0
};

// export const questionTimer = (answer) => {

//   function interval() {
//     answer.time += 1;
//     if (answer.time === gameRules.answerTime.limit) {
//       clearInterval(intervalID);
//       switchGameLevel();
//     }
//   }
//   let intervalID = setInterval(interval, 1000);
//   return answer.time;
// };

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

