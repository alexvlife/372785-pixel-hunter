import getStatsTemplate from './stats.template';
import {getGameResults, getGameResultTotal} from '../game-logic';

const getResultTemplate = (finalGameState) => {

  const gameResults = getGameResults(finalGameState);
  const gameResultTotal = getGameResultTotal(gameResults);

  const resultTemplates = [];
  gameResults.forEach((result) => {
    if (result === `За правильные ответы`) {
      return;
    }
    resultTemplates.push(`<tr>
                            <td></td>
                            <td class="result__extra">${result.title}:</td>
                            <td class="result__extra">${result.count} <span class="stats__result stats__result--${result.type}"></span></td>
                            <td class="result__points">× ${result.pointsOfOne}</td>
                            <td class="result__total">${result.getTotalPoints()}</td>
                          </tr>`);
  });

  return `<section class="result">
            <h2 class="result__title">${gameResultTotal.gameStatus}</h2>
            <table class="result__table">
              <tr>
                <td class="result__number">1.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(finalGameState.answers)}
                </td>
                <td class="result__points">× ${gameResults[0].pointsOfOne}</td>
                <td class="result__total">${gameResults[0].getTotalPoints()}</td>
              </tr>
              ${resultTemplates.join(``)}
              <tr>
                <td colspan="5" class="result__total result__total--final">${gameResultTotal.totalPoints}</td>
              </tr>
            </table>
          </section>`;
};

export default getResultTemplate;
