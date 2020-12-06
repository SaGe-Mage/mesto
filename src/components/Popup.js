import {
  ESC_CODE
} from "../utils/data.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.keyCode === ESC_CODE) {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains('popup_is-opened')) {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector('.popup__close-button');
    buttonClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}