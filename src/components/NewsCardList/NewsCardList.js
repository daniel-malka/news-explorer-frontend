import { useArticles } from '../../contexts/ArticlesContext';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/preloader';
import { data } from '../../data';

const NewsCardList = () => {
  //temporary commented
  // const { data } = useArticles();

  return (
    <div className="NewsCardList">
      <div className="NewsCardList__cards">
        {data.map((card) => (
          <div key={card._id} className="NewsCardList__cards-listItem">
            {card ? <NewsCard card={card} /> : <Preloader />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCardList;
