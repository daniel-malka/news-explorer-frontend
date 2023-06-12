import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';

const SearchResults = (props) => {
  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const [savedArticlesSet, setSavedArticlesSet] = useState(new Set());
  const token = localStorage.getItem('token');
  const { isHome } = useHome();
  const { api } = useArticles();

  useEffect(() => {
    if (isHome) {
      const fetchSavedArticles = async () => {
        try {
          const response = await api.getSavedArticles(token);
          const savedarticles = await response.json();
          setAllSavedArticles(savedarticles);
          const articleSet = new Set(savedarticles.articles.map((element) => element._id));
          setSavedArticlesSet(articleSet);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSavedArticles();
    }
  }, [api, isHome, token]);

  return (
    <>
      <section className="searchresults">
        {props.searchTerm.length === 0 ? (
          ''
        ) : (
          <div className="searchresults__div">
            <div className={props.showMore ? `searchresult__container` : `searchresult__container searchresult__container-all`}>
              {props.searchResults.length !== 0
                ? props.searchResults.map((article) => {
                    let uniqueArticleId = (article.source.id ?? 'default')
                      .split('')
                      .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
                      .join('');

                    return (
                      <div id={uniqueArticleId} key={uniqueArticleId} className="searchresult__cards-listitem">
                        <NewsCard
                          savedArticlesSet={savedArticlesSet}
                          article={article}
                          searchTerm={props.searchTerm}
                          allSavedArticles={allSavedArticles}
                          setAllSavedArticles={setAllSavedArticles}
                        />
                      </div>
                    );
                  })
                : !props.searchResults && (
                    <div className="searchresult__cards-listitem">
                      <NotFound />
                    </div>
                  )}

              {props.showMore ? (
                <div>
                  <button onClick={props.onClickShowmore} className="savedcardlist__button">
                    Show more
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResults;
