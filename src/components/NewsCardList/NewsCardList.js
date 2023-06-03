import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { data } from '../../data';

const NewsCardList = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cardsToShow, setCardsToShow] = useState(0); // Render 3 cards initially
  const visibleCards = data.slice(0, cardsToShow);

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
      <div className="newsCardList">
        <div className="newsCardList__cards">
          {visibleCards.map((card, index) => (
            <NewsCard key={index} card={card} />
          ))}
        </div>{' '}
        <button onClick={handleShowMore} className="newsCardList__button">
          Show more
        </button>
      </div>{' '}
    </>
  );
};

export default NewsCardList;
