export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }

  disableButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  clearingErrors(){
    this._inputList.forEach((inputElement) => {
      const errorElement = this._getErrorElement(inputElement);
      this._hideInputError(errorElement, inputElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _isValid(inputElement) {
    const errorElement = this._getErrorElement(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  _showInputError(errorElement, inputElement, errorMessage) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
}