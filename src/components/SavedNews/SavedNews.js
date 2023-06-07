import { useCallback, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNews = () => {
  const [userArticles, setUserArticles] = useState([]);
  const { user } = useAuth();
  const api = useArticles();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');

  const keywordSelect = useCallback(() => {
    let uniqKeywords = [];
    const keyW =
      useArticles?.data && useArticles?.data.map((article) => article.keyword);
    console.log(keyW, userArticles);
    // uniqKeywords.push(new Set(keyW));

    if (uniqKeywords > 3)
      return `${uniqKeywords[0] + ' '}, ${uniqKeywords[1] + ' '}, and ${
        uniqKeywords.length - 2
      } others`;
    else if (uniqKeywords.length <= 3)
      return uniqKeywords.map((word) => word).join(', ');
    else return 'None';
  }, [userArticles]);

  const getSaved = async () => {
    try {
      return await api.getSavedArticles(token);
    } catch {
      return (err) => console.log(err);
    }
  };

  useEffect(() => {
    if (isHome)
      getSaved()
        .then((res) => {
          console.log(res);
          setUserArticles(res);
        })
        .catch((err) => console.log(err));
  }, [api, isHome, keywordSelect, userArticles]);

  return (
    <main className="savednews">
      <section className="savednews__text">
        <p className="savednews__paragraph">saved articles</p>
        <h2 className="savednews__title">
          {user.userName === '' ? `Daniel` : user.userName}, you have
          {` ` + useArticles.length} saved articles
        </h2>
        <p className="savednews__keywords">
          By keywords: <strong>{keywordSelect()}</strong>
        </p>
      </section>
      <section className="newscardlist-container">
        <NewsCardList />
      </section>
    </main>
  );
};

export default SavedNews;
