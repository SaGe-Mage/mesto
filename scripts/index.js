const buttenOpenEdit = document.querySelector('.profile__edit-button');
const buttenOpenAdd = document.querySelector('.profile__add-button');
const buttenCloseEdit = document.querySelector('.popup__close-button_place_edit');
const buttenCloseAdd = document.querySelector('.popup__close-button_place_add');
const popupEdit = document.querySelector('.popup_place_edit');
const popupAdd = document.querySelector('.popup_place_add');
const submitButtonEdit = document.querySelector('.popup__content_place_edit');
const submitButtonAdd = document.querySelector('.popup__content_place_add');
const gallery = document.querySelector('.gallery');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let nameNew = document.querySelector('.popup__input_place_name');
let aboutNew = document.querySelector('.popup__input_place_about');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpen(popup) {
  popup.classList.add('popup_is-opened');
  
  if (popup.classList.contains('popup_place_edit')) {
    nameNew.value = name.textContent;
    aboutNew.value = about.textContent;
  }
}

function popupClose(popup) {
  popup.classList.remove('popup_is-opened');
}

function saveData(event) {
  event.preventDefault();

  name.textContent = nameNew.value;
  about.textContent = aboutNew.value;

  popupClose(popupEdit);
}

function addCard(name, link) {
  const elementsTemplate = document.querySelector('#elements-template').content;
  const element = elementsTemplate.cloneNode(true);

  element.querySelector('.element__pic').src = link;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__delete').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  element.querySelector('.element__like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  });

  gallery.prepend(element);
}

function newCard(event) {
  event.preventDefault();

  let location = document.querySelector('.popup__input_place_location');
  let link = document.querySelector('.popup__input_place_link');

  addCard(location.value, link.value);
  
  location.value = '';
  link.value = '';
  
  popupClose(popupAdd);
}

buttenOpenEdit.addEventListener('click', () => popupOpen(popupEdit));
buttenOpenAdd.addEventListener('click', () => popupOpen(popupAdd));
buttenCloseEdit.addEventListener('click',() => popupClose(popupEdit));
buttenCloseAdd.addEventListener('click',() => popupClose(popupAdd));
submitButtonEdit.addEventListener('submit', saveData);
submitButtonAdd.addEventListener('submit', newCard);


initialCards.forEach(function(item) {
  addCard(item.name, item.link);
});