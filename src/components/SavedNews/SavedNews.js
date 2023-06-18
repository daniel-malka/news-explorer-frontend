import { useCallback, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNews = ({ showMore, onClickShowmore, allSavedArticles, setAllSavedArticles }) => {
  const { user } = useAuth();
  const { api } = useArticles();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');

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
  const keywordSelect = useCallback(() => {
    let uniqKeywords = [];
    if (allSavedArticles !== undefined) {
      const keyW = allSavedArticles.map((article) => article.keyword);
      console.log(keyW);
      uniqKeywords.push(new Set(keyW));

      if (uniqKeywords > 3) return `${uniqKeywords[0]}, ${uniqKeywords[1]}, and ${uniqKeywords.length - 2} others`;
      else if (uniqKeywords.length <= 3) return uniqKeywords.map((word) => word).join(', ');
      else return 'None';
    }
  }, [setAllSavedArticles]);
  return (
    <>
      <main className="savednews">
        <section className="savednews__text">
          <p className="savednews__paragraph">saved articles</p>
          <h2 className="savednews__title">
            {user.username + ` you have` + ` `}
            {allSavedArticles !== undefined && allSavedArticles.length} saved articles
          </h2>
          <p className="savednews__keywords">
            By keywords: <strong>{() => keywordSelect()}</strong>
          </p>
        </section>
        <section className="savedarticles__div">
          <div className="savedarticles__container">
            <NewsCardList />
            {showMore ? (
              <button onClick={onClickShowmore} className="savedcardlist__button">
                Show more
              </button>
            ) : (
              ''
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SavedNews;
