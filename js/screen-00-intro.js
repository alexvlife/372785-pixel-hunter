import {render, showScreen} from './util';
import greeting from './screen-01-greeting';

const tpl = `<section class="intro">
              <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
              <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
            </section>`;

const el = render(tpl);

const btnNext = el.querySelector(`.intro__asterisk`);

btnNext.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default el;
