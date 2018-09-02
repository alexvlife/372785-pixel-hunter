import LevelContentTemplateMap from './level-content.template';
import getStatsTemplate from './stats.template';

const getLevelTemplate = (question) => {
  const levelContent = LevelContentTemplateMap[question.type](question);

  return `<section class="game">
            <p class="game__task">${question.description}</p>
            ${levelContent}
            ${getStatsTemplate()}
          </section>`;
};

export default getLevelTemplate;
