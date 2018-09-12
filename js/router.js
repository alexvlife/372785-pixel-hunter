import ScreenIntroPresenter from "./presenters/screen-intro-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import ScreenGamePresenter from "./presenters/screen-game-presenter";
import ScreenStatsPresenter from "./presenters/screen-stats-presenter";
import GameModel from "./game-model";
import questions from "./mocks/questions";

export default class Router {
  static showScreenIntro() {
    const screenIntro = new ScreenIntroPresenter();
    screenIntro.show();
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
    const gameModel = new GameModel(playerName, questions);
    const game = new ScreenGamePresenter(gameModel);
    game.init();
  }

  static showScreenStats(finalGameState) {
    const screenStatsLevel = new ScreenStatsPresenter(finalGameState);
    screenStatsLevel.show();
  }
}
