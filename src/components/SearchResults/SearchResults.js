import React, { useState, useEffect, useContext } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';

const SearchResults = (props) => {
  const [screenWidth] = useState(window.innerWidth);
  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const [savedArticlesSet, setSavedArticlesSet] = useState(new Set());
  const token = localStorage.getItem('token');
  const { isHome } = useHome();
  const { api } = useArticles();

  useEffect(() => {
    if (isHome) {
      const fetchSavedArticles = async () => {
        try {
          const articles = await api.getSavedArticles(token);
          setAllSavedArticles(articles);
          const articleSet = new Set(
            articles.data?.map((element) => element.link)
          );
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
            <div className="searchresult__container">
              {props.searchResults.length !== 0
                ? props.searchResults.map((article) => {
                    let uniqueArticleId = (article.source.id ?? 'default')
                      .split('')
                      .map(
                        (w) =>
                          w.toString() +
                          Math.floor(Math.random() * 100).toString()
                      )
                      .join('');

                    return (
                      <div
                        id={uniqueArticleId}
                        key={uniqueArticleId}
                        className="searchresult__cards-listitem"
                      >
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
                : props.handleSearchClicked && <NotFound />}

              {props.searchResults.length !== 0 ? (
                <div>
                  <button
                    onClick={props.onClickShowmore}
                    className="newscardlist__button"
                  >
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
