import {
  FormValidator
} from './FormValidator.js';
import {
  Card
} from './Card.js';
import {
  initialCards,
  validationConfig,
  popupPic
} from './data.js';
import {
  openPopup,
  closePopup
} from './utils.js';

const buttonOpenEdit = document.querySelector('.profile__edit-button');
const buttonOpenAdd = document.querySelector('.profile__add-button');
const buttonCloseEdit = document.querySelector('.popup__close-button_place_edit');
const buttonCloseAdd = document.querySelector('.popup__close-button_place_add');
const buttonClosePic = document.querySelector('.popup__close-button_place_pic');
const popupEdit = document.querySelector('.popup_place_edit');
const popupAdd = document.querySelector('.popup_place_add');
const formEdit = document.querySelector('.popup__content_place_edit');
const formAdd = document.querySelector('.popup__content_place_add');
const gallery = document.querySelector('.gallery');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const nameNew = document.querySelector('.popup__input_place_name');
const aboutNew = document.querySelector('.popup__input_place_about');
const place = document.querySelector('.popup__input_place_location');
const link = document.querySelector('.popup__input_place_link');
const formList = Array.from(document.querySelectorAll('.popup__content'));

function saveData(event) {
  event.preventDefault();

  name.textContent = nameNew.value;
  about.textContent = aboutNew.value;

  closePopup(popupEdit);
}

function newCard(event) {
  event.preventDefault();

  const data = {};
  data.name = place.value;
  data.link = link.value;

  renderCard(data);
  closePopup(popupAdd);
}

function renderCard(data) {
  const card = new Card(data, '#elements-template');
  const cardElement = card.generateCard();

  gallery.prepend(cardElement);
}

buttonOpenEdit.addEventListener('click', () => {
  nameNew.value = name.textContent;
  aboutNew.value = about.textContent;
  openPopup(popupEdit);
});
buttonOpenAdd.addEventListener('click', () => {
  const button = popupAdd.querySelector('.popup__button_place_add')
  place.value = '';
  link.value = '';
  button.classList.add('popup__button_inactive');
  button.setAttribute('disabled', 'true');
  openPopup(popupAdd);
});
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
buttonClosePic.addEventListener('click', () => closePopup(popupPic));
formEdit.addEventListener('submit', saveData);
formAdd.addEventListener('submit', newCard);


initialCards.forEach((item) => {
  renderCard(item);
});

const validatorEdit = new FormValidator(validationConfig, formEdit);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(validationConfig, formAdd);
validatorAdd.enableValidation();

