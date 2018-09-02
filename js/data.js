export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
});

export const AnswerTimeType = {
  FAST: 10,
  SLOW: 20,
  LIMIT: 30,
};

export let currentGameState = {
  lives: INITIAL_GAME_STATE.lives,
  level: INITIAL_GAME_STATE.level,
};
