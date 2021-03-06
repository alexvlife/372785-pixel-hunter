import ScreenErrorPresenter from "./presenters/screen-error-presenter";
import ScreenGamePresenter from "./presenters/screen-game-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import ScreenStartPresenter from "./presenters/screen-start-presenter";
import ScreenStatsPresenter from "./presenters/screen-stats-presenter";
import GameModel from "./models/game-model";
import GameDataLoader from "./game-data-loader";

let questionsData;

export default class Router {
  static showScreenStart() {
    const screenGreeting = new ScreenStartPresenter();
    screenGreeting.show();
    GameDataLoader.loadData().
    then((data) => {
      questionsData = data;
    }).
    catch(Router.showScreenError);
    window.onload = () => {
      screenGreeting.onDataLoad();
    };
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
    GameDataLoader.saveResults(finalGameState, playerName).
      then(() => GameDataLoader.loadResults(playerName)).
      then((data) => {
        const screenStatsLevel = new ScreenStatsPresenter(data);
        screenStatsLevel.show();
      }).
      catch(Router.showScreenError);
  }

  static showScreenError(error) {
    const screenError = new ScreenErrorPresenter(error);
    screenError.show();
  }
}
