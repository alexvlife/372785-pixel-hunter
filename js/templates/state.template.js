import {AnswerTimeType, INITIAL_GAME_STATE} from '../data';

const getStateTemplate = (currentLives) => {
  return (currentLives === undefined) ? ``
    : `<div class="game__timer">${AnswerTimeType.LIMIT}</div>
        <div class="game__lives">
          ${new Array(INITIAL_GAME_STATE.lives - currentLives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`)
            .join(``)}
          ${new Array(currentLives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
        </div>`;
};

export default getStateTemplate;
