import getStatsTemplate from './stats.template';

const getResultTemplate = (finalGameState) => {

  return `<section class="result">
            <h2 class="result__title">Победа!</h2>
            <table class="result__table">
              <tr>
                <td class="result__number">1.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(finalGameState.answers)}
                </td>
                <td class="result__points">× 100</td>
                <td class="result__total">900</td>
              </tr>
              <tr>
                <td></td>
                <td class="result__extra">Бонус за скорость:</td>
                <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
                <td class="result__points">× 50</td>
                <td class="result__total">50</td>
              </tr>
              <tr>
                <td></td>
                <td class="result__extra">Бонус за жизни:</td>
                <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
                <td class="result__points">× 50</td>
                <td class="result__total">100</td>
              </tr>
              <tr>
                <td></td>
                <td class="result__extra">Штраф за медлительность:</td>
                <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
                <td class="result__points">× 50</td>
                <td class="result__total">-100</td>
              </tr>
              <tr>
                <td colspan="5" class="result__total  result__total--final">950</td>
              </tr>
            </table>
          </section>`;
};

export default getResultTemplate;
