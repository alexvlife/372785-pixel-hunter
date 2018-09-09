import {AnswerType, QuestionType} from './game-config';

const getPlayerAnswerType1 = () => {
  const playerAnswers = document.querySelectorAll(`input[type=radio]:checked`);
  return (playerAnswers.length === 1) ? playerAnswers[0].value : false;
};

const getPlayerAnswerType2 = () => {
  const playerAnswers = document.querySelectorAll(`input[type=radio]:checked`);
  return (playerAnswers.length === 2) ? (playerAnswers[0].value + `-` + playerAnswers[1].value) : false;
};

const getPlayerAnswerType3 = (evt) => {
  const playerAnswer = evt.target.src;
  return (playerAnswer) ? playerAnswer : false;
};

export const PlayerAnswerTypeMap = {
  [QuestionType.ONE_IMAGE]: getPlayerAnswerType1,
  [QuestionType.TWO_IMAGES]: getPlayerAnswerType2,
  [QuestionType.THREE_IMAGES]: getPlayerAnswerType3,
};

export const checkPlayerAnswer = (playerAnswer, rightAnswer) => {
  return playerAnswer === rightAnswer;
};

export const saveAnswerData = (currentGameLevel, answerKind, answerTime) => {
  const answerData = {
    id: currentGameLevel,
    isCorrect: answerKind,
    time: answerTime,
    type: AnswerType.UNANSWERED,
    defineType() {
      this.type = (this.isCorrect) ? AnswerType.CORRECT : AnswerType.WRONG;
    },
  };
  answerData.defineType();
  return answerData;
};
