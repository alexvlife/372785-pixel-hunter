import ScreenRulesView from '../view/screen-rules-view.js';
import {showScreen} from '../utilsForBrowser.js';
import {INITIAL_GAME_STATE} from '../game-config.js';
import {saveAnswerData} from '../answer-logic.js';
import questions from '../mocks/questions.js';
import getGameScreenElement from '../screen-03-game.js';
import Router from '../router.js';


class ScreenRulesPresenter {
  constructor() {
    this.content = new ScreenRulesView();

    this.content.onUserNameInput = (evt) => {
      const canProceed = evt.target.value ? true : false;
      this.content.switchProceedState(canProceed);
    };

    this.content.onGoNextButtonClick = () => {
      const currentGameState = Object.assign({}, INITIAL_GAME_STATE);
      currentGameState.answers = questions.map((name, index) => {
        return saveAnswerData(index, ``, ``);
      });
      const gameScreenElement = getGameScreenElement(currentGameState, questions);
      showScreen(gameScreenElement);
    };

    this.content.onGoBackButtonClick = () => {
      Router.showScreenGreeting();
    };

  }

  get element() {
    return this.content.element;
  }
}

export default ScreenRulesPresenter;
