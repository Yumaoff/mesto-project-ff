import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, closeModalOnOverlayClick, closeModalOnEscape} from './modal.js';

const cardList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const newPlaceButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editProfileForm = document.querySelector('.popup_type_edit');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const cardImagePopup = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');

function showCard(card, deleteCard) {
  const cardElement = createCard(card, deleteCard, imagePopupOpen);
  cardList.append(cardElement);
};

for (let i = 0; i < initialCards.length; i++) {
  showCard(initialCards[i], deleteCard);
};

export function imagePopupOpen(card) {
  openModal(cardImagePopup);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
};

function setEventListenerOpenModal(button, popup) {
  button.addEventListener('click', () => openModal(popup))
};

function setCloseModalEventListener(popupCloseButton) {  
  const popup = popupCloseButton.closest('.popup');
  
  popupCloseButton.addEventListener('click', () => {
    closeModal(popup);
  });
}

popupCloseButtons.forEach(setCloseModalEventListener);

document.addEventListener('click', closeModalOnOverlayClick);
document.addEventListener('keydown', closeModalOnEscape);

setEventListenerOpenModal(editProfileButton, editProfileForm);
setEventListenerOpenModal(newPlaceButton, newPlacePopup);

