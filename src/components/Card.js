export default class Card {
	constructor(data, api, userData, {cardSelector, handleCardClick, handleCardDelete}) {
		this._api = api;
		this._id = data._id;
		this._owner = data.owner;
		this._handleCardClick = handleCardClick;
		this._handleDeleteCard = handleCardDelete;
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._userId = userData._id;
		this._cardSelector = cardSelector;
	}

	_getTemplate() {
		return document
			.querySelector(this._cardSelector)
			.content
			.querySelector('.element')
			.cloneNode(true);
	}

	generateCard() {
		this._element = this._getTemplate();

		const picture = this._element.querySelector('.element__pic');

		picture.src = this._link;
		picture.alt = this._name;
		this._element.querySelector('.element__title').textContent = this._name;
		this._element.id = this._id;
		this._element.querySelector('.element__like-count').textContent = `${this._likes.length}`;

		if (this._likes.find((like) => like._id === this._userId)) {
			this._updateLikes().classList.add('element__like_active');
		}


		if (this._userId === this._owner._id) {
			this._element.querySelector('.element__delete').style.display = 'block';
		}

		this._setEventListeners();

		return this._element;
	}

	_handleLike() {
		const likeCount = this._element.querySelector('.element__like-count');

		if (!this._updateLikes().classList.contains('element__like_active')) {
			this._api.likesCard(this._id)
				.then((data) => {
					this._updateLikes().classList.add('element__like_active');
					likeCount.textContent = `${data.likes.length}`;
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		} else {
			this._api.dislikesCard(this._id)
				.then((data) => {
					this._updateLikes().classList.remove('element__like_active');
					likeCount.textContent = `${data.likes.length}`;
				})
				.catch((err) => console.log(`Что-то пошло не так: ${err}`));
		}
	}

	_updateLikes() {
		return this._element.querySelector('.element__like');
	}

	_setEventListeners() {
		this._element.querySelector('.element__delete').addEventListener('click', () => {
			this._handleDeleteCard();
		});
		this._element.querySelector('.element__like').addEventListener('click', () => {
			this._handleLike();
		});
		this._element.querySelector('.element__pic').addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
	}
}