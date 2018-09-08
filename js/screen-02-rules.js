import ScreenRulesView from './view/screen-rules-view';
import {showScreen} from './utilsForBrowser';
import {INITIAL_GAME_STATE} from './game-config';
import questions from './mocks/questions';
import {saveAnswerData} from './answer-logic';
import getGameScreenElement from './screen-03-game';
import greeting from './screen-01-greeting';

const screenRulesView = new ScreenRulesView();

screenRulesView.onGoNextButtonClick = () => {
  const currentGameState = Object.assign({}, INITIAL_GAME_STATE);
  currentGameState.answers = questions.map((name, index) => {
    return saveAnswerData(index, ``, ``);
  });
  const gameScreenElement = getGameScreenElement(currentGameState, questions);
  showScreen(gameScreenElement);
};

screenRulesView.onGoBackButtonClick = () => {
  showScreen(greeting);
};

const screenRulesElement = screenRulesView.element;

export default screenRulesElement;
