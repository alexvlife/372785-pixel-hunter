import ScreenIntroPresenter from "./presenters/screen-intro-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import {showScreen} from "./utilsForBrowser";
import GameModel from "./game-model";
import ScreenGamePresenter from "./presenters/screen-rules-presenter";

export default class Router {

  static showScreenIntro() {
    const screenIntro = new ScreenIntroPresenter();
    showScreen(screenIntro.element);
  }

  static showScreenGreeting() {
    const screenGreeting = new ScreenGreetingPresenter();
    showScreen(screenGreeting.element);
  }

  static showScreenRules() {
    const screenRules = new ScreenRulesPresenter();
    showScreen(screenRules.element);
  }

  static showScreenGame(userName) {
    const gameModel = new GameModel(userName);
    const screenGame = new ScreenGamePresenter(gameModel);
    showScreen(screenGame.element);
    screenGame.startGame();
  }

  // static showStats(stats) {
  //   const statistics = new StatsScreen(stats);
  //   changeView(statistics.element);
  // }

}
