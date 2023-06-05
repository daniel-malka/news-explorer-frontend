import { NEWS_API, API_KEY } from './constants';

class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }
  _customFetch(url, headers) {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  getArticles(input) {
    return fetch(`${this._baseUrl}${input}&apiKey=${this._apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
  }
}
export const newsApi = new Api({
  baseUrl: NEWS_API,
  apiKey: API_KEY,
});
