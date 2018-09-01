import {render, showScreen} from './utils';
import game2 from './screen-04-game2';
import greeting from './screen-01-greeting';
import getStateTemplate from './templates/state';
import getHeaderTemplate from './templates/header';
import questions from './mocks/questions';

const gameStateTemplate = getStateTemplate(3, 30);
const gameHeaderTemplate = getHeaderTemplate(gameStateTemplate);

const game1ScreenTemplate = `<section class="game">
                              <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
                              <form class="game__content">
                                <div class="game__option">
                                  <img src="${questions[1].images[0].url}" alt="Option 1" width="468" height="458">
                                  <label class="game__answer game__answer--photo">
                                    <input class="visually-hidden" name="question1" type="radio" value="photo">
                                    <span>Фото</span>
                                  </label>
                                  <label class="game__answer game__answer--paint">
                                    <input class="visually-hidden" name="question1" type="radio" value="paint">
                                    <span>Рисунок</span>
                                  </label>
                                </div>
                                <div class="game__option">
                                  <img src="${questions[1].images[1].url}" alt="Option 2" width="468" height="458">
                                  <label class="game__answer  game__answer--photo">
                                    <input class="visually-hidden" name="question2" type="radio" value="photo">
                                    <span>Фото</span>
                                  </label>
                                  <label class="game__answer  game__answer--paint">
                                    <input class="visually-hidden" name="question2" type="radio" value="paint">
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
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--unknown"></li>
                          </ul>`;

const headerElement = render(gameHeaderTemplate);
const game1ScreenElement = render(game1ScreenTemplate);
const gameContent = game1ScreenElement.querySelector(`.game__content`);

game1ScreenElement.insertBefore(headerElement, game1ScreenElement.firstChild);

gameContent.insertAdjacentHTML(`afterEnd`, gameStatsTemplate);

gameContent.addEventListener(`input`, () => {
  const answers = document.querySelectorAll(`input[type=radio]:checked`);
  if (answers.length === 2) {
    showScreen(game2);
  }
});

const goBackButton = game1ScreenElement.querySelector(`.back`);
goBackButton.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default game1ScreenElement;
