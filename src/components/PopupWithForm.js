import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._callback = submitCallback;
    this._button = this._popup.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
  }

  getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    const formValues = {};

    this._inputList.forEach(element => {
      formValues[element.name] = element.value;
    });
    return formValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__content');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callback(this.getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
