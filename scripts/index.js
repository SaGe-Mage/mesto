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
const elementsTemplate = document.querySelector('#elements-template');
const pic = popupPic.querySelector('.popup__pic');
const capture = popupPic.querySelector('.popup_caption');
const place = document.querySelector('.popup__input_place_location');
const link = document.querySelector('.popup__input_place_link');

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
  const element = elementsTemplate.content.cloneNode(true);

  element.querySelector('.element__pic').src = link;
  element.querySelector('.element__pic').alt = name;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__delete').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__pic').addEventListener('click', evt => {
    pic.setAttribute('src', link);
    capture.textContent = name;

    popupOpen(popupPic);
  });

  element.querySelector('.element__like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  });

  gallery.prepend(element);
}

function newCard(event) {
  event.preventDefault();

  addCard(place.value, link.value);

  popupClose(popupAdd);
}

buttonOpenEdit.addEventListener('click', () => {
  nameNew.value = name.textContent;
  aboutNew.value = about.textContent;
  popupOpen(popupEdit)
});
buttonOpenAdd.addEventListener('click', () => {
  place.value = '';
  link.value = '';
  popupOpen(popupAdd)
});
buttonCloseEdit.addEventListener('click', () => popupClose(popupEdit));
buttonCloseAdd.addEventListener('click', () => popupClose(popupAdd));
buttonClosePic.addEventListener('click', () => popupClose(popupPic));
submitButtonEdit.addEventListener('submit', saveData);
submitButtonAdd.addEventListener('submit', newCard);


initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});