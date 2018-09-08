import {showScreen} from './utilsForBrowser';
import greeting from './screen-01-greeting';
import ScreenGameView from './view/screen-game-view';

const getGameScreenElement = (gameState, questions) => {

  const screenGameView = new ScreenGameView(gameState, questions);
  screenGameView.onGoBackButtonClick = () => {
    showScreen(greeting);
  };

  return screenGameView.element;
};

export default getGameScreenElement;
