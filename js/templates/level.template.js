import levelContentType1Template from './level-content-type1.template';
import levelContentType2Template from './level-content-type2.template';
import levelContentType3Template from './level-content-type3.template';
import statsTemplate from './stats.template';

const getLevelTemplate = (question) => {
  let levelContent = ``;
  switch (true) {
    case (question.type === 1):
      levelContent = levelContentType1Template(question);
      break;
    case (question.type === 2):
      levelContent = levelContentType2Template(question);
      break;
    case (question.type === 3):
      levelContent = levelContentType3Template(question);
      break;
    default:
      levelContent = ``;
  }

  return `<section class="game">
            <p class="game__task">${question.description}</p>
            ${levelContent}
            ${statsTemplate()}
          </section>`;
};

export default getLevelTemplate;
