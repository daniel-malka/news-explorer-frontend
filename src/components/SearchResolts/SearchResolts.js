import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';

const SearchResolts = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(0);
  const visibleCards = props.searchResults.slice(0, cardsToShow);

  const handleShowMore = () => {
    if (screenWidth > 700) {
      setCardsToShow(cardsToShow + 3);
    } else if (screenWidth <= 700 && screenWidth > 500) {
      setCardsToShow(cardsToShow + 2);
    } else {
      setCardsToShow(cardsToShow + 1);
    }
  };
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', setScreenWidth);
    handleShowMore();
    return () => {
      window.removeEventListener('resize', setScreenWidth);
    };
  }, [screenWidth]);

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
              screenWidth <= `700` ? (
                <button
                  onClick={handleShowMore}
                  className="newscardlist__button"
                >
                  Show more
                </button>
              ) : (
                ''
              )}

              {screenWidth > `700` && props.searchResults.length !== 0 ? (
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
      )}{' '}
    </>
  );
};

export default SearchResolts;
