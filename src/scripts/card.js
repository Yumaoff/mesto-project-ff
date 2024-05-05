import {
  typeCardLink,
  typeCardName,
  newPlacePopup,
  cardList,
  cardTemplate,
  imagePopupOpen,
  clearFormInputs,
  showCard,
} from "./index.js";
import { closeModal } from "./modal.js";
import { addCardApi, deleteCardApi } from "./api.js";

function deleteCard(card) {
  card.remove();
  deleteCardApi(card.id)
    .then(res => console.log(res))
    .catch((error) => {
      console.error("Ошибка при удалении карточки: ", error)
    })
}

function createCard(card, deleteCard, imagePopupOpen, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesAmount = cardElement.querySelector(".card__likes-amount");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikesAmount.textContent = card.likes ? card.likes.length : 0;
  cardElement.id = card._id;

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
    likes: []
  };

  addCardApi(newCard.name, newCard.link, newCard.likes)
    .then(res => {
      closeModal(newPlacePopup);
      clearFormInputs(typeCardName, typeCardLink);
      return res.json(); 
    })
    .then(newCardData => {
      const newCardElement = createCard(
        newCardData,
        deleteCard,
        imagePopupOpen,
        likeCard
      );
      const firstCard = cardList.firstChild;
      cardList.insertBefore(newCardElement, firstCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки: ", error)
    });
}

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { deleteCard, createCard, addNewCard, likeCard };
