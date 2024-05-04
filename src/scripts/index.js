import "../pages/index.css";
import { initialCards } from "./cards.js";
import { addNewCard, createCard, deleteCard, likeCard } from "./card.js";
import {
  openModal,
  closeModal,
} from "./modal.js";
import { enableValidation, validationSettings, toggleButtonState} from "./validation.js";
import {getUserInfoApi, getCardsApi, editProfileApi} from "./api.js";

//используемые переменные
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const cardList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const editProfileForm = document.querySelector(".popup_type_edit");
const newPlacePopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const fillName = editProfileForm.querySelector(".popup__input_type_name");
const fillDescription = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const typeCardName = newPlacePopup.querySelector(
  ".popup__input_type_card-name"
);
const typeCardLink = newPlacePopup.querySelector(".popup__input_type_url");
const cardTemplate = document.querySelector("#card-template").content;

Promise.all([getCardsApi(), getUserInfoApi()])
.then(([cards, userInfo]) => {
  refreshProfileData(userInfo);
  cards.forEach(card => showCard(card, deleteCard, imagePopupOpen, likeCard, userInfo));
})
.catch(error => {
  console.error("Ошибка при загрузке картчоек или получении данных о пользователе: ", error);

})

function refreshProfileData (userInfo) {
  name.textContent = userInfo.name;
  profession.textContent = userInfo.about;
  avatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = fillName.value;
  const newAbout = fillDescription.value;

  editProfileApi(newName, newAbout)
    .then(() => {
      return getUserInfoApi();
    })
    .then(userInfo => {
      refreshProfileData(userInfo);
      closeModal(editProfileForm);
    })
    .catch(error => {
      console.error("Ошибка при обновлении профиля: ", error);
    });
}

function fillProfile() {
  fillName.value = name.textContent;
  fillDescription.value = profession.textContent;
}

function clearFormInputs(nameInput, linkInput) {
  nameInput.value = "";
  linkInput.value = "";
  const formElement = nameInput.form;
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSettings);
}

function showCard(card, deleteCard) {
  const cardElement = createCard(card, deleteCard, imagePopupOpen, likeCard);
  cardList.append(cardElement);
}

function imagePopupOpen(card) {
  openModal(cardImagePopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

function setEventListenerOpenModal(button, popup) {
  if (popup === editProfileForm) {
    button.addEventListener("click", function () {
      openModal(popup);
      fillProfile();
    });
  }
  else if (popup === newPlacePopup) {
    button.addEventListener("click", function () {
      clearFormInputs(cardNameInput, cardUrlInput);
      openModal(popup);
    });
  }
  else {
    button.addEventListener("click", () => openModal(popup));
  }
}

function setCloseModalEventListener(popupCloseButton) {
  const popup = popupCloseButton.closest(".popup");

  popupCloseButton.addEventListener("click", () => {
    closeModal(popup);
  });
}

editProfileForm.addEventListener("submit", handleFormSubmit);
newPlacePopup.addEventListener("submit", addNewCard);

popupCloseButtons.forEach(setCloseModalEventListener);

setEventListenerOpenModal(editProfileButton, editProfileForm);
setEventListenerOpenModal(newPlaceButton, newPlacePopup, newPlaceButton);

export {
  typeCardLink,
  typeCardName,
  newPlacePopup,
  cardTemplate,
  showCard,
  cardList,
  clearFormInputs,
  imagePopupOpen,
};

enableValidation(validationSettings); 