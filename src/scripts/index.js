import "../pages/index.css";
import { addNewCard, createCard, deleteCard, likeCard } from "./card.js";
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
} from "./api.js";

//используемые константы
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
const cardList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const changeAvatarPopup = document.querySelector(".popup_type_change-avatar");
const newAvatarLink = document.querySelector("#avatar-input");
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

// редактирование профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const newName = fillName.value;
  const newAbout = fillDescription.value;

  editProfileApi(newName, newAbout)
    .then(() => {
      return getUserInfoApi();
    })
    .then((userInfo) => {
      refreshProfileData(userInfo);
      closeModal(editProfileForm);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля: ", error);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function fillProfile() {
  fillName.value = name.textContent;
  fillDescription.value = profession.textContent;
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
      closeModal(changeAvatarPopup);
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
function showCard(card, deleteCard, imagePopupOpen, likeCard, userInfo) {
  const cardElement = createCard(
    card,
    deleteCard,
    imagePopupOpen,
    likeCard,
    userInfo
  );
  if (card.likes.some((like) => like._id === userInfo._id)) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.classList.add("card__like-button_is-active");
  }

  cardList.append(cardElement);
}

// открытие увеличенной карточки
function imagePopupOpen(card) {
  openModal(cardImagePopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

// установка обработчиков событий
function setEventListenerOpenModal(button, popup) {
  if (popup === editProfileForm) {
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

editProfileForm.addEventListener("submit", handleEditFormSubmit);
newPlacePopup.addEventListener("submit", addNewCard);
changeAvatarPopup.addEventListener("submit", changeAvatar);

popupCloseButtons.forEach(setCloseModalEventListener);

setEventListenerOpenModal(editProfileButton, editProfileForm);
setEventListenerOpenModal(newPlaceButton, newPlacePopup, newPlaceButton);
setEventListenerOpenModal(avatar, changeAvatarPopup);


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
      showCard(card, deleteCard, imagePopupOpen, likeCard, userInfo)
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
  imagePopupOpen,
};

enableValidation(validationSettings);
