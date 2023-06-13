import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { useHome } from '../../contexts/HomeContext';

const NewsCardList = ({ articlesObj, handleDeleteArticle }) => {
  console.log(articlesObj.articles);
  const { isHome } = useHome();
  return (
    <>
      {!isHome &&
        articlesObj !== undefined &&
        articlesObj.articles.map((article) => {
          const uniqueArticleId = article.source
            .split('')
            .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
            .join('');

          return (
            <div id={uniqueArticleId} key={uniqueArticleId} className="savedarticles-article">
              <NewsCard article={article} handleDeleteArticle={handleDeleteArticle} />
            </div>
          );
        })}
    </>
  );
};

export default NewsCardList;
