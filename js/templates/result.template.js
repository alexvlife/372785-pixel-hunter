import getStatsTemplate from './stats.template';
import {
  getGameResults,
  getGameResultTotal,
  getTotalPoints,
  ResultType,
} from '../game-logic';

const getResultTemplate = (result) => {
  return `<tr>
            <td></td>
            <td class="result__extra">${result.title}:</td>
            <td class="result__extra">${result.count} <span class="stats__result stats__result--${result.type}"></span></td>
            <td class="result__points">× ${Math.abs(result.points)}</td>
            <td class="result__total">${getTotalPoints(result)}</td>
          </tr>`;
};

const getResultTemplates = (gameResults) => {
  return gameResults.filter((result) => {
    return (result.type !== ResultType.RIGHT_ANSWER && getTotalPoints(result) !== 0);
  }).map((result) => {
    return getResultTemplate(result);
  });
};

const getTotalPointsTemplate = (isGamePassed, gameResults) => {
  return isGamePassed
    ? `<td class="result__points">× ${gameResults[0].points}</td>
      <td class="result__total">${getTotalPoints(gameResults[0])}</td>`
    : `<td class="result__total  result__total--final">fail</td>`;
};

const getFinalScoreTemplate = (isGamePassed, resultTemplates, gameResultTotal) => {
  return isGamePassed
    ? `${resultTemplates.join(``)}
      <tr>
        <td colspan="5" class="result__total result__total--final">${gameResultTotal}</td>
      </tr>`
    : ``;
};

const getResultTableTemplates = (finalGameStates) => {
  return finalGameStates.map((gameState, index) => {
    const isGamePassed = (gameState.lives >= 0);
    const gameResults = getGameResults(gameState);
    const gameResultTotal = getGameResultTotal(gameResults);
    const resultTemplates = getResultTemplates(gameResults);
    const totalPointsTemplate = getTotalPointsTemplate(isGamePassed, gameResults);
    const finalScoreTemplate = getFinalScoreTemplate(isGamePassed, resultTemplates, gameResultTotal);

    return `<table class="result__table">
              <tr>
                <td class="result__number">${index + 1}.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(gameState.answers)}
                </td>
                ${totalPointsTemplate}
              </tr>
              ${finalScoreTemplate}
            </table>`;
  });
};

const getResultScreenTemplate = (finalGameStates) => {
  const lastGame = finalGameStates[finalGameStates.length - 1];
  const isLastGamePassed = (lastGame.lives >= 0);
  const gameStatusTitle = isLastGamePassed ? `Победа!` : `Увы.. Попробуйте еще раз`;

  return `<section class="result">
            <h2 class="result__title">${gameStatusTitle}</h2>
            ${getResultTableTemplates(finalGameStates).reverse().join(``)}
          </section>`;
};

export default getResultScreenTemplate;
