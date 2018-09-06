const getStatsTemplate = (answers) => {
  const statsContentTemplate = answers.map((answer) => {
    return `<li class="stats__result stats__result--${answer.type}"></li>`;
  });
  return `<ul class="stats">
            ${statsContentTemplate.join(``)}
          </ul>`;
};

export default getStatsTemplate;
