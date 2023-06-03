import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';

const SearchResolts = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(0);
  const visibleCards = props.searchResults.slice(0, cardsToShow);

  const handleShowMore = () => {
    if (screenWidth > 920) {
      setCardsToShow(cardsToShow + 3);
    } else if (screenWidth <= 920 && screenWidth > 600) {
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
        <section className="searchResults">
          <div className="searchResults__div">
            <div className="searchResult__container">
              {visibleCards.length !== 0
                ? visibleCards.map((card) => (
                    <div
                      key={card._id}
                      className="searchResult__cards-listItem"
                    >
                      <NewsCard card={card} />
                    </div>
                  ))
                : props.handleSearchClicked && <NotFound />}

              {!props.showMore &&
              visibleCards.length < props.searchResults.length &&
              screenWidth <= `920` ? (
                <button
                  onClick={handleShowMore}
                  className="newsCardList__button"
                >
                  Show more
                </button>
              ) : (
                ''
              )}

              {screenWidth > `920` && props.searchResults.length != 0 ? (
                <div>
                  <button
                    onClick={handleShowMore}
                    className="newsCardList__button"
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
