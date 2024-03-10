// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

function deleteCard (element) {
  element.remove();
}

function showCard(name, link, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardList.append(cardElement);
  cardDeleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });
};

for (i = 0; i < initialCards.length; i++) {
  showCard(initialCards[i].name,initialCards[i].link, deleteCard);
};