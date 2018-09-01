import {render, showScreen} from './utils';
import greeting from './screen-01-greeting';

const gameHeaderTemplate = `<header class="header">
                              <button class="back">
                                <span class="visually-hidden">Вернуться к началу</span>
                                <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                                  <use xlink:href="img/sprite.svg#arrow-left"></use>
                                </svg>
                                <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                                  <use xlink:href="img/sprite.svg#logo-small"></use>
                                </svg>
                              </button>
                            </header>`;

const statsScreenTemplate = `<section class="result">
                                <h2 class="result__title">Победа!</h2>
                                <table class="result__table">
                                <tr>
                                  <td class="result__number">1.</td>
                                  <td class="result__stats" colspan="2">
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

const gameStatsTemplate = `<ul class="stats">
                            <li class="stats__result stats__result--wrong"></li>
                            <li class="stats__result stats__result--slow"></li>
                            <li class="stats__result stats__result--fast"></li>
                            <li class="stats__result stats__result--correct"></li>
                            <li class="stats__result stats__result--wrong"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--slow"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--fast"></li>
                            <li class="stats__result stats__result--unknown"></li>
                          </ul>`;

const headerElement = render(gameHeaderTemplate);
const statsScreenElement = render(statsScreenTemplate);
const resultStatsElement = statsScreenElement.querySelector(`.result__stats`);

statsScreenElement.insertBefore(headerElement, statsScreenElement.firstChild);
resultStatsElement.insertAdjacentHTML(`afterBegin`, gameStatsTemplate);


const goBackButton = statsScreenElement.querySelector(`.back`);
goBackButton.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default statsScreenElement;
