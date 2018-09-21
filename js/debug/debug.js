import {QuestionType} from "../game-config";

const DEBUG_ELEMENT_BORDER_STYLE = `10px solid green`;

const getInnerDebugElement = (elements, needfulElementIndex, rightAnswer) => {
  return elements[needfulElementIndex].querySelector(`input[value=${rightAnswer}]`).nextElementSibling;
};

const addStyleForElement = (element) => {
  element.style.border = DEBUG_ELEMENT_BORDER_STYLE;
};

const changeStyleDebugElementType1 = (questionElements, rightAnswer) => {
  const needfulElementIndex = 0;
  const debugElement = getInnerDebugElement(questionElements, needfulElementIndex, rightAnswer);
  addStyleForElement(debugElement);
};

const changeStyleDebugElementType2 = (questionElements, rightAnswer) => {
  const rightAnswers = rightAnswer.split(`-`);
  rightAnswers.forEach((answer, index) => {
    const debugElement = getInnerDebugElement(questionElements, index, answer);
    addStyleForElement(debugElement);
  });
};

const changeStyleDebugElementType3 = (questionElements, rightAnswer) => {
  for (let questionElement of questionElements) {
    const debugElement = questionElement;
    if (debugElement.firstElementChild.src === rightAnswer) {
      addStyleForElement(debugElement);
      return;
    }
  }
};

export const ElementWithDebugStyleMap = {
  [QuestionType.ONE_IMAGE]: changeStyleDebugElementType1,
  [QuestionType.TWO_IMAGES]: changeStyleDebugElementType2,
  [QuestionType.THREE_IMAGES]: changeStyleDebugElementType3,
};
