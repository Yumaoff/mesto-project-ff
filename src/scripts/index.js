import "../pages/index.css";
import { initialCards } from "./cards.js";
import { addNewCard, createCard, deleteCard, likeCard } from "./card.js";
import {
  openModal,
  closeModal,
  closeModalOnOverlayClick,
  closeModalOnEscape,
} from "./modal.js";

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
const fillName = editProfileForm.querySelector(".popup__input_type_name");
const fillDescription = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const typeCardName = newPlacePopup.querySelector(
  ".popup__input_type_card-name"
);
const typeCardLink = newPlacePopup.querySelector(".popup__input_type_url");
const cardTemplate = document.querySelector("#card-template").content;

function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = fillName.value;
  profession.textContent = fillDescription.value;
  closeModal(editProfileForm);
}

function fillProfile() {
  fillName.value = name.textContent;
  fillDescription.value = profession.textContent;
}

function clearFormInputs(nameInput, linkInput) {
  nameInput.value = "";
  linkInput.value = "";
}

function showCard(card, deleteCard) {
  const cardElement = createCard(card, deleteCard, imagePopupOpen, likeCard);
  cardList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  showCard(initialCards[i], deleteCard);
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
  } else {
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
setEventListenerOpenModal(newPlaceButton, newPlacePopup);

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
