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
    const keyW =
      userArticles && userArticles?.data.map((article) => article.keyword);
    const uniqKeywords = [...new Set(keyW)];
    if (uniqKeywords > 3)
      return `${uniqKeywords[0] + ' '}, ${uniqKeywords[1] + ' '}, and ${
        uniqKeywords.length - 2
      } others`;
    else if (uniqKeywords.length <= 3)
      return uniqKeywords.map((word) => word).join(', ');
    else return 'None';
  }, [userArticles]);

  useEffect(() => {
    const getSavedArticles = async () => {
      try {
        return await api.getSavedArticles(token);
      } catch {
        return (err) => console.log(err);
      }
    };
    if (isHome)
      getSavedArticles()
        .then((res) => setUserArticles(res))
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
