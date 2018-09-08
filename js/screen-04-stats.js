import {showScreen} from './utilsForBrowser';
import greeting from './screen-01-greeting';
import ScreenStatsView from './view/screen-stats-view';

const getStatsScreenElement = (finalGameState) => {
  const screenStatsView = new ScreenStatsView(finalGameState);
  screenStatsView.onGoBackButtonClick = () => {
    showScreen(greeting);
  };

  return screenStatsView.element;
};

export default getStatsScreenElement;
