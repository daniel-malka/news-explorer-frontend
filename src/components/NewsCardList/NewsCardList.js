import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';
import { useAuth } from '../../contexts/AuthContext';
const NewsCardList = () => {
  const { api } = useArticles();
  const { isLoggedIn } = useAuth();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');
  const [allSavedArticles, setAllSavedArticles] = useState([]);

  const getSaved = async () => {
    if (!isHome && isLoggedIn) {
      try {
        const response = await api.getSavedArticles(token);
        const savedArticles = await response.json();
        setAllSavedArticles(savedArticles);
      } catch {
        return (err) => console.log(err);
      }
    }
  };

  useEffect(() => {
    getSaved();
  }, [!isHome]);

  return (
    <>
      {allSavedArticles !== undefined &&
        allSavedArticles.length > 0 &&
        allSavedArticles.map((article) => {
          let uniqueArticleId = article.source
            .split('')
            .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
            .join('');

          return (
            <div id={uniqueArticleId} key={uniqueArticleId} className="savedarticles-article">
              <NewsCard article={article} allSavedArticles={allSavedArticles} setAllSavedArticles={setAllSavedArticles} />
            </div>
          );
        })}
    </>
  );
};

export default NewsCardList;
