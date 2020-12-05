import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
	constructor(popupSelector, api, card) {
		super(popupSelector);
		this._formElement = this._popup.querySelector('.popup__content');
		this._api = api;
		this._card = card;
	}

	_setEventListeners() {
		super._setEventListeners();

		function deleteHandler(event) {
			event.preventDefault();
			this._api.deleteCard(this._card._id)
				.then((data) => {
					document.getElementById(this._card._id).remove();
				});
			this._formElement.removeEventListener('submit', deleteHandler);
			this.close();
		}
		this._formElement.addEventListener('submit', deleteHandler.bind(this));
	}
}