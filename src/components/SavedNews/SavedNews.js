import { useCallback, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNews = ({ showMore, onClickShowmore }) => {
  const { user } = useAuth();
  const { api } = useArticles();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');
  const [userArticles, setUserArticles] = useState([]);
  const articlesObj = userArticles;
  const getSaved = async () => {
    try {
      const response = await api.getSavedArticles(token);
      const savedArticles = await response.json();
      setUserArticles(savedArticles);
    } catch {
      return (err) => console.log(err);
    }
  };
  useEffect(() => {
    getSaved();
  }, [!isHome]);
  const handleDeleteArticle = async (articleId) => {
    await api.deleteArticle(articleId);
  };

  const keywordSelect = useCallback(() => {
    let uniqKeywords = [];
    if (!userArticles === []) {
      const keyW = userArticles.map((article) => article.keyword);
      uniqKeywords.push(new Set(keyW));

      if (uniqKeywords > 3) return `${uniqKeywords[0]}, ${uniqKeywords[1]}, and ${uniqKeywords.length - 2} others`;
      else if (uniqKeywords.length <= 3) return uniqKeywords.map((word) => word).join(', ');
      else return 'None';
    }
  }, [setUserArticles]);

  return (
    <>
      <main className="savednews">
        <section className="savednews__text">
          <p className="savednews__paragraph">saved articles</p>
          <h2 className="savednews__title">
            {user.username}, you have
            {` ` + useArticles.length} saved articles
          </h2>
          <p className="savednews__keywords">
            By keywords: <strong>{keywordSelect()}</strong>
          </p>
        </section>
        <section className="savedarticles__div">
          <div className="savedarticles__container">
            <NewsCardList articlesObj={articlesObj} handleDeleteArticle={handleDeleteArticle} />
            {showMore ? (
              <div>
                <button onClick={onClickShowmore} className="savedcardlist__button">
                  Show more
                </button>
              </div>
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
