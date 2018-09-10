import ScreenIntroPresenter from "./presenters/screen-intro-presenter";
import ScreenGreetingPresenter from "./presenters/screen-greeting-presenter";
import ScreenRulesPresenter from "./presenters/screen-rules-presenter";
import ScreenGamePresenter from "./presenters/screen-game-presenter";
import ScreenStatsPresenter from "./presenters/screen-stats-presenter";
import {showScreen} from "./utilsForBrowser";
import GameModel from "./game-model";
import questions from "./mocks/questions";

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

  static showScreenGame(playerName) {
    const gameModel = new GameModel(playerName, questions);
    this.showScreenGameLevel(gameModel);
    // screenGame.startGame();
  }

  static showScreenGameLevel(gameModel) {
    const screenGameLevel = new ScreenGamePresenter(gameModel);
    screenGameLevel.startTimer();
    showScreen(screenGameLevel.element);
  }

  static showScreenStats(finalGameState) {
    const screenStatsLevel = new ScreenStatsPresenter(finalGameState);
    showScreen(screenStatsLevel.element);
  }
}
