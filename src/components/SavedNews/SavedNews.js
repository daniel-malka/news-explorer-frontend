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
  );
};

export default SavedNews;
