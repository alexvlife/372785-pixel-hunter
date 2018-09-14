import {QuestionType} from "./game-config";

export const ImageTypeMap = {
  'painting': `paint`,
  'photo': `photo`,
};

export const RightAnswerTypeMap = {
  'рисунок': `painting`,
  'фото': `photo`,
};

export const adaptServerQuestionsData = (serverQuestionsData) => {
  return serverQuestionsData.map((question) => {
    return adaptQuestionData(question);
  });
};

const adaptQuestionData = (questionData) => {
  return {
    type: questionData.type,
    description: questionData.question,
    images: adaptQuestionImagesData(questionData.answers),
    rightAnswer: RightAnswerDataTypeMap[questionData.type](questionData),
  };
};

const adaptQuestionImagesData = (imagesData) => {
  return imagesData.map((answer) => {
    return {
      url: answer.image.url,
      type: ImageTypeMap[answer.type],
    };
  });
};

const adaptRightAnswerDataOfTypeOne = (questionData) => {
  return ImageTypeMap[questionData.answers[0].type];
};

const adaptRightAnswerDataOfTypeTwo = (questionData) => {
  return ImageTypeMap[questionData.answers[0].type] + `-` + ImageTypeMap[questionData.answers[1].type];
};

const adaptRightAnswerDataOfTypeThree = (questionData) => {
  const currentAnswerType = questionData.question.split(` `)[1];

  const rightAnswerData = questionData.answers.filter((answer) => {
    return answer.type === RightAnswerTypeMap[currentAnswerType];
  });

  return rightAnswerData[0].image.url;
};

const RightAnswerDataTypeMap = {
  [QuestionType.ONE_IMAGE]: adaptRightAnswerDataOfTypeOne,
  [QuestionType.TWO_IMAGES]: adaptRightAnswerDataOfTypeTwo,
  [QuestionType.THREE_IMAGES]: adaptRightAnswerDataOfTypeThree,
};
