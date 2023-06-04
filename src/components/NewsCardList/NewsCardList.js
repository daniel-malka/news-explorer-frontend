import React, { useState, useEffect, useCallback } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { data } from '../../data';

const NewsCardList = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(-3);
  const visibleCards = data.slice(0, cardsToShow);

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
      <div className="newscardlist">
        <div className="newscardlist__cards">
          {visibleCards.map((card, index) => (
            <NewsCard key={index} card={card} />
          ))}
        </div>{' '}
        <button onClick={handleShowMore} className="newscardlist__button">
          Show more
        </button>
      </div>{' '}
    </>
  );
};

export default NewsCardList;
