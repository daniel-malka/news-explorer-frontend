import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';
import SavedNews from '../SavedNews/SavedNews';

const SearchResults = ({ showMore, onClickShowmore, searchResults, searchTerm }) => {
  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const [savedArticlesSet, setSavedArticlesSet] = useState(new Set());
  const token = localStorage.getItem('token');
  const { isHome } = useHome();
  const { api } = useArticles();

  //make a state to check if user tried to search if not dont render not found .. else render when searthresults = 0
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
      {isHome ? (
        <section className="searchresults">
          {searchTerm.length === 0 ? (
            ''
          ) : (
            <div className="searchresults__div">
              <div className={showMore ? `searchresult__container` : `searchresult__container searchresult__container-all`}>
                {searchResults.length !== 0 ? (
                  searchResults.map((article) => {
                    let uniqueArticleId = (article.source.id ?? 'default')
                      .split('')
                      .map((w) => w.toString() + Math.floor(Math.random() * 100).toString())
                      .join('');

                    return (
                      <div id={uniqueArticleId} key={uniqueArticleId} className="searchresult__cards-listitem">
                        <NewsCard
                          savedArticlesSet={savedArticlesSet}
                          article={article}
                          searchTerm={searchTerm}
                          allSavedArticles={allSavedArticles}
                          setAllSavedArticles={setAllSavedArticles}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="searchresult__cards-listitem">
                    <NotFound />
                  </div>
                )}{' '}
                {showMore && (
                  <button onClick={onClickShowmore} className="newscardlist__button">
                    Show more
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      ) : (
        <SavedNews showMore={showMore} onClickShowmore={onClickShowmore} />
      )}{' '}
    </>
  );
};

export default SearchResults;
