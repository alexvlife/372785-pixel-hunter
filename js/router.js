import ScreenErrorPresenter from "./presenters/screen-error-presenter";
import ScreenIntroPresenter from "./presenters/screen-intro-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import ScreenGamePresenter from "./presenters/screen-game-presenter";
import ScreenStatsPresenter from "./presenters/screen-stats-presenter";
import GameModel from "./game-model";
import {adaptServerQuestionsData} from "./data-adapter";


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questionsData;

export default class Router {
  static showScreenIntro() {
    const screenIntro = new ScreenIntroPresenter();
    screenIntro.show();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => {
        questionsData = adaptServerQuestionsData(data);
      }).
      then(() => Router.showScreenGreeting()).
      catch(Router.showScreenError);
  }

  static showScreenGreeting() {
    const screenGreeting = new ScreenGreetingPresenter();
    screenGreeting.show();
  }

  static showScreenRules() {
    const screenRules = new ScreenRulesPresenter();
    screenRules.show();
  }

  static showScreenGame(playerName) {
    const gameModel = new GameModel(playerName, questionsData);
    const game = new ScreenGamePresenter(gameModel);
    game.init();
  }

  static showScreenStats(finalGameState) {
    const screenStatsLevel = new ScreenStatsPresenter(finalGameState);
    screenStatsLevel.show();
  }

  static showScreenError(error) {
    const screenError = new ScreenErrorPresenter(error);
    screenError.show();
  }
}
