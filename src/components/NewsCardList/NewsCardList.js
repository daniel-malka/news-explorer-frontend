import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';
const NewsCardList = () => {
  const { user } = useAuth();
  const { api } = useArticles();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');
  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const getSaved = async () => {
    try {
      const response = await api.getSavedArticles(token);
      const savedArticles = await response.json();
      setAllSavedArticles(savedArticles);
    } catch {
      return (err) => console.log(err);
    }
  };

  useEffect(() => {
    getSaved();
  }, [!isHome]);
  return (
    <>
      {allSavedArticles !== undefined &&
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
