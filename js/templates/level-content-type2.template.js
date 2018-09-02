const levelContentType2Template = (question) => {
  return `<form class="game__content">
            <div class="game__option">
              <img src="${question.images[0].url}" alt="Option 1" width="468" height="458">
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
              <img src="${question.images[1].url}" alt="Option 2" width="468" height="458">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question2" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question2" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
          </form>`;
};

export default levelContentType2Template;
