const buttenOpen = document.querySelector(".profile__edit-button");
const buttenClose = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const submitButton = document.querySelector(".popup__button");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__about");
let nameNew = document.querySelector(".popup__name");
let aboutNew = document.querySelector(".popup__about");

function popupToggle() {
  popup.classList.toggle("popup_is-opened");
  nameNew.value = name.textContent;
  aboutNew.value = about.textContent;
}

function saveData(event) {
  name.textContent = nameNew.value;
  about.textContent = aboutNew.value;
  popup.classList.toggle("popup_is-opened");
}

buttenOpen.addEventListener("click", popupToggle);
buttenClose.addEventListener("click", popupToggle);
submitButton.addEventListener("click", saveData);