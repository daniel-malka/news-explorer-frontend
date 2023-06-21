import { NEWS_API, API_KEY } from './constants';

class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _customFetch(url, options) {
    return fetch(url, options).then((res) => (res.ok ? res : Promise.reject(res.statusText)));
  }

  getArticles(input) {
    const url = `${this._baseUrl}${input}&apiKey=${this._apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this._customFetch(url, options);
  }
}

export const newsApi = new Api({
  baseUrl: NEWS_API,
  apiKey: API_KEY,
});
