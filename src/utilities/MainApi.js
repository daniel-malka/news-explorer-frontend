import { NEWS_API, BASE_API, DEV_API } from './constants';

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
  });
};

export const unsaveArticle = (article, token) => {
  console.log(article);
  return fetch(`${BASE_API}/articles/${article._id}`, {
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
  });
};
