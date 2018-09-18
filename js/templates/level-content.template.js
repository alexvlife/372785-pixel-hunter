import {QuestionType} from "../game-config";

const getLevelContentType1Template = (question) => {
  return `<form class="game__content game__content--wide">
            <div class="game__option">
              <img
                src="${question.images[0].data.src}"
                alt="Option 1"
                width="${question.images[0].size.width}"
                height="${question.images[0].size.height}">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question1" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question1" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
          </form>`;
};

const getLevelContentType2Template = (question) => {
  const contentTemplates = [];
  question.images.forEach((image, index) => {
    contentTemplates.push(`<div class="game__option">
                              <img
                                src="${image.data.src}"
                                alt="Option ${index + 1}"
                                width="${image.size.width}"
                                height="${image.size.height}">
                              <label class="game__answer game__answer--photo">
                                <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
                                <span>Фото</span>
                              </label>
                              <label class="game__answer game__answer--paint">
                                <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
                                <span>Рисунок</span>
                              </label>
                            </div>`);
  });
  return `<form class="game__content">
            ${contentTemplates.join(``)}
          </form>`;
};

const getLevelContentType3Template = (question) => {
  const contentTemplates = [];
  question.images.forEach((image, index) => {
    contentTemplates.push(`<div class="game__option">
                              <img
                                src="${image.data.src}"
                                alt="Option ${index + 1}"
                                width="${image.size.width}"
                                height="${image.size.height}">
                            </div>`
    );
  });
  return `<form class="game__content game__content--triple">
            ${contentTemplates.join(``)}
          </form>`;
};

const LevelContentTemplateMap = {
  [QuestionType.ONE_IMAGE]: getLevelContentType1Template,
  [QuestionType.TWO_IMAGES]: getLevelContentType2Template,
  [QuestionType.THREE_IMAGES]: getLevelContentType3Template,
};

export default LevelContentTemplateMap;
