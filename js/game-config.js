export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
});

export const QuestionType = {
  ONE_IMAGE: `tinder-like`,
  TWO_IMAGES: `two-of-two`,
  THREE_IMAGES: `one-of-three`,
};

export const AnswerType = {
  UNANSWERED: `unknown`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  WRONG: `wrong`,
};

export const AnswerTimeType = {
  FAST: 10,
  SLOW: 20,
  LIMIT: 30,
};

export const ONE_SECOND = 1000;

export const EMPTY_ANSWER_DATA = ``;
