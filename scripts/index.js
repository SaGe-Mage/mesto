const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__add-button');
const buttonCloseEdit = document.querySelector('.popup__close-button_place_edit');
const buttonCloseAdd = document.querySelector('.popup__close-button_place_add');
const buttonClosePic = document.querySelector('.popup__close-button_place_pic');
const popupEdit = document.querySelector('.popup_place_edit');
const popupAdd = document.querySelector('.popup_place_add');
const popupPic = document.querySelector('.popup_place_pic');
const submitButtonEdit = document.querySelector('.popup__content_place_edit');
const submitButtonAdd = document.querySelector('.popup__content_place_add');
const gallery = document.querySelector('.gallery');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const nameNew = document.querySelector('.popup__input_place_name');
const aboutNew = document.querySelector('.popup__input_place_about');
const place = document.querySelector('.popup__input_place_location');
const link = document.querySelector('.popup__input_place_link');

import {
  FormValidator
} from './FormValidator.js';
import {
  Card
} from './Card.js';
import {
  initialCards,
  validationConfig
} from './data.js';

function addListener(item) {
  item.addEventListener('mousedown', closeClickOverlay);
  document.addEventListener('keydown', closeKeyOverlay);
}

function removeListener(item) {
  item.removeEventListener('mousedown', closeClickOverlay);
  document.removeEventListener('keydown', closeKeyOverlay);
}

function closeClickOverlay(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    popupClose(event.target);
  }
}

function closeKeyOverlay(event) {
  const ESC_CODE = 27;
  if (event.keyCode === ESC_CODE) {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
}

export function popupOpen(popup) {
  addListener(popup);
  popup.classList.add('popup_is-opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_is-opened');
  removeListener(popup);
}

function saveData(event) {
  event.preventDefault();

  name.textContent = nameNew.value;
  about.textContent = aboutNew.value;

  popupClose(popupEdit);
}

function newCard(event) {
  event.preventDefault();

  const data = {};
  data.name = place.value;
  data.link = link.value;

  const card = new Card(data, '#elements-template');
  const cardElement = card.generateCard();

  gallery.prepend(cardElement);

  popupClose(popupAdd);
}

buttonOpenEdit.addEventListener('click', () => {
  nameNew.value = name.textContent;
  aboutNew.value = about.textContent;
  popupOpen(popupEdit);
});
buttonOpenAdd.addEventListener('click', () => {
  const button = popupAdd.querySelector('.popup__button_place_add')
  place.value = '';
  link.value = '';
  button.classList.add('popup__button_inactive');
  button.setAttribute('disabled', true);
  popupOpen(popupAdd);
});
buttonCloseEdit.addEventListener('click', () => popupClose(popupEdit));
buttonCloseAdd.addEventListener('click', () => popupClose(popupAdd));
buttonClosePic.addEventListener('click', () => popupClose(popupPic));
submitButtonEdit.addEventListener('submit', saveData);
submitButtonAdd.addEventListener('submit', newCard);


initialCards.forEach((item) => {
  const card = new Card(item, '#elements-template');
  const cardElement = card.generateCard();

  gallery.prepend(cardElement);
});

Array.from(document.querySelectorAll('.popup__content')).forEach((item) => {
  const validator = new FormValidator(validationConfig, item);
  validator.enableValidation();
});