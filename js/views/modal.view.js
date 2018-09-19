import AbstractView from "./abstract-view";

export default class ModalView extends AbstractView {

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
