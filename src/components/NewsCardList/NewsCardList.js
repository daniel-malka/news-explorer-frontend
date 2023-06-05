import React, { useState, useEffect, useCallback } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';

const NewsCardList = ({
  userArticles,
  setUserArticles,
  handleDeleteArticleFunc,
  articlesLength,
}) => {
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();
  const { isHome } = useHome();
  const { api } = useArticles();
  const [showToolTip, setShowToolTip] = useState(false);
  const [articleSaved, setArticleSaved] = useState(false);

  return (
    <>
      <div className="newscardlist">
        <div className="newscardlist__cards">
          {!userArticles?.data || userArticles === [] ? (
            <p>Sorry, you haven't saved any articles</p>
          ) : (
            userArticles.map((article) => (
              <NewsCard
                article={article}
                userArticles={userArticles}
                setUserArticles={setUserArticles}
                handleDeleteArticleFunc={handleDeleteArticleFunc}
                articlesLength={articlesLength}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NewsCardList;
