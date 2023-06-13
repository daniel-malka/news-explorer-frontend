import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({ articlesObj, handleDeleteArticle }) => {
  return (
    <>
      {articlesObj.articles !== undefined &&
        articlesObj.articles.map((article) => {
          return console.log(article);

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
