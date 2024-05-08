const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "5611efb9-d8eb-47cc-991d-f60206142d72",
    "Content-Type": "application/json",
  },
};

// проверка статуса ответа
function isOk(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка запроса: ${res.status}`);
}

// запрос информации о пользователе
const getUserInfoApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(isOk)
    .catch((error) => {
      console.error("Ошибка при получении информации о пользователе: ", error);
    });
};

// запрос существующих карточек на сервере
const getCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(isOk)
    .catch((error) => {
      console.error("Ошибка при получении списка карточек: ", error);
    });
};

// изменени профиля
const editProfileApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(isOk);
};

// добавление карточки
const addCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(isOk);
};

// удаление карточки
const deleteCardApi = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(isOk);
};

// установка лайка
const likeApi = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(isOk)
    .catch((error) => {
      console.error("Ошибка при постановке лайка: ", error);
    });
};

// снятие лайка
const unlikeApi = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(isOk)
    .catch((error) => {
      console.error("Ошибка при снятии лайка: ", error);
    });
};

// смена аватара
const changeAvatarApi = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(isOk)
    .catch((error) => {
      console.error("Ошибка при смене аватара: ", error);
    });
};

export {
  getUserInfoApi,
  getCardsApi,
  editProfileApi,
  addCardApi,
  deleteCardApi,
  likeApi,
  unlikeApi,
  changeAvatarApi,
};
