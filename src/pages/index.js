import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
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
	popupPic,
	popupDel,
	popupAvatar,
	buttonOpenAvatar,
	formAvatar
} from '../utils/dom.js'

import './index.css';

const api = new Api(apiOption);

function renderCard(data, userData) {
	return new Card(data, api, userData, {
		cardSelector: '#elements-template',
		handleCardClick: (name, link) => {
			imagePopup.open({
				name: name,
				link: link
			})
		},
		handleCardDelete: (event) => {
			deletePopup.open(api, event);
		}
	});
}

const deletePopup = new PopupDeleteCard(popupDel);
deletePopup.setEventListeners();

const cardList = new Section(
	{
		renderer: (cardItem) => {
			api.getUserInfo()
				.then((data) => {
					const card = renderCard(cardItem, data);
					const cardElement = card.generateCard();
					cardList.addItem(cardElement);
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		},
	},
	gallery
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then((value) => {
		userInfo.setUserAvatar(value[0]);
		userInfo.setUserInfo(value[0]);
		cardList.renderItems(value[1])
	})
	.catch((err) => console.log(`Что-то пошло не так: ${err}`));

const userInfo = new UserInfo({
	userNameSelector: '.profile__name',
	userInfoSelector: '.profile__about',
	userAvatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage(popupPic);
imagePopup.setEventListeners();

const popupEditForm = new PopupWithForm(popupEdit, inputValues => {
	popupEditForm.renderLoading(true);
	api.updateUserInfo(inputValues)
		.then((data) => {
			userInfo.setUserInfo(data);
			popupEditForm.close();
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupEditForm.renderLoading(false);
		});
});
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(popupAdd, inputValues => {
	popupAddForm.renderLoading(true);
	api.addNewCard(inputValues)
		.then((card) => {
			api.getUserInfo()
				.then((data) => {
					const newCard = renderCard(card, data);
					const newCardElement = newCard.generateCard();
					cardList.addItem(newCardElement);
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
			popupAddForm.close();
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupAddForm.renderLoading(false);
		});
});
popupAddForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(popupAvatar, inputValues => {
	popupAvatarForm.renderLoading(true);
	api.updateUserAvatar(inputValues.avatar)
		.then((data) => {
			userInfo.setUserAvatar(data);
			popupAvatarForm.close();
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupAvatarForm.renderLoading(false);
		});
});
popupAvatarForm.setEventListeners();

const validatorEdit = new FormValidator(validationConfig, formEdit);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(validationConfig, formAdd);
validatorAdd.enableValidation();

const validatorAvatar = new FormValidator(validationConfig, formAvatar);
validatorAvatar.enableValidation()


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

buttonOpenAvatar.addEventListener('click', () => {
	validatorAvatar.clearingErrors();
	validatorAvatar.disableButton();
	popupAvatarForm.open();
})
