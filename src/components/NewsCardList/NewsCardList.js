import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { data } from '../../data';

const NewsCardList = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(0);
  const visibleCards = data.slice(0, cardsToShow);

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
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleShowMore();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

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
