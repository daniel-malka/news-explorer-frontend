import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';

const SearchResolts = (props) => {
  const [cardsToShow, setCardsToShow] = useState(3);

  const visibleCards = props.searchResults.slice(0, cardsToShow);

  const handleShowMore = () => {
    setCardsToShow(cardsToShow + 3);
  };

  return (
    <section className="searchResults">
      {props.searchTerm.length === 0 ? (
        <div className="searchResults__div" style={{ display: 'none' }}></div>
      ) : (
        <div className="searchResults__div">
          <h3 className="searchResult-title">Search results</h3>
          <div className="searchResult__container">
            {visibleCards.length !== 0
              ? visibleCards.map((card) => (
                  <div key={card._id} className="searchResult__cards-listItem">
                    <NewsCard card={card} />
                  </div>
                ))
              : props.handleSearchClicked && (
                  <div className="searchResult__cards-listItem">
                    <NotFound />
                  </div>
                )}
            {!props.showMore &&
              visibleCards.length < props.searchResults.length && (
                <button
                  onClick={handleShowMore}
                  className="NewsCardList__button"
                >
                  Show more
                </button>
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResolts;
