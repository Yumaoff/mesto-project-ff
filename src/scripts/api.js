

const getUserInfoApi = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'GET',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    console.log(result);
    return result;
  })
  .catch(error => {
    console.error("Ошибка при получении информации о пользователе: ", error);
  });
};

const getCardsApi = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method: 'GET',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    console.log(result);
    return result;
  })
  .catch(error => {
    console.error("Ошибка при получении списка карточек: ", error);
  });
};

const editProfileApi = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

const addCardApi = (name, link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards ', {
    method: 'POST',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

const deleteCardApi = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72'
    }
  })
}



export {getUserInfoApi, getCardsApi, editProfileApi, addCardApi, deleteCardApi};