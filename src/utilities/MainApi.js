import { NEWS_API, BASE_API } from './constants';

export const getSavedArticles = (token) => {
  return fetch(`${NEWS_API}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveArticle = (article, token) => {
  return fetch(`${NEWS_API}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article,
    }),
  });
};

export const deleteArticle = (articleId, token) => {
  return fetch(`${NEWS_API}/articles/${articleId}`, {
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
