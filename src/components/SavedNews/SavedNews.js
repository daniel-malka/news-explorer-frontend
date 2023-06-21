import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import { useArticles } from '../../contexts/ArticlesContext';

const SavedNews = () => {
  const { isLoggedIn, user } = useAuth();
  const { api } = useArticles();
  const { isHome } = useHome();
  const token = localStorage.getItem('token');
  const [userArticles, setUserArticles] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  async function getSaved() {
    if (!isHome && isLoggedIn) {
      try {
        const response = await api.getSavedArticles(token);
        const savedArticles = await response.json();
        setUserArticles(savedArticles);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getSaved();
  }, [!isHome, userArticles]);

  useEffect(() => {
    if (userArticles !== undefined) {
      const keyW = userArticles.map((article) => article.keyword);
      const uniqueKeyW = [...new Set(keyW)]; // Convert Set to an array
      setKeywordList(uniqueKeyW); // Update the keyword list state with unique values
    }
  }, []);

  const keywordSelect = () => {
    if (keywordList.length > 3) return `${keywordList[0]}, ${keywordList[1]}, and ${keywordList.length - 2} others`;
    else if (keywordList.length <= 3) return keywordList.join(', ');
    else return 'None';
  };

  return (
    <>
      <main className="savednews">
        <section className="savedarticles__text">
          <p className="savedarticles__paragraph">saved articles</p>
          <h2 className="savedarticles__title">
            {user.username + `, you have` + ` `}
            {userArticles.length} saved articles
          </h2>
          <p className="savedarticles__keywords">
            By keywords: <strong>{keywordSelect()}</strong>
          </p>
        </section>
        <section className="savedarticles__div">
          <div className="savedarticles__container">
            <NewsCardList />
          </div>
        </section>
      </main>
    </>
  );
};

export default SavedNews;
