export const loadQuestionImages = (adaptServerQuestionsData) => {
  adaptServerQuestionsData.forEach((question) => {
    question.images.forEach((image) => {
      const questionImage = new Image();
      questionImage.src = image.url;
    });
  });
};
