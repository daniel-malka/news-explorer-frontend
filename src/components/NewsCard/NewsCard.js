import { useState } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
// import savedIcon from '../../images/icons/saved.svg';
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
    <article className="newsCard">
      <div
        className="newsCard-img"
        style={{ backgroundImage: `url(${card.image})` }}
      >
        <div className="newsCard-img-container">
          <button className="newsCard-img-tagBtn">{card.keyword}</button>
          {!isHome ? (
            <>
              {showToolTip ? (
                <button className="news-card__tootltip">
                  Remove from saved
                </button>
              ) : (
                ''
              )}

              <button className="newsCard-img-icon newsCard-img-delete">
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
              <button className=" newsCard-img-icon newsCard-img-save">
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
      <div className="newsCard-text">
        <p className="newsCard-text-date">{card.date}</p>
        <h3 className="newsCard-text-title">{card.title}</h3>
        <p className="newsCard-text-text">{card.text}</p>
        <p className="newsCard-text-source">{card.source}</p>
      </div>
    </article>
  );
};
export default NewsCard;
