import React, { useState, useEffect, useCallback } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';

const SearchResults = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(-3);
  const visibleCards = props.searchResults.slice(0, cardsToShow);

  const handleShowMore = useCallback(() => {
    if (screenWidth > 700) {
      setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
    } else if (screenWidth <= 700 && screenWidth > 500) {
      setCardsToShow((prevCardsToShow) => prevCardsToShow + 2);
    } else {
      setCardsToShow((prevCardsToShow) => prevCardsToShow + 1);
    }
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleShowMore();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth, handleShowMore]);

  return (
    <>
      {props.searchTerm.length === 0 ? (
        ''
      ) : (
        <section className="searchresults">
          <div className="searchresults__div">
            <div className="searchresult__container">
              {visibleCards.length !== 0
                ? visibleCards.map((card) => (
                    <div
                      key={card._id}
                      className="searchresult__cards-listitem"
                    >
                      <NewsCard card={card} />
                    </div>
                  ))
                : props.handleSearchClicked && <NotFound />}

              {!props.showMore &&
              visibleCards.length < props.searchResults.length &&
              screenWidth <= 700 ? (
                <button
                  onClick={handleShowMore}
                  className="newscardlist__button"
                >
                  Show more
                </button>
              ) : (
                ''
              )}

              {screenWidth > 700 && props.searchResults.length !== 0 ? (
                <div>
                  <button
                    onClick={handleShowMore}
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
        </section>
      )}
    </>
  );
};

export default SearchResults;
