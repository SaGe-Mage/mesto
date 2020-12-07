import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._formElement = this._popup.querySelector('.popup__content');
	}

	open(api, card) {
		super.open();
		this._api = api;
		this._card = card;
	}

	setEventListeners() {
		super.setEventListeners();

		function deleteHandler(event) {
			event.preventDefault();
			this._api.deleteCard(this._card._id)
				.then(() => {
					this._card.handleDelete();
				});
			this.close();
		}
		this._formElement.addEventListener('submit', deleteHandler.bind(this));
	}
}