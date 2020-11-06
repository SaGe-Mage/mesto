import {
  ESC_CODE
} from "./data.js";

export function openPopup(popup) {
  addListener(popup);
  popup.classList.add('popup_is-opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  removeListener(popup);
}

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
    closePopup(event.target);
  }
}

function closeKeyOverlay(event) {
  if (event.keyCode === ESC_CODE) {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}