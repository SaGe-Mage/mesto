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

function renderCard(data) {
	return new Card(data, api, {
		cardSelector: '#elements-template',
		handleCardClick: (name, link) => {
			imagePopup.open({
				name: name,
				link: link
			})
		},
		handleCardDelete: () => {
			const deletePopup = new PopupDeleteCard(popupDel, api, data);
			deletePopup.open();
		}
	});
}

const cardList = new Section(
	{
		renderer: (cardItem) => {
			const card = renderCard(cardItem);
			api.getUserInfo()
				.then((data) => {
					const cardElement = card.generateCard(data);
					cardList.addItem(cardElement);
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		},
	},
	gallery
);

cardList.renderItems(api.getInitialCards());

const userInfo = new UserInfo({
	userNameSelector: '.profile__name',
	userInfoSelector: '.profile__about',
	userAvatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage(popupPic);

const popupEditForm = new PopupWithForm(popupEdit, inputValues => {
	popupEditForm.renderLoading(true);
	api.updateUserInfo(inputValues)
		.then((data) => {
			userInfo.setUserInfo(data);
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupEditForm.renderLoading(false);
			popupEditForm.close();
		});
});

const popupAddForm = new PopupWithForm(popupAdd, inputValues => {
	popupAddForm.renderLoading(true);
	api.addNewCard(inputValues)
		.then((data) => {
			const newCard = renderCard(data);
			api.getUserInfo()
				.then((data) => {
					const newCardElement = newCard.generateCard(data);
					cardList.addItem(newCardElement);
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupAddForm.renderLoading(false);
			popupAddForm.close();
		});
});

const popupAvatarForm = new PopupWithForm(popupAvatar, inputValues => {
	popupAvatarForm.renderLoading(true);
	api.updateUserAvatar(inputValues.avatar)
		.then((data) => {
			userInfo.setUserAvatar(data);
		})
		.catch((err) => console.log(`Что-то пошло не так: ${err}`))
		.finally(() => {
			popupAvatarForm.renderLoading(false);
			popupAvatarForm.close();
		});
});

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

api.getUserInfo()
	.then((data) => {
		userInfo.setUserAvatar(data.avatar);
		userInfo.setUserInfo(data);
	})
	.catch((err) => console.log(`Что-то пошло не так: ${err}`));