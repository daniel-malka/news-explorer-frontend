import { useState } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
const NewsCard = ({ card }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const { isHome } = useHome();
  const { isLoggedIn } = useAuth();

  const onHoverMessage = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  return (
    <article className="NewsCard">
      <div
        className="NewsCard-img"
        style={{ backgroundImage: `url(${card.image})` }}
      >
        <div className="NewsCard-img-container">
          <button className="NewsCard-img-tagBtn">{card.keyword}</button>
          {!isHome ? (
            <>
              {showToolTip ? (
                <button className="news-card__tootltip">
                  Remove from saved
                </button>
              ) : (
                ''
              )}

              <button className="NewsCard-img-icon NewsCard-img-delete">
                <img
                  src={trashIcon}
                  alt="Remove from saved"
                  onMouseEnter={onHoverMessage}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
            </>
          ) : (
            <>
              {isLoggedIn && showToolTip ? (
                <button className="news-card__tootltip">
                  Sign in to save articles
                </button>
              ) : (
                ''
              )}
              <button className=" NewsCard-img-icon NewsCard-img-save">
                <img
                  src={saveIcon}
                  alt="save"
                  title="please login to save articles"
                  onMouseEnter={onHoverMessage}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="NewsCard-text">
        <p className="NewsCard-text-date">{card.date}</p>
        <h3 className="NewsCard-text-title">{card.title}</h3>
        <p className="NewsCard-text-text">{card.text}</p>
        <p className="NewsCard-text-source">{card.source}</p>
      </div>
    </article>
  );
};
export default NewsCard;
