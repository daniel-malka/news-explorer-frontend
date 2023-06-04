import { useAuth } from '../../contexts/AuthContext';
import NewsCardList from '../NewsCardList/NewsCardList';
// import { useArticles } from '../../contexts/ArticlesContext';
import { data } from '../../data';

const SavedNews = () => {
  //temporary commented
  // const { data } = useArticles();

  const { user } = useAuth();

  const keywordSelect = () => {
    let uniqKeywords = [];
    const keyW = data.map((article) => article.keyword);

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
    <main className="savednews">
      <section className="savednews__text">
        <p className="savednews__paragraph">saved articles</p>
        <h2 className="savednews__title">
          {user.userName == '' ? `Daniel` : user.userName}, you have
          {` ` + data.length} saved articles
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
