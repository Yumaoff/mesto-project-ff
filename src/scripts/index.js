import '../pages/index.css';

const cardList = document.querySelector('.places__list');

function deleteCard (element) {
  element.remove();
}

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle =  cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });
  return cardElement;
};


function showCard(card, deleteCard) {
  const cardElement = createCard(card, deleteCard);
  cardList.append(cardElement);
};

for (i = 0; i < initialCards.length; i++) {
  showCard(initialCards[i], deleteCard);
};