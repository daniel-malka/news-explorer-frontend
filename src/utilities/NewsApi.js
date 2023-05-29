import { NEWS_API } from './constants';

class Api {
  constructor({ baseUrl, mainApi }) {
    this.baseUrl = baseUrl;
    this.mainApi = mainApi;
    this.apiKey = 'b41dc5bf679d4c73a04f57879b7a4279';
  }

  getArticles(input) {
    return fetch(`${this.baseUrl}${input}&apiKey=${this.apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
const newsApi = new Api({ baseUrl: NEWS_API });

export default newsApi;
