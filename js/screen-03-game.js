import {showScreen} from './utilsForBrowser';
import getStatsScreenElement from './screen-04-stats';
import {checkUserAnswer, UserAnswerTypeMap, saveAnswerData} from './answer-logic';
import {getNewGameState, goStatsScreen} from './game-logic';
import ScreenGameView from './view/screen-game-view';
import Router from './router';

const getGameScreenElement = (gameState, questions) => {

  const currentQuestion = questions[gameState.level];
  const screenGameView = new ScreenGameView(gameState, currentQuestion);

  screenGameView.onAnswer = (evt) => {
    const userAnswer = UserAnswerTypeMap[currentQuestion.type](evt);

    if (userAnswer) {
      const answerTime = 15; // заглушка (в данном задании - таймер не требуется).
      const answerKind = checkUserAnswer(userAnswer, currentQuestion.rightAnswer);
      const answer = saveAnswerData(gameState.level, answerKind, answerTime);
      const newGameState = getNewGameState(gameState, answer);
      const nextScreen = (goStatsScreen(newGameState, questions)) ? getStatsScreenElement(newGameState)
        : getGameScreenElement(newGameState, questions);
      showScreen(nextScreen);
    }
  };

  screenGameView.onGoBackButtonClick = () => {
    Router.showScreenGreeting();
  };

  return screenGameView.element;
};

export default getGameScreenElement;
