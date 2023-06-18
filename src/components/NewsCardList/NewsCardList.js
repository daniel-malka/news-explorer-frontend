import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({ articlesObj }) => {
  return (
    <>
      {articlesObj !== undefined &&
        articlesObj.map((article) => {
          let uniqueArticleId = article.source
            .split('')
            .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
            .join('');

          return (
            <div id={uniqueArticleId} key={uniqueArticleId} className="savedarticles-article">
              <NewsCard article={article} />
            </div>
          );
        })}
    </>
  );
};

export default NewsCardList;
