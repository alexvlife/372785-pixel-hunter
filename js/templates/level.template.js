import LevelContentTemplateMap from './level-content.template';
import getStatsTemplate from './stats.template';

const getLevelTemplate = (answers, question) => {
  const levelContent = LevelContentTemplateMap[question.type](question);

  return `<section class="game">
            <p class="game__task">${question.description}</p>
            ${levelContent}
            ${getStatsTemplate(answers)}
          </section>`;
};

export default getLevelTemplate;
