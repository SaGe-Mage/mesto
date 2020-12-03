import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
	initialCards,
	validationConfig,
	apiOption
} from '../utils/data.js';
import {
	buttonOpenAdd,
	buttonOpenEdit,
	popupEdit,
	popupAdd,
	formEdit,
	formAdd,
	gallery,
	nameNew,
	aboutNew,
	place,
	link,
	popupPic
} from '../utils/dom.js'

import './index.css';

const api = new Api(apiOption);

function renderCard(data) {
	return new Card(data, '#elements-template', (name, link) => {
		imagePopup.open({
			name: name,
			link: link
		});
	});
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
	userInfoSelector: '.profile__about',
	userAvatarSelector: '.profile__avatar'
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
	const info = userInfo.getUserInfo();
	nameNew.value = info.userName;
	aboutNew.value = info.userInfo;
	validatorEdit.clearingErrors();
	popupEditForm.open();
});

buttonOpenAdd.addEventListener('click', () => {
	place.value = '';
	link.value = '';
	validatorAdd.clearingErrors();
	validatorAdd.disableButton();
	popupAddForm.open();
});

api.getUserInfo()
	.then((data) => {
		userInfo.setUserAvatar(data.avatar);
		userInfo.setUserInfo(data.name, data.about);
	});