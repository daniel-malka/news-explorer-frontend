<<<<<<< HEAD
import { useArticles } from '../../contexts/ArticlesContext';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/preloader';

const NewsCardList = () => {
  const { data } = useArticles();

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
=======
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({ articlesObj }) => {




  return (
    <>
      {articlesObj !== undefined &&
        articlesObj.map((article) => {
          const uniqueArticleId = article.source
            .split('')
            .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
            .join('');
          return (
            <div id={uniqueArticleId} key={uniqueArticleId} className="savedarticles-article">
              <NewsCard article={article}  />
            </div>
          );
        })}
    </>
>>>>>>> stage-3
  );
};

export default NewsCardList;
