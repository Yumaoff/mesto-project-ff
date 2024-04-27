const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const latinCyrillicRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;

const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.type === 'text') {
    if (!inputElement.validity.valid || !latinCyrillicRegex.test(inputElement.value)) {
      if (inputElement.validity.patternMismatch || !latinCyrillicRegex.test(inputElement.value)) {
        const errorMessage = inputElement.dataset.errorMessage || 'Ошибка ввода';
        showInputError(formElement, inputElement, errorMessage, settings);
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
      }
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  }
};

const setValidationListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, settings);
      checkInputValidity(formElement, inputElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const buttonElement = formElement.querySelector(settings.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, settings);
      }
    });
    setValidationListeners(formElement, settings);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    if (inputElement.type === 'text') {
      return !inputElement.validity.valid || !latinCyrillicRegex.test(inputElement.value);
    } else {
      return !inputElement.validity.valid;
    }
  });
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });
};


export { enableValidation, clearValidation, validationSettings, toggleButtonState };