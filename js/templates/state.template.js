import {EMPTY_STRING, INITIAL_GAME_STATE} from '../game-config';

const getStateTemplate = (currentLives) => {
  return (currentLives === undefined) ? EMPTY_STRING
    : `<div class="game__timer">00</div>
      <div class="game__lives">
        ${new Array(INITIAL_GAME_STATE.lives - currentLives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`)
          .join(EMPTY_STRING)}
        ${new Array(currentLives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(EMPTY_STRING)}
      </div>`;
};

export default getStateTemplate;
