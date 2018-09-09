import ScreenStatsView from './view/screen-stats-view';
import Router from './router';

const getStatsScreenElement = (finalGameState) => {
  const screenStatsView = new ScreenStatsView(finalGameState);
  screenStatsView.onGoBackButtonClick = () => {
    Router.showScreenGreeting();
  };

  return screenStatsView.element;
};

export default getStatsScreenElement;
