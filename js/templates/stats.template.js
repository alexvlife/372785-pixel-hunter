import {EMPTY_STRING} from "../game-config";

const getStatsTemplate = (answers) => {
  const statsContentTemplate = answers.map((answer) => {
    return `<li class="stats__result stats__result--${answer.type}"></li>`;
  });
  return `<ul class="stats">
            ${statsContentTemplate.join(EMPTY_STRING)}
          </ul>`;
};

export default getStatsTemplate;
