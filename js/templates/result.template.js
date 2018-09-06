import getStatsTemplate from './stats.template';
import {
  getGameResults,
  getGameResultTotal,
  getTotalPoints,
  ResultTitleMap,
  ResultTypesMap,
} from '../game-logic';

const getResultTemplate = (finalGameState) => {

  const gameResults = getGameResults(finalGameState);
  const gameResultTotal = getGameResultTotal(gameResults);

  const resultTemplates = [];
  const getTemplateOfResult = (result) => {
    return `<tr>
              <td></td>
              <td class="result__extra">${result.title}:</td>
              <td class="result__extra">${result.count} <span class="stats__result stats__result--${result.type}"></span></td>
              <td class="result__points">× ${result.points}</td>
              <td class="result__total">${getTotalPoints(result)}</td>
            </tr>`;
  };

  gameResults.forEach((result) => {
    if (result.title !== ResultTitleMap[ResultTypesMap.RIGHT_ANSWER] && getTotalPoints(result) > 0) {
      resultTemplates.push(getTemplateOfResult(result));
    }
  });

  const totalPointsTemplate = (gameResultTotal.isGamePassed)
    ? `<td class="result__points">× ${gameResults[0].points}</td>
      <td class="result__total">${getTotalPoints(gameResults[0])}</td>`
    : `<td class="result__total  result__total--final">fail</td>`;

  const finalScoreTemplate = (gameResultTotal.isGamePassed)
    ? `${resultTemplates.join(``)}
      <tr>
        <td colspan="5" class="result__total result__total--final">${gameResultTotal.totalPoints}</td>
      </tr>`
    : ``;

  return `<section class="result">
            <h2 class="result__title">${gameResultTotal.gameStatusTitle}</h2>
            <table class="result__table">
              <tr>
                <td class="result__number">1.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(finalGameState.answers)}
                </td>
                ${totalPointsTemplate}
              </tr>
              ${finalScoreTemplate}
            </table>
          </section>`;
};

export default getResultTemplate;
