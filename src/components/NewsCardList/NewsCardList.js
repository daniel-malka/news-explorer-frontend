import NewsCard from '../NewsCard/NewsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';

const NewsCardList = (props) => {
  const { isHome } = useHome();
  console.log(props.userArticle);
  return (
    <>
      <div className="newscardlist">
        <div className="newscardlist__cards">
          {!isHome &&
            props.userArticle.map(
              <NewsCard
                article={props.article}
                userArticle={props.userArticle}
                setUserArticles={props.setUserArticles}
                articlesLength={props.articlesLength}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default NewsCardList;
