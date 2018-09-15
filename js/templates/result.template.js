import getStatsTemplate from './stats.template';
import {
  getGameResults,
  getGameResultTotal,
  getTotalPoints,
  ResultType,
} from '../game-logic';

const getResultTemplate = (finalGameStates) => {

  const resultTableTemplates = finalGameStates.map((gameState, index) => {

    const isGamePassed = (gameState.lives >= 0);
    const gameResults = getGameResults(gameState);
    const gameResultTotal = getGameResultTotal(gameResults);

    const resultTemplates = [];
    const getTemplateOfResult = (result) => {
      return `<tr>
                <td></td>
                <td class="result__extra">${result.title}:</td>
                <td class="result__extra">${result.count} <span class="stats__result stats__result--${result.type}"></span></td>
                <td class="result__points">× ${Math.abs(result.points)}</td>
                <td class="result__total">${getTotalPoints(result)}</td>
              </tr>`;
    };

    gameResults.forEach((result) => {
      if (result.type !== ResultType.RIGHT_ANSWER && getTotalPoints(result) !== 0) {
        resultTemplates.push(getTemplateOfResult(result));
      }
    });

    const totalPointsTemplate = (isGamePassed)
      ? `<td class="result__points">× ${gameResults[0].points}</td>
        <td class="result__total">${getTotalPoints(gameResults[0])}</td>`
      : `<td class="result__total  result__total--final">fail</td>`;

    const finalScoreTemplate = (isGamePassed)
      ? `${resultTemplates.join(``)}
        <tr>
          <td colspan="5" class="result__total result__total--final">${gameResultTotal}</td>
        </tr>`
      : ``;

    return `<table class="result__table">
              <tr>
                <td class="result__number">${index}.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(gameState.answers)}
                </td>
                ${totalPointsTemplate}
              </tr>
              ${finalScoreTemplate}
            </table>`;
  });

  const lastGame = finalGameStates[finalGameStates.length - 1];
  const isLastGamePassed = (lastGame.lives >= 0);
  const gameStatusTitle = (isLastGamePassed) ? `Победа!` : `Увы.. Попробуйте еще раз`;

  return `<section class="result">
            <h2 class="result__title">${gameStatusTitle}</h2>
            ${resultTableTemplates.reverse().join(``)}
          </section>`;
};

export default getResultTemplate;
