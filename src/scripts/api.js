


const getUserInfoApi = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me ', {
    method: 'GET',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return result;
  })
};

const getCardsApi = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method: 'GET',
    headers: {
      authorization: '5611efb9-d8eb-47cc-991d-f60206142d72'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return result;
  })
}

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

export {getUserInfoApi, getCardsApi, editProfileApi};