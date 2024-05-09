import {
  cardTemplate,
} from "./index.js";
import { deleteCardApi, likeApi, unlikeApi } from "./api.js";

// удаление карточки
function deleteCard(card) {
  deleteCardApi(card.id)
    .then((res) => {
      console.log(res);
      card.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки: ", error);
    });
}

// создание карточек
function createCard(card, deleteCard, openImagePopup, likeCard, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesAmount = cardElement.querySelector(".card__likes-amount");

  if (userId === card.owner._id) {
    cardDeleteButton.style.display = "block";
  } else {
    cardDeleteButton.style.display = "none";
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikesAmount.textContent = card.likes ? card.likes.length : 0;
  cardElement.id = card._id;

  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", () => openImagePopup(card));

  cardLikeButton.addEventListener("click", (evt) => likeCard(evt, cardElement));

  return cardElement;
}

// функция установки и снятия лайка
function likeCard(evt, cardElement) {
  if (
    evt.target.classList.contains("card__like-button_is-active") &&
    evt.target.classList.contains("card__like-button")
  ) {
    unlikeApi(cardElement.id)
      .then((res) => {
        console.log(res);
        evt.target.classList.toggle("card__like-button_is-active");
        cardElement.querySelector(".card__likes-amount").textContent =
          res.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка лайка: ", error);
      });
  } else if (evt.target.classList.contains("card__like-button")) {
    likeApi(cardElement.id)
      .then((res) => {
        console.log(res);
        evt.target.classList.toggle("card__like-button_is-active");
        cardElement.querySelector(".card__likes-amount").textContent =
          res.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка снятия лайка: ", error);
      });
  }
}

export { deleteCard, createCard, likeCard };
