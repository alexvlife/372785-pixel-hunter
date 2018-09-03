import {render, showScreen} from './utils';
import greeting from './screen-01-greeting';
import getHeaderTemplate from './templates/header.template';
import getResultTemplate from './templates/result.template';

const getStatsScreenElement = (finalGameState) => {
  const statsScreenTemplate = getHeaderTemplate() +
                              getResultTemplate(finalGameState);
  const statsScreenElement = render(statsScreenTemplate);
  const goBackButton = statsScreenElement.querySelector(`.back`);
  goBackButton.addEventListener(`click`, () => {
    showScreen(greeting);
  });

  return statsScreenElement;
};

export default getStatsScreenElement;
