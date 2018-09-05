import {render, showScreen} from './utilsForBrowser';
import greeting from './screen-01-greeting';
import getStatsScreenElement from './screen-04-stats';
import getHeaderTemplate from './templates/header.template';
import getLevelTemplate from './templates/level.template';
import {checkUserAnswer, GetUserAnswerMap, saveAnswerData} from './answer-logic';
import {getNewGameState, goStatsScreen} from './game-logic';

const getGameScreenElement = (gameState, questions) => {
  const currentQuestion = questions[gameState.level];
  const gameScreenTemplate = getHeaderTemplate(gameState.lives) +
                             getLevelTemplate(gameState.answers, currentQuestion);
  const gameScreenElement = render(gameScreenTemplate);
  const goBackButton = gameScreenElement.querySelector(`.back`);

  goBackButton.addEventListener(`click`, () => {
    showScreen(greeting);
  });

  gameScreenElement.addEventListener(`click`, (evt) => {
    const userAnswer = GetUserAnswerMap[currentQuestion.type](evt);

    if (userAnswer) {
      const answerTime = 15; // заглушка (в данном задании - таймер не требуется).
      const answerKind = checkUserAnswer(userAnswer, currentQuestion.rightAnswer);
      const answer = saveAnswerData(gameState.level, answerKind, answerTime);
      const newGameState = getNewGameState(gameState, answer);
      const nextScreen = (goStatsScreen(newGameState, questions)) ? getStatsScreenElement(newGameState)
        : getGameScreenElement(newGameState, questions);
      showScreen(nextScreen);
    }
  });

  return gameScreenElement;
};

export default getGameScreenElement;
