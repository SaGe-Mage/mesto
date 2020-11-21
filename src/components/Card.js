export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._handleCardClick = handleCardClick;
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
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}