import {
  typeCardLink,
  typeCardName,
  newPlacePopup,
  cardList,
  imagePopupOpen,
  clearFormInputs,
} from "./index.js";
import { closeModal } from "./modal.js";

function deleteCard(element) {
  element.remove();
}

function createCard(card, deleteCard, imagePopupOpen, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", () => imagePopupOpen(card));

  cardLikeButton.addEventListener("click", (e) => likeCard(e));

  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: typeCardName.value,
    link: typeCardLink.value,
  };

  const newCardElement = createCard(
    newCard,
    deleteCard,
    imagePopupOpen,
    likeCard
  );
  const firstCard = cardList.firstChild;
  cardList.insertBefore(newCardElement, firstCard);
  closeModal(newPlacePopup);
  clearFormInputs(typeCardName, typeCardLink);
}

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { deleteCard, createCard, addNewCard, likeCard };
