export const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup_input-error_active'
};

export const apiOption = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/',
	headers: {
		authorization: 'c769d20f-6915-4a77-9f12-54820513a0a5',
		'Content-Type': 'application/json'
	}
}

export const ESC_CODE = 27;