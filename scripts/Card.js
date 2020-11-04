import {
  popupOpen
} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const picture = this._element.querySelector('.element__pic');

    picture.src = this._link;
    picture.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _handleDeleteCard() {
    this._element.closest('.element').remove();
  }

  _handleLike(event) {
    event.target.classList.toggle('element__like_active');
  }

  _handleOpenPopup() {
    const pic = document.querySelector('.popup__pic');

    pic.setAttribute('src', this._link);
    pic.setAttribute('alt', this._name);
    document.querySelector('.popup_caption').textContent = this._name;

    popupOpen(document.querySelector('.popup_place_pic'));
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._handleLike(event);
    });
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}