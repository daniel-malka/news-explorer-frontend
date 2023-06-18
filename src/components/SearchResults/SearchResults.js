import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import { useHome } from '../../contexts/HomeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useArticles } from '../../contexts/ArticlesContext';
import SavedNews from '../SavedNews/SavedNews';

const SearchResults = ({ showMore, onClickShowmore, searchResults, searchTerm }) => {
  const [allSavedArticles, setAllSavedArticles] = useState([]);

  const token = localStorage.getItem('token');
  const { isHome } = useHome();
  const { api } = useArticles();
  const { isLoggedIn } = useAuth();
  //make a state to check if user tried to search if not dont render not found .. else render when searthresults = 0
  useEffect(() => {
    if (isHome && isLoggedIn) {
      const fetchSavedArticles = async () => {
        try {
          const response = await api.getSavedArticles(token);
          const savedarticles = await response.json();
          setAllSavedArticles(savedarticles);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSavedArticles();
    }
  }, [isHome, token]);

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
        <SavedNews
          showMore={showMore}
          onClickShowmore={onClickShowmore}
          allSavedArticles={allSavedArticles}
          setAllSavedArticles={setAllSavedArticles}
        />
      )}{' '}
    </>
  );
};

export default SearchResults;
