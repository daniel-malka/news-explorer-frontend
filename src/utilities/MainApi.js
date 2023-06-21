import { NEWS_API, BASE_API, DEV_API } from './constants';

function _checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const getSavedArticles = (token) => {
  return fetch(`${BASE_API}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveArticle = (Article, token) => {
  return fetch(`${BASE_API}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Article,
    }),
  }).then((res) => _checkResponse(res));
};

export const unsaveArticle = (articleId, token) => {
  return fetch(`${BASE_API}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
/*Auth*/

export const signup = (email, username, password) => {
  return fetch(`${BASE_API}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
};

export const signin = (email, password) => {
  return fetch(`${BASE_API}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_API}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => _checkResponse(res));
};
