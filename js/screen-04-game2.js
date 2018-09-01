import {render, showScreen} from './utils';
import game3 from './screen-05-game3';
import greeting from './screen-01-greeting';
import getStateTemplate from './templates/state';
import getHeaderTemplate from './templates/header';
import questions from './mocks/questions';

const gameStateTemplate = getStateTemplate(2, 30);
const gameHeaderTemplate = getHeaderTemplate(gameStateTemplate);

const game2ScreenTemplate = `<section class="game">
                              <p class="game__task">Угадай, фото или рисунок?</p>
                              <form class="game__content  game__content--wide">
                                <div class="game__option">
                                  <img src="${questions[0].images[0].url}" alt="Option 1" width="705" height="455">
                                  <label class="game__answer  game__answer--photo">
                                    <input class="visually-hidden" name="question1" type="radio" value="photo">
                                    <span>Фото</span>
                                  </label>
                                  <label class="game__answer  game__answer--paint">
                                    <input class="visually-hidden" name="question1" type="radio" value="paint">
                                    <span>Рисунок</span>
                                  </label>
                                </div>
                              </form>
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
const game2ScreenElement = render(game2ScreenTemplate);
const gameContent = game2ScreenElement.querySelector(`.game__content`);

game2ScreenElement.insertBefore(headerElement, game2ScreenElement.firstChild);
gameContent.insertAdjacentHTML(`afterEnd`, gameStatsTemplate);

gameContent.addEventListener(`input`, () => {
  showScreen(game3);
});

const goBackButton = game2ScreenElement.querySelector(`.back`);
goBackButton.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default game2ScreenElement;
