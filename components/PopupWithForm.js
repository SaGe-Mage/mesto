import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._callback = submitCallback;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    const formValues = {};

    this._inputList.forEach(element => {
      formValues[element.name] = element.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__content');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._getInputValues());
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
