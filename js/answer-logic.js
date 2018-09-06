import {AnswerType, QuestionType} from './game-config';

const getUserAnswerType1 = () => {
  const userAnswers = document.querySelectorAll(`input[type=radio]:checked`);
  return (userAnswers.length === 1) ? userAnswers[0].value : false;
};

const getUserAnswerType2 = () => {
  const userAnswers = document.querySelectorAll(`input[type=radio]:checked`);
  return (userAnswers.length === 2) ? (userAnswers[0].value + `-` + userAnswers[1].value) : false;
};

const getUserAnswerType3 = (evt) => {
  const userAnswer = evt.target.src;
  return (userAnswer) ? userAnswer : false;
};

export const UserAnswerTypeMap = {
  [QuestionType.ONE_IMAGE]: getUserAnswerType1,
  [QuestionType.TWO_IMAGES]: getUserAnswerType2,
  [QuestionType.THREE_IMAGES]: getUserAnswerType3,
};

export const checkUserAnswer = (userAnswer, rightAnswer) => {
  return userAnswer === rightAnswer;
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
