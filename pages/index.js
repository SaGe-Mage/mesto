import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  initialCards,
  validationConfig
} from '../utils/data.js';
import {
  buttonOpenAdd,
  buttonOpenEdit,
  popupEdit,
  popupAdd,
  formEdit,
  formAdd,
  gallery,
  name,
  about,
  nameNew,
  aboutNew,
  place,
  link,
  popupPic
} from '../utils/dom.js'

function renderCard(data) {
  const card = new Card(data, '#elements-template', (name, link) => {
    imagePopup.open({
      name: name,
      link: link
    });
  });
  return card;
}

const imagePopup = new PopupWithImage(popupPic);
imagePopup.setEventListeners();

const myList = new Section({
  items: initialCards,
  renderer: item => {
    const card = renderCard(item);
    const cardElement = card.generateCard();
    myList.addItem(cardElement);
  }
}, gallery);

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about'
});

const popupEditForm = new PopupWithForm(popupEdit, inputValues => {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
  popupEditForm.close();
});

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(popupAdd, inputValues => {
  const card = renderCard(inputValues);
  const cardElement = card.generateCard();
  myList.addItem(cardElement);
  popupAddForm.close();
});

popupAddForm.setEventListeners();

myList.renderItems();

const validatorEdit = new FormValidator(validationConfig, formEdit);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(validationConfig, formAdd);
validatorAdd.enableValidation();


buttonOpenEdit.addEventListener('click', () => {
  nameNew.value = name.textContent;
  aboutNew.value = about.textContent;
  popupEditForm.open();
});

buttonOpenAdd.addEventListener('click', () => {
  const button = popupAdd.querySelector('.popup__button_place_add')
  place.value = '';
  link.value = '';
  button.classList.add('popup__button_inactive');
  button.setAttribute('disabled', 'true');
  popupAddForm.open();
});