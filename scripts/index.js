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

function closeKeyOverlay (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
}

function popupOpen(popup) {
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

function createCard(name, link) {
  const element = elementsTemplate.content.cloneNode(true);
  const picture = element.querySelector('.element__pic');

  picture.src = link;
  picture.alt = name;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__delete').addEventListener('click', event => {
    event.target.closest('.element').remove();
  });

  picture.addEventListener('click', () => {
    pic.setAttribute('src', link);
    pic.setAttribute('alt', name);
    capture.textContent = name;

    popupOpen(popupPic);
  });

  element.querySelector('.element__like').addEventListener('click', event => {
    event.target.classList.toggle('element__like_active');
  });

  return element;
}

function addCard(name, link) {
  gallery.prepend(createCard(name, link));
}

function newCard(event) {
  event.preventDefault();

  addCard(place.value, link.value);

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


initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});