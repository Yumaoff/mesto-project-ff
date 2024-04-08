function deleteCard (element) {
  element.remove();
}

function createCard(card, deleteCard, imagePopupOpen) {
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

  cardImage.addEventListener('click', () => imagePopupOpen(card));

  return cardElement;
};

export {deleteCard, createCard};