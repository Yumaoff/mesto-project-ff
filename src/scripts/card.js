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
import { addCardApi, deleteCardApi, likeApi, unlikeApi } from "./api.js";

// удаление карточки
function deleteCard(card) {
  card.remove();
  deleteCardApi(card.id)
    .then((res) => console.log(res))
    .catch((error) => {
      console.error("Ошибка при удалении карточки: ", error);
    });
}

// создание карточек
function createCard(card, deleteCard, imagePopupOpen, likeCard, userInfo) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesAmount = cardElement.querySelector(".card__likes-amount");

  if (userInfo._id === card.owner._id) {
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

  cardImage.addEventListener("click", () => imagePopupOpen(card));

  cardLikeButton.addEventListener("click", (evt) => likeCard(evt, cardElement));

  return cardElement;
}

// добавление новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const newCard = {
    name: typeCardName.value,
    link: typeCardLink.value,
    likes: [],
  };

  addCardApi(newCard.name, newCard.link, newCard.likes)
    .then((res) => {
      closeModal(newPlacePopup);
      clearFormInputs(typeCardName, typeCardLink);
      return res;
    })
    .then((newCardData) => {
      const newCardElement = createCard(
        newCardData,
        deleteCard,
        imagePopupOpen,
        likeCard,
        newCardData.owner
      );
      const firstCard = cardList.firstChild;
      cardList.insertBefore(newCardElement, firstCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки: ", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

// функция установки и снятия лайка
function likeCard(evt, cardElement) {
  if (
    evt.target.classList.contains("card__like-button_is-active") &&
    evt.target.classList.contains("card__like-button")
  ) {
    evt.target.classList.toggle("card__like-button_is-active");
    unlikeApi(cardElement.id)
      .then((res) => {
        console.log(res);
        cardElement.querySelector(".card__likes-amount").textContent =
          res.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка лайка: ", error);
      });
  } else if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
    likeApi(cardElement.id)
      .then((res) => {
        console.log(res);
        cardElement.querySelector(".card__likes-amount").textContent =
          res.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка снятия лайка: ", error);
      });
  }
}

export { deleteCard, createCard, addNewCard, likeCard };
