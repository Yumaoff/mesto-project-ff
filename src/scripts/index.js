import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import {
  enableValidation,
  validationSettings,
  toggleButtonState,
} from "./validation.js";
import {
  getUserInfoApi,
  getCardsApi,
  editProfileApi,
  changeAvatarApi,
  addCardApi
} from "./api.js";

//используемые константы
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const cardList = document.querySelector(".places__list");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewPlace = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const newAvatarLink = document.querySelector("#avatar-input");
const formEditProfile = document.querySelector(".popup_type_edit");
const newPlacePopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");
const buttonsClosePopup = document.querySelectorAll(".popup__close");
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const inputFillName = formEditProfile.querySelector(".popup__input_type_name");
const inputFillDescription = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const typeCardName = newPlacePopup.querySelector(
  ".popup__input_type_card-name"
);
const typeCardLink = newPlacePopup.querySelector(".popup__input_type_url");
const cardTemplate = document.querySelector("#card-template").content;

// редактирование профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const newName = inputFillName.value;
  const newAbout = inputFillDescription.value;

  editProfileApi(newName, newAbout)
    .then((userInfo) => {
      refreshProfileData(userInfo);
      closeModal(formEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля: ", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function fillProfile() {
  inputFillName.value = name.textContent;
  inputFillDescription.value = profession.textContent;
}

function changeAvatarLocal(avatarLink) {
  avatar.style.backgroundImage = `url(${avatarLink})`;
}

function changeAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const newAvatar = newAvatarLink.value;

  changeAvatarApi(newAvatar)
    .then((res) => {
      changeAvatarLocal(res.avatar);
      closeModal(popupChangeAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при смене аватара: ", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

// очистка полей ввода
function clearFormInputs(nameInput, linkInput) {
  nameInput.value = "";
  linkInput.value = "";
  const formElement = nameInput.form;
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationSettings);
}

// отображение карточек
function showCard(card, deleteCard, openImagePopup, likeCard, userInfo) {
  const userId = userInfo._id;
  const cardElement = createCard(
    card,
    deleteCard,
    openImagePopup,
    likeCard,
    userId
  );
  if (card.likes.some((like) => like._id === userId)) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.classList.add("card__like-button_is-active");
  }

  cardList.append(cardElement);
}

// добавление новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const newCard = {
    name: typeCardName.value,
    link: typeCardLink.value,
  };

  addCardApi(newCard.name, newCard.link)
    .then((res) => {
      closeModal(newPlacePopup);
      clearFormInputs(typeCardName, typeCardLink);
      return res;
    })
    .then((newCardData) => {
      const newCardElement = createCard(
        newCardData,
        deleteCard,
        openImagePopup,
        likeCard,
        newCardData.owner._id
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

// открытие увеличенной карточки
function openImagePopup(card) {
  openModal(cardImagePopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

// установка обработчиков событий
function setEventListenerOpenModal(button, popup) {
  if (popup === formEditProfile) {
    button.addEventListener("click", function () {
      openModal(popup);
      fillProfile();
    });
  } else if (popup === newPlacePopup) {
    button.addEventListener("click", function () {
      clearFormInputs(cardNameInput, cardUrlInput);
      openModal(popup);
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

formEditProfile.addEventListener("submit", handleEditFormSubmit);
newPlacePopup.addEventListener("submit", addNewCard);
popupChangeAvatar.addEventListener("submit", changeAvatar);

buttonsClosePopup.forEach(setCloseModalEventListener);

setEventListenerOpenModal(buttonOpenPopupProfile, formEditProfile);
setEventListenerOpenModal(buttonOpenPopupNewPlace, newPlacePopup, buttonOpenPopupNewPlace);
setEventListenerOpenModal(avatar, popupChangeAvatar);


// получение информации о карточках и пользователе с сервера
function refreshProfileData(userInfo) {
  name.textContent = userInfo.name;
  profession.textContent = userInfo.about;
  avatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

Promise.all([getCardsApi(), getUserInfoApi()])
  .then(([cards, userInfo]) => {
    refreshProfileData(userInfo);
    cards.forEach((card) =>
      showCard(card, deleteCard, openImagePopup, likeCard, userInfo)
    );
  })
  .catch((error) => {
    console.error(
      "Ошибка при загрузке картчоек или получении данных о пользователе: ",
      error
    );
  });

export {
  typeCardLink,
  typeCardName,
  newPlacePopup,
  cardTemplate,
  showCard,
  cardList,
  clearFormInputs,
  openImagePopup,
};

enableValidation(validationSettings);
