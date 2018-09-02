import {render, showScreen} from './utils';
import greeting from './screen-01-greeting';
import stats from './screen-04-stats';
import getHeaderTemplate from './templates/header.template';
import getLevelTemplate from './templates/level.template';

const getGameScreenElement = (currentGameState, questions) => {
  const currentQuestion = questions[currentGameState.level];
  const gameScreenTemplate = getHeaderTemplate(currentGameState.lives) + getLevelTemplate(currentQuestion);
  const gameScreenElement = render(gameScreenTemplate);
  const goBackButton = gameScreenElement.querySelector(`.back`);

  currentGameState.level++;

  let isLastLevel = currentGameState.level === questions.length;
  let nextScreen = (isLastLevel) ? stats : getGameScreenElement(currentGameState, questions);

  if (currentQuestion.type === `one-image`) {
    gameScreenElement.addEventListener(`input`, () => {
      showScreen(nextScreen);
    });
  }

  if (currentQuestion.type === `two-images`) {
    gameScreenElement.addEventListener(`input`, () => {
      const answers = document.querySelectorAll(`input[type=radio]:checked`);
      if (answers.length === 2) {
        showScreen(nextScreen);
      }
    });
  }

  if (currentQuestion.type === `three-images`) {
    gameScreenElement.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `IMG`) {
        showScreen(nextScreen);
      }
    });
  }

  goBackButton.addEventListener(`click`, () => {
    showScreen(greeting);
  });

  return gameScreenElement;
};

export default getGameScreenElement;
