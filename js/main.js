(function () {
  'use strict';

  const gameField = document.querySelector(`#main`);

  const render = (template) => {
    const wrapperElement = document.createElement(`div`);
    wrapperElement.innerHTML = template.trim();
    return wrapperElement;
  };

  const showScreen = (screenElement) => {
    gameField.innerHTML = ``;
    gameField.appendChild(screenElement);
  };

  const showModal = (modalElement) => {
    gameField.appendChild(modalElement);
  };

  const hideModal = (modalElement) => {
    gameField.removeChild(modalElement);
  };

  class AbstractPresenter {
    constructor() {
      if (new.target === AbstractPresenter) {
        throw new Error(`Can't instantiate AbstractPresenter, only concrete one`);
      }
    }

    show() {
      showScreen(this.view.element);
    }
  }

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render(this.template);
    }

    bind() {
    }
  }

  class ScreenErrorView extends AbstractView {
    constructor(error) {
      super();
      this.error = error;
    }

    get template() {
      return `<section class="modal">
              <div class="modal__inner">
                <h2 class="modal__title">Произошла ошибка!</h2>
                <p class="modal__text modal__text--error">
                  ${this.error.name} ${this.error.message} Пожалуйста, перезагрузите страницу.
                </p>
              </div>
            </section>`;
    }
  }

  class ScreenErrorPresenter extends AbstractPresenter {
    constructor(error) {
      super();
      this.view = new ScreenErrorView(error);
    }
  }

  class ModalView extends AbstractView {

    get template() {
      return `<section class="modal">
              <form class="modal__inner">
                <button class="modal__close" type="button">
                  <span class="visually-hidden">Закрыть</span>
                </button>
                <h2 class="modal__title">Подтверждение</h2>
                <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
                <div class="modal__button-wrapper">
                  <button id="confirm-btn" class="modal__btn">Ок</button>
                  <button id="cancel-btn" class="modal__btn">Отмена</button>
                </div>
              </form>
            </section>`;
    }

    get closeModalButton() {
      return this.element.querySelector(`.modal__close`);
    }

    get cancelButton() {
      return this.element.querySelector(`#cancel-btn`);
    }
    get confirmButton() {
      return this.element.querySelector(`#confirm-btn`);
    }

    bind() {
      this.closeModalButton.addEventListener(`click`, this.onCloseModalButtonClick);
      this.cancelButton.addEventListener(`click`, this.onCancelButtonClick);
      this.confirmButton.addEventListener(`click`, this.onConfirmButtonClick);
    }

    removeEventListeners() {
      this.closeModalButton.removeEventListener(`click`, this.onCloseModalButtonClick);
      this.cancelButton.removeEventListener(`click`, this.onCancelButtonClick);
      this.confirmButton.removeEventListener(`click`, this.onConfirmButtonClick);
    }

    onCloseModalButtonClick() {
    }

    onCancelButtonClick() {
    }

    onConfirmButtonClick() {
    }
  }

  const INITIAL_GAME_STATE = Object.freeze({
    lives: 3,
    level: 0,
  });

  const QuestionType = {
    ONE_IMAGE: `tinder-like`,
    TWO_IMAGES: `two-of-two`,
    THREE_IMAGES: `one-of-three`,
  };

  const AnswerType = {
    UNANSWERED: `unknown`,
    CORRECT: `correct`,
    FAST: `fast`,
    SLOW: `slow`,
    WRONG: `wrong`,
  };

  const AnswerTimeType = {
    FAST: 10,
    SLOW: 20,
    LIMIT: 30,
  };

  const ONE_SECOND = 1000;

  const EMPTY_ANSWER_DATA = ``;

  const getStateTemplate = (currentLives) => {
    return (currentLives === undefined) ? ``
      : `<div class="game__timer">00</div>
      <div class="game__lives">
        ${new Array(INITIAL_GAME_STATE.lives - currentLives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`)
          .join(``)}
        ${new Array(currentLives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
      </div>`;
  };

  const getHeaderTemplate = (currentLives) => {
    return `<header class="header">
            <button class="back">
              <span class="visually-hidden">Вернуться к началу</span>
              <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                <use xlink:href="img/sprite.svg#arrow-left"></use>
              </svg>
              <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                <use xlink:href="img/sprite.svg#logo-small"></use>
              </svg>
            </button>
            ${getStateTemplate(currentLives)}
          </header>`;
  };

  const getLevelContentType1Template = (question) => {
    return `<form class="game__content game__content--wide">
            <div class="game__option">
              <img
                src="${question.images[0].data.src}"
                alt="Option 1"
                width="${question.images[0].size.width}"
                height="${question.images[0].size.height}">
              <label class="game__answer  game__answer--photo">
                <input class="visually-hidden" name="question1" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--paint">
                <input class="visually-hidden" name="question1" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
          </form>`;
  };

  const getLevelContentType2Template = (question) => {
    const contentTemplates = [];
    question.images.forEach((image, index) => {
      contentTemplates.push(`<div class="game__option">
                              <img
                                src="${image.data.src}"
                                alt="Option ${index + 1}"
                                width="${image.size.width}"
                                height="${image.size.height}">
                              <label class="game__answer game__answer--photo">
                                <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
                                <span>Фото</span>
                              </label>
                              <label class="game__answer game__answer--paint">
                                <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
                                <span>Рисунок</span>
                              </label>
                            </div>`);
    });
    return `<form class="game__content">
            ${contentTemplates.join(``)}
          </form>`;
  };

  const getLevelContentType3Template = (question) => {
    const contentTemplates = [];
    question.images.forEach((image, index) => {
      contentTemplates.push(`<div class="game__option">
                              <img
                                src="${image.data.src}"
                                alt="Option ${index + 1}"
                                width="${image.size.width}"
                                height="${image.size.height}">
                            </div>`
      );
    });
    return `<form class="game__content game__content--triple">
            ${contentTemplates.join(``)}
          </form>`;
  };

  const LevelContentTemplateMap = {
    [QuestionType.ONE_IMAGE]: getLevelContentType1Template,
    [QuestionType.TWO_IMAGES]: getLevelContentType2Template,
    [QuestionType.THREE_IMAGES]: getLevelContentType3Template,
  };

  const getStatsTemplate = (answers) => {
    const statsContentTemplate = answers.map((answer) => {
      return `<li class="stats__result stats__result--${answer.type}"></li>`;
    });
    return `<ul class="stats">
            ${statsContentTemplate.join(``)}
          </ul>`;
  };

  const getLevelTemplate = (answers, question) => {
    const levelContent = LevelContentTemplateMap[question.type](question);

    return `<section class="game">
            <p class="game__task">${question.description}</p>
            ${levelContent}
            ${getStatsTemplate(answers)}
          </section>`;
  };

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
    for (const questionElement of questionElements) {
      if (questionElement.firstElementChild.src === rightAnswer) {
        addStyleForElement(questionElement);
        return;
      }
    }
  };

  const ElementWithDebugStyleMap = {
    [QuestionType.ONE_IMAGE]: changeStyleDebugElementType1,
    [QuestionType.TWO_IMAGES]: changeStyleDebugElementType2,
    [QuestionType.THREE_IMAGES]: changeStyleDebugElementType3,
  };

  const ElementOpacityValue = {
    MAX: 1,
    MIN: 0,
  };

  class ScreenGameView extends AbstractView {

    constructor(gameState, currentQuestion) {
      super();
      this.gameState = gameState;
      this.currentQuestion = currentQuestion;
    }

    get template() {
      return getHeaderTemplate(this.gameState.lives)
        + getLevelTemplate(this.gameState.answers, this.currentQuestion);
    }

    get gameTimerElement() {
      return this.element.querySelector(`.game__timer`);
    }

    get gameQuestionElements() {
      return this.element.querySelectorAll(`.game__option`);
    }

    bind() {
      const goBackButton = this.element.querySelector(`.back`);

      goBackButton.addEventListener(`click`, () => {
        this.onGoBackButtonClick();
      });

      for (const questionElement of this.gameQuestionElements) {
        questionElement.addEventListener(`click`, (evt) => {
          this.onAnswer(evt);
        });
      }
    }

    updateGameTimer(timeLeft) {
      this.gameTimerElement.textContent = timeLeft;
    }

    switchOpacityOfElement() {
      this.gameTimerElement.style.opacity = (+this.gameTimerElement.style.opacity === ElementOpacityValue.MAX)
        ? ElementOpacityValue.MIN
        : ElementOpacityValue.MAX;
    }

    enableDebugMode() {
      ElementWithDebugStyleMap[this.currentQuestion.type](this.gameQuestionElements, this.currentQuestion.rightAnswer);
    }

    onAnswer() {
    }

    onGoBackButtonClick() {
    }
  }

  const getClone = (currentObject) => {
    return JSON.parse(JSON.stringify(currentObject));
  };

  const toJSON = (data) => data.json();

  const AnswerScoreType = {
    CORRECT: 100,
    FAST: 50,
    SLOW: -50,
    LIFE: 50,
  };

  const GameLevel = {
    MIN: 1,
    MAX: 10,
  };

  const ResultType = {
    RIGHT_ANSWER: `right`,
    FAST_ANSWER: `fast`,
    SLOW_ANSWER: `slow`,
    LIVES_BALANCE: `alive`,
  };

  const ResultTitleMap = {
    [ResultType.RIGHT_ANSWER]: `За правильные ответы`,
    [ResultType.FAST_ANSWER]: `Бонус за скорость`,
    [ResultType.LIVES_BALANCE]: `Бонус за жизни`,
    [ResultType.SLOW_ANSWER]: `Штраф за медлительность`,
  };

  const switchGameLevel = (currentLevel) => {
    if (currentLevel === GameLevel.MAX) {
      return currentLevel;
    }
    return ++currentLevel;
  };

  const calcLivesBalance = (currentLivesBalance, currentAnswer) => {
    return (!currentAnswer.isCorrect || currentAnswer.time >= AnswerTimeType.LIMIT)
      ? --currentLivesBalance : currentLivesBalance;
  };

  const getNewGameState = (currentGameState, currentAnswer) => {
    const newGameState = getClone(currentGameState);
    newGameState.answers[currentAnswer.id] = currentAnswer;
    newGameState.level = switchGameLevel(newGameState.level);
    newGameState.lives = calcLivesBalance(newGameState.lives, currentAnswer);
    return newGameState;
  };

  const isGameEnded = (newGameState, questions) => {
    const isLastLevel = (newGameState.level === questions.length);
    return (isLastLevel || (newGameState.lives < 0));
  };

  const getCorrectAnswerCount = (answers) => {
    return answers.filter((answer) => answer.isCorrect).length;
  };

  const getFastAnswerCount = (answers) => {
    return answers.filter((answer) => answer.type === AnswerType.FAST).length;
  };

  const getSlowAnswerCount = (answers) => {
    return answers.filter((answer) => answer.type === AnswerType.SLOW).length;
  };

  const getTotalPoints = (gameResult) => {
    return gameResult.count * gameResult.points;
  };

  const getGameResults = (finalGameState) => {
    const gameResults = [
      {
        title: ResultTitleMap[ResultType.RIGHT_ANSWER],
        type: ResultType.RIGHT_ANSWER,
        count: getCorrectAnswerCount(finalGameState.answers),
        points: AnswerScoreType.CORRECT,
      },
      {
        title: ResultTitleMap[ResultType.FAST_ANSWER],
        type: ResultType.FAST_ANSWER,
        count: getFastAnswerCount(finalGameState.answers),
        points: AnswerScoreType.FAST,
      },
      {
        title: ResultTitleMap[ResultType.LIVES_BALANCE],
        type: ResultType.LIVES_BALANCE,
        count: finalGameState.lives,
        points: AnswerScoreType.LIFE,
      },
      {
        title: ResultTitleMap[ResultType.SLOW_ANSWER],
        type: ResultType.SLOW_ANSWER,
        count: getSlowAnswerCount(finalGameState.answers),
        points: AnswerScoreType.SLOW,
      },
    ];
    return gameResults;
  };

  const getGameResultTotal = (gameResults) => {
    const totalPoints = gameResults.reduce((sum, type) => {
      return sum + getTotalPoints(type);
    }, 0);

    return totalPoints;
  };

  const END_TIME_VALUE = 0;

  const TIME_TO_FLASH = 5;

  const makeTimer = (limit) => {
    return {
      timeLeft: limit,
      tick() {
        --this.timeLeft;
        if (this.timeLeft <= TIME_TO_FLASH) {
          this.onTimeToFlash();
        }
        if (this.timeLeft === END_TIME_VALUE) {
          this.onTimeElapsed();
        }
      },
      reset() {
        this.timeLeft = limit;
      },
      onTimeElapsed() {
      },
      onTimeToFlash() {
      },
    };
  };

  const FLASH_TIMEOUT = 500;

  class ScreenGamePresenter extends AbstractPresenter {
    constructor(gameModel) {
      super();
      this.gameModel = gameModel;
      this.gameModel.timer.onTimeElapsed = () => {
        this.stopFlash();
        this.gameModel.playerAnswer = EMPTY_ANSWER_DATA;
        this.gameModel.saveAnswerData();
        this.goNextScreen();
      };
      this.gameModel.timer.onTimeToFlash = () => {
        this.startFlash();
      };

      this.view = this.generateView();

      this.modalView = new ModalView();
      this.modalView.onCloseModalButtonClick = () => this.continueGame();
      this.modalView.onCancelButtonClick = () => this.continueGame();
      this.modalView.onConfirmButtonClick = () => this.finishGame();
      this.modalView.show = () => {
        showModal(this.modalView.element);
      };

      this._timeout = null;
    }

    init() {
      this.startTimer();
      this.show();
    }

    startTimer() {
      this._timeout = setTimeout(() => {
        this.gameModel.timer.tick();
        this.view.updateGameTimer(this.gameModel.timer.timeLeft);
        if (this.gameModel.timer.timeLeft <= TIME_TO_FLASH) {
          this.view.switchOpacityOfElement();
        }
        if (!isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
          this.startTimer();
        }
      }, ONE_SECOND);
    }

    stopTimer() {
      clearTimeout(this._timeout);
    }

    startFlash() {
      this._flashTimeout = setTimeout(() => {
        this.view.switchOpacityOfElement();
      }, FLASH_TIMEOUT);
    }

    stopFlash() {
      clearTimeout(this._flashTimeout);
    }

    goNextScreen() {
      if (isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
        this.stopTimer();
        Router.showScreenStats(this.gameModel);
      } else {
        this.gameModel.timer.reset();
        this.view = this.generateView();
        this.show();
      }
    }

    generateView() {
      const view = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
      view.updateGameTimer(this.gameModel.timer.timeLeft);
      view.onGoBackButtonClick = () => this.goBackScreen();
      view.onAnswer = (evt) => {
        this.gameModel.addPlayerAnswer(evt);
        if (this.gameModel.playerAnswer) {
          this.gameModel.saveAnswerData();
          this.goNextScreen();
        }
      };
      {
        view.enableDebugMode();
      }
      return view;
    }

    finishGame() {
      this.modalView.removeEventListeners();
      Router.showScreenGreeting();
    }

    continueGame() {
      this.startTimer();
      hideModal(this.modalView.element);
    }

    goBackScreen() {
      this.stopTimer();
      this.modalView.show();
    }
  }

  const getGreetingTemplate = () => {
    return `<section class="greeting central--blur">
            <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
            <div class="greeting__asterisk asterisk">
              <span class="visually-hidden">
                Я просто красивая звёздочка
              </span>
              *
            </div>
            <div class="greeting__challenge">
              <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
              <p class="greeting__challenge-text">Правила игры просты:</p>
              <ul class="greeting__challenge-list">
                <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
                <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
                <li>Фотореализм обманчив и коварен.</li>
                <li>Помни, главное — смотреть очень внимательно.</li>
              </ul>
            </div>
            <button class="greeting__continue" type="button">
              <span class="visually-hidden">Продолжить</span>
              <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
                <use xlink:href="img/sprite.svg#arrow-right"></use>
              </svg>
            </button>
          </section>`;
  };

  class ScreenGreetingView extends AbstractView {

    get template() {
      return getGreetingTemplate();
    }

    get goNextButton() {
      return this._element.querySelector(`.greeting__continue`);
    }

    bind() {
      this.goNextButton.addEventListener(`click`, this.onGoNextButtonClick);
    }

    removeEventListeners() {
      this.goNextButton.removeEventListener(`click`, this.onGoNextButtonClick);
    }

    onGoNextButtonClick() {
    }
  }

  class ScreenGreetingPresenter extends AbstractPresenter {
    constructor() {
      super();
      this.view = new ScreenGreetingView();
      this.view.onGoNextButtonClick = () => this.goNextScreen();
    }

    goNextScreen() {
      this.view.removeEventListeners();
      Router.showScreenRules();
    }
  }

  class ScreenRulesView extends AbstractView {

    get template() {
      return `<header class="header">
              <button class="back">
                <span class="visually-hidden">Вернуться к началу</span>
                <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                  <use xlink:href="img/sprite.svg#arrow-left"></use>
                </svg>
                <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                  <use xlink:href="img/sprite.svg#logo-small"></use>
                </svg>
              </button>
            </header>
            <section class="rules">
              <h2 class="rules__title">Правила</h2>
              <ul class="rules__description">
                <li>Угадай 10 раз для каждого изображения фото
                  <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
                  <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
                <li>Фотографиями или рисунками могут быть оба изображения.</li>
                <li>На каждую попытку отводится 30 секунд.</li>
                <li>Ошибиться можно не более 3 раз.</li>
              </ul>
              <p class="rules__ready">Готовы?</p>
              <form class="rules__form">
                <input class="rules__input" type="text" placeholder="Ваше Имя">
                <button class="rules__button continue" type="submit" disabled>Go!</button>
              </form>
            </section>`;
    }

    get goNextButton() {
      return this.element.querySelector(`.rules__button`);
    }

    get goBackButton() {
      return this.element.querySelector(`.back`);
    }

    get playerNameInput() {
      return this.element.querySelector(`.rules__input`);
    }

    bind() {
      this.playerNameInput.addEventListener(`input`, this.onPlayerNameInput);
      this.goBackButton.addEventListener(`click`, this.onGoBackButtonClick);
      this.goNextButton.addEventListener(`click`, this.onGoNextButtonClick);
    }

    switchProceedState(canProceed) {
      this.goNextButton.disabled = !canProceed;
    }

    removeEventListeners() {
      this.playerNameInput.removeEventListener(`input`, this.onPlayerNameInput);
      this.goBackButton.removeEventListener(`click`, this.onGoBackButtonClick);
      this.goNextButton.removeEventListener(`click`, this.onGoNextButtonClick);
    }

    onPlayerNameInput() {
    }

    onGoNextButtonClick() {
    }

    onGoBackButtonClick() {
    }
  }

  class ScreenRulesPresenter extends AbstractPresenter {
    constructor() {
      super();
      this.view = new ScreenRulesView();

      this.view.onPlayerNameInput = (evt) => this.switchStateGoNextButton(evt);

      this.view.onGoNextButtonClick = (evt) => {
        evt.preventDefault();
        const playerName = this.getPlayerName();
        this.goScreenGame(playerName);
      };

      this.view.onGoBackButtonClick = () => this.goBackScreen();
    }

    switchStateGoNextButton(evt) {
      const canProceed = evt.target.value ? true : false;
      this.view.switchProceedState(canProceed);
    }

    getPlayerName() {
      const playerNameInput = this.view.element.querySelector(`.rules__input`);
      return playerNameInput.value;
    }

    goScreenGame(playerName) {
      this.view.removeEventListeners();
      Router.showScreenGame(playerName);
    }

    goBackScreen() {
      this.view.removeEventListeners();
      Router.showScreenGreeting();
    }

  }

  const getIntroTemplate = () => {
    return `<section class="intro">
            <button class="intro__asterisk asterisk" type="button">
              <span class="visually-hidden">
                Продолжить
              </span>
              *
            </button>
            <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
          </section>`;
  };

  const TRANSITION_STYLE_VALUE = `opacity 2s linear`;

  const OpacityStyleValue = {
    SHOW: `1`,
    HIDE: `0`,
  };

  const GreetingElementStyle = {
    POSITION: `absolute`,
    TOP: `5%`,
    LEFT: `10%`,
  };

  class ScreenStartView extends AbstractView {

    get template() {
      return getIntroTemplate() + getGreetingTemplate();
    }

    get introElement() {
      return this._element.querySelector(`.intro`);
    }

    get greetingElement() {
      return this._element.querySelector(`.greeting`);
    }

    get goNextButton() {
      return this._element.querySelector(`.greeting__continue`);
    }

    bind() {
      this.goNextButton.addEventListener(`click`, this.onGoNextButtonClick);
      this.greetingElement.style.opacity = OpacityStyleValue.HIDE;
      this.greetingElement.style.position = GreetingElementStyle.POSITION;
      this.greetingElement.style.top = GreetingElementStyle.TOP;
      this.greetingElement.style.left = GreetingElementStyle.LEFT;
    }

    showGreeting() {
      this.greetingElement.style.opacity = OpacityStyleValue.SHOW;
      this.greetingElement.style.transition = TRANSITION_STYLE_VALUE;
    }

    hideIntro() {
      this.introElement.style.opacity = OpacityStyleValue.HIDE;
      this.introElement.style.transition = TRANSITION_STYLE_VALUE;
    }

    removeEventListeners() {
      this.goNextButton.removeEventListener(`click`, this.onGoNextButtonClick);
    }

    onGoNextButtonClick() {
    }
  }

  class ScreenStartPresenter extends AbstractPresenter {
    constructor() {
      super();
      this.view = new ScreenStartView();
      this.view.onGoNextButtonClick = () => this.goNextScreen();
    }

    goNextScreen() {
      this.view.removeEventListeners();
      Router.showScreenRules();
    }

    onDataLoad() {
      this.view.hideIntro();
      this.view.showGreeting();
    }
  }

  const getResultTemplate = (result) => {
    return `<tr>
            <td></td>
            <td class="result__extra">${result.title}:</td>
            <td class="result__extra">${result.count} <span class="stats__result stats__result--${result.type}"></span></td>
            <td class="result__points">× ${Math.abs(result.points)}</td>
            <td class="result__total">${getTotalPoints(result)}</td>
          </tr>`;
  };

  const getResultTemplates = (gameResults) => {
    return gameResults.filter((result) => {
      return (result.type !== ResultType.RIGHT_ANSWER && getTotalPoints(result) !== 0);
    }).map((result) => {
      return getResultTemplate(result);
    });
  };

  const getTotalPointsTemplate = (isGamePassed, gameResults) => {
    return isGamePassed
      ? `<td class="result__points">× ${gameResults[0].points}</td>
      <td class="result__total">${getTotalPoints(gameResults[0])}</td>`
      : `<td class="result__total  result__total--final">fail</td>`;
  };

  const getFinalScoreTemplate = (isGamePassed, resultTemplates, gameResultTotal) => {
    return isGamePassed
      ? `${resultTemplates.join(``)}
      <tr>
        <td colspan="5" class="result__total result__total--final">${gameResultTotal}</td>
      </tr>`
      : ``;
  };

  const getResultTableTemplates = (finalGameStates) => {
    return finalGameStates.map((gameState, index) => {
      const isGamePassed = (gameState.lives >= 0);
      const gameResults = getGameResults(gameState);
      const gameResultTotal = getGameResultTotal(gameResults);
      const resultTemplates = getResultTemplates(gameResults);
      const totalPointsTemplate = getTotalPointsTemplate(isGamePassed, gameResults);
      const finalScoreTemplate = getFinalScoreTemplate(isGamePassed, resultTemplates, gameResultTotal);

      return `<table class="result__table">
              <tr>
                <td class="result__number">${index + 1}.</td>
                <td class="result__stats" colspan="2">
                ${getStatsTemplate(gameState.answers)}
                </td>
                ${totalPointsTemplate}
              </tr>
              ${finalScoreTemplate}
            </table>`;
    });
  };

  const getResultScreenTemplate = (finalGameStates) => {
    const lastGame = finalGameStates[finalGameStates.length - 1];
    const isLastGamePassed = (lastGame.lives >= 0);
    const gameStatusTitle = isLastGamePassed ? `Победа!` : `Увы.. Попробуйте еще раз`;

    return `<section class="result">
            <h2 class="result__title">${gameStatusTitle}</h2>
            ${getResultTableTemplates(finalGameStates).reverse().join(``)}
          </section>`;
  };

  class ScreenStatsView extends AbstractView {

    constructor(finalGameState) {
      super();
      this.finalGameState = finalGameState;
    }

    get template() {
      return getHeaderTemplate() + getResultScreenTemplate(this.finalGameState);
    }

    get goBackButton() {
      return this.element.querySelector(`.back`);
    }

    bind() {
      this.goBackButton.addEventListener(`click`, this.onGoBackButtonClick);
    }

    removeEventListeners() {
      this.goBackButton.removeEventListener(`click`, this.onGoBackButtonClick);
    }

    onGoBackButtonClick() {
    }
  }

  class ScreenStatsPresenter extends AbstractPresenter {
    constructor(finalGameState) {
      super();
      this.view = new ScreenStatsView(finalGameState);
      this.view.onGoBackButtonClick = () => this.goBackScreen();
    }

    goBackScreen() {
      this.view.removeEventListeners();
      Router.showScreenGreeting();
    }
  }

  const getPlayerAnswerType1 = () => {
    const playerAnswers = document.querySelectorAll(`input[type=radio]:checked`);
    return (playerAnswers.length === 1) ? playerAnswers[0].value : false;
  };

  const getPlayerAnswerType2 = () => {
    const playerAnswers = document.querySelectorAll(`input[type=radio]:checked`);
    return (playerAnswers.length === 2) ? (`${playerAnswers[0].value}-${playerAnswers[1].value}`) : false;
  };

  const getPlayerAnswerType3 = (evt) => {
    const playerAnswer = evt.target.src || evt.target.querySelector(`img`).src;
    return (playerAnswer) ? playerAnswer : false;
  };

  const PlayerAnswerTypeMap = {
    [QuestionType.ONE_IMAGE]: getPlayerAnswerType1,
    [QuestionType.TWO_IMAGES]: getPlayerAnswerType2,
    [QuestionType.THREE_IMAGES]: getPlayerAnswerType3,
  };

  const checkPlayerAnswer = (playerAnswer, rightAnswer) => {
    return playerAnswer === rightAnswer;
  };

  const saveAnswerData = (currentGameLevel, answerKind, timeLeft) => {
    const answerTime = AnswerTimeType.LIMIT - timeLeft;
    const answerData = {
      id: currentGameLevel,
      isCorrect: answerKind,
      time: answerTime,
      type: AnswerType.UNANSWERED,
      defineType() {
        if (this.isCorrect === EMPTY_ANSWER_DATA) {
          return;
        }
        if (this.isCorrect && this.time <= AnswerTimeType.FAST) {
          this.type = AnswerType.FAST;
          return;
        }
        if (this.isCorrect && this.time > AnswerTimeType.SLOW) {
          this.type = AnswerType.SLOW;
          return;
        }
        this.type = (this.isCorrect) ? AnswerType.CORRECT : AnswerType.WRONG;
      },
    };
    answerData.defineType();
    return answerData;
  };

  class GameModel {
    constructor(playerName, questions) {
      this.playerName = playerName;
      this.questions = questions;
      this.timer = makeTimer(AnswerTimeType.LIMIT);
      this.defaultAnswers = this.questions.map((name, index) => {
        return saveAnswerData(index, EMPTY_ANSWER_DATA, EMPTY_ANSWER_DATA);
      });
      this.currentState = Object.assign({}, this.initialState, {
        answers: this.defaultAnswers
      });
      this.currentQuestion = this.questions[this.currentState.level];
    }

    get initialState() {
      return Object.freeze(INITIAL_GAME_STATE);
    }

    saveAnswerData() {
      const answerKind = checkPlayerAnswer(this.playerAnswer, this.currentQuestion.rightAnswer);
      this.answerData = saveAnswerData(this.currentState.level, answerKind, this.timer.timeLeft);
      this.updateState();
    }

    updateState() {
      this.currentState = getNewGameState(this.currentState, this.answerData);
      this.updateCurrentQuestion();
    }

    updateCurrentQuestion() {
      this.currentQuestion = this.questions[this.currentState.level];
    }

    addPlayerAnswer(evt) {
      this.playerAnswer = PlayerAnswerTypeMap[this.currentQuestion.type](evt);
    }

  }

  const resize = (frameData, imageData) => {
    const ratioWidth = frameData.width / imageData.width;
    const ratioHeight = frameData.height / imageData.height;
    const ratioMinimal = Math.min(ratioWidth, ratioHeight);
    const width = Math.floor(imageData.width * ratioMinimal);
    const height = Math.floor(imageData.height * ratioMinimal);
    return {width, height};
  };

  const getErrorAtLoadImage = (imageUrl) => {
    return {
      name: `Не удалось загрузить картинку`,
      message: imageUrl,
    };
  };

  const ImageSizeMap = {
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

  const ImageTypeMap = {
    'painting': `paint`,
    'photo': `photo`,
  };

  const RightAnswerTypeMap = {
    'рисунок': `painting`,
    'фото': `photo`,
  };

  const adaptServerQuestionsData = (serverQuestionsData) => {
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

  const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
  const APP_ID = 22101985;

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  };

  class GameDataLoader {
    static loadData() {
      return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerQuestionsData);
    }

    static loadResults(playerName) {
      return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`).then(checkStatus).then(toJSON);
    }

    static saveResults(finalGameState, playerName) {
      finalGameState = Object.assign({playerName}, finalGameState);
      const requestSettings = {
        body: JSON.stringify(finalGameState),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };
      return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`, requestSettings).then(checkStatus);
    }
  }

  let questionsData;

  class Router {
    static showScreenStart() {
      const screenGreeting = new ScreenStartPresenter();
      screenGreeting.show();
      GameDataLoader.loadData().
      then((data) => {
        questionsData = data;
      }).
      catch(Router.showScreenError);
      window.onload = () => {
        screenGreeting.onDataLoad();
      };
    }

    static showScreenGreeting() {
      const screenGreeting = new ScreenGreetingPresenter();
      screenGreeting.show();
    }

    static showScreenRules() {
      const screenRules = new ScreenRulesPresenter();
      screenRules.show();
    }

    static showScreenGame(playerName) {
      const gameModel = new GameModel(playerName, questionsData);
      const game = new ScreenGamePresenter(gameModel);
      game.init();
    }

    static showScreenStats(gameModel) {
      const playerName = gameModel.playerName;
      const finalGameState = gameModel.currentState;
      GameDataLoader.saveResults(finalGameState, playerName).
        then(() => GameDataLoader.loadResults(playerName)).
        then((data) => {
          const screenStatsLevel = new ScreenStatsPresenter(data);
          screenStatsLevel.show();
        }).
        catch(Router.showScreenError);
    }

    static showScreenError(error) {
      const screenError = new ScreenErrorPresenter(error);
      screenError.show();
    }
  }

  Router.showScreenStart();

}());

//# sourceMappingURL=main.js.map
