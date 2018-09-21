import {QuestionType} from "./game-config";
import resize from "./resize";
import Router from "./router";

const getErrorAtLoadImage = (imageUrl) => {
  return {
    name: `Не удалось загрузить картинку`,
    message: imageUrl,
  };
};

export const ImageSizeMap = {
  [QuestionType.ONE_IMAGE]: {
    width: 705,
    height: 455,
  },
  [QuestionType.TWO_IMAGES]: {
    width: 468,
    height: 458,
  },
  [QuestionType.THREE_IMAGES]: {
    width: 304,
    height: 455,
  },
};

export const ImageTypeMap = {
  'painting': `paint`,
  'photo': `photo`,
};

export const RightAnswerTypeMap = {
  'рисунок': `painting`,
  'фото': `photo`,
};

export const adaptServerQuestionsData = (serverQuestionsData) => {
  return serverQuestionsData.map((questionData) => {
    return {
      type: questionData.type,
      description: questionData.question,
      images: adaptQuestionImagesData(questionData),
      rightAnswer: RightAnswerDataTypeMap[questionData.type](questionData),
    };
  });
};

const adaptQuestionImagesData = (questionData) => {
  return questionData.answers.map((answer) => {
    const questionImage = new Image();
    questionImage.src = answer.image.url;
    const questionImageData = {
      data: questionImage,
      type: ImageTypeMap[answer.type],
      resize() {
        const realImageSize = {
          width: this.data.width,
          height: this.data.height,
        };
        this.size = resize(ImageSizeMap[questionData.type], realImageSize);
      }
    };
    questionImage.onload = () => {
      questionImageData.resize();
    };
    questionImage.onerror = () => {
      const error = getErrorAtLoadImage(answer.image.url);
      Router.showScreenError(error);
    };
    return questionImageData;
  });
};

const adaptRightAnswerDataOfTypeOne = (questionData) => {
  return ImageTypeMap[questionData.answers[0].type];
};

const adaptRightAnswerDataOfTypeTwo = (questionData) => {
  return `${ImageTypeMap[questionData.answers[0].type]}-${ImageTypeMap[questionData.answers[1].type]}`;
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
