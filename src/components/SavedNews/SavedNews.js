<<<<<<< HEAD
import { useAuth } from '../../contexts/AuthContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';
const SavedNews = () => {
  const { data } = useArticles();
  const { user } = useAuth();

  const keywordSelect = () => {
    const keyW = data.map((card) => card.keyword);
    let uniqKeywords = [];
    for (let i = 0; i < keyW.length; i++) {
      if (keyW[0] === keyW[i] && uniqKeywords.includes(keyW[i])) {
        continue;
      } else {
        uniqKeywords.push(keyW[i]);
      }
    }
    if (uniqKeywords.length > 3) {
      return `${uniqKeywords[0]}, ${uniqKeywords[1]}, and ${
        uniqKeywords.length - 2
      } others`;
    } else {
      const keywordElements = uniqKeywords.map((keyword) => {
        return keyword;
      });
      return keywordElements;
    }
  };
  return (
    <main className="savedNews">
      <section className="savedNews__text">
        <p className="savedNews__P">saved articles</p>
        <h2 className="savedNews__hsecond">
          {user.firstName},you have {data.length} saved articles
        </h2>
        <p className="savedNews__keywords">
          By keywords: <strong>{keywordSelect()}</strong>
        </p>
      </section>
      <section className="NewsCardList-container">
        <NewsCardList />
      </section>
    </main>
=======
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


  const keywordSelect = useCallback(() => {
    let uniqKeywords = [];
    if (articlesObj !== undefined) {
      const keyW = articlesObj.map((article) => article.keyword);
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
            {user.username + ` you have` + ` `}
            {articlesObj.articles !== undefined && articlesObj.articles.length} saved articles
          </h2>
          <p className="savednews__keywords">
            By keywords: <strong>{keywordSelect()}</strong>
          </p>
        </section>
        <section className="savedarticles__div">
          <div className="savedarticles__container">
            <NewsCardList articlesObj={articlesObj} />
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
>>>>>>> stage-3
  );
};

export default SavedNews;
