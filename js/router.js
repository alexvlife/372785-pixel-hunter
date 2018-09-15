import ScreenErrorPresenter from "./presenters/screen-error-presenter";
import ScreenIntroPresenter from "./presenters/screen-intro-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import ScreenGamePresenter from "./presenters/screen-game-presenter";
import ScreenStatsPresenter from "./presenters/screen-stats-presenter";
import GameModel from "./game-model";
import Loader from "./loader";

let questionsData;

export default class Router {
  static showScreenIntro() {
    const screenIntro = new ScreenIntroPresenter();
    screenIntro.show();
    Loader.loadData().
    then((data) => {
      questionsData = data;
    }).
    then(() => Router.showScreenGreeting());
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

  static showScreenStats(gameModel) {
    const playerName = gameModel.playerName;
    const finalGameState = gameModel.currentState;


    Loader.saveResults(finalGameState, playerName).
      then(() => Loader.loadResults(playerName)).
      then((data) => {
        const screenStatsLevel = new ScreenStatsPresenter(data);
        screenStatsLevel.show();
      });
  }

  static showScreenError(error) {
    const screenError = new ScreenErrorPresenter(error);
    screenError.show();
  }
}
