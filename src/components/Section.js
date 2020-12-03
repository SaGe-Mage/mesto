export default class Section {
	constructor({renderer}, containerSelector) {
		this._renderer = renderer;
		this._container = containerSelector;
	}

	addItem(element) {
		this._container.prepend(element);
	}

	renderItems(cards) {
		cards.then((data) => {
			data.forEach(element => {
				this._renderer(element);
			});
		})
			.catch((err) => console.log(`Что-то пошло не так: ${err}`));
	}
}