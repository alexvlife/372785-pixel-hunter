export const INITIAL_GAME_STATE = Object.freeze({
  lives: 3,
  level: 0,
});

export const INITIAL_ANSWER_DATA = Object.freeze({
  lives: 3,
  level: 0,
});

export const QuestionType = {
  ONE_IMAGE: `one-image`,
  TWO_IMAGES: `two-images`,
  THREE_IMAGES: `three-images`,
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
