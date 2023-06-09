import { useState } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
<<<<<<< HEAD
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
=======
import savedIcon from '../../images/icons/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';
import { usePopup } from '../../contexts/PopupContext';

const NewsCard = ({ searchTerm, article, allSavedArticles, setAllSavedArticles }) => {
  const token = localStorage.getItem('token');
  const { api } = useArticles();
  const [showToolTip, setShowToolTip] = useState(false);
  const { isHome } = useHome();
  const { isLoggedIn } = useAuth();
  let isSaved;
  const thisArtice = article;
  const popup = usePopup();
  const date = new Date();

  const toolTipText = isLoggedIn && !isHome ? `Remove from saved` : `Sign in to save articles`;

  const changeDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

  const [Article] = useState({
    title: thisArtice.title,
    keyword: searchTerm,
    text: thisArtice.description,
    date: changeDate(date) || changeDate(thisArtice.publishedAt),
    source: thisArtice.source.name || thisArtice.source.id,
    image: thisArtice.urlToImage || thisArtice.image || null,
    link: thisArtice.url,
  });
  if (allSavedArticles !== undefined) {
    isSaved = allSavedArticles.some((savedArticle) => savedArticle.link === thisArtice.url);
  }
  const SaveArticle = async (findArticle) => {
    if (!isLoggedIn) {
      popup.openPopup('signin');
      return;
    }
    try {
      const response = await api.saveArticle(findArticle, token);
      const savedArticle = await response.json();
      console.log('the article is saved', savedArticle);

      setAllSavedArticles((prevArticles) => [...prevArticles, savedArticle]);
    } catch (err) {
      console.log(err);
    }
  };
  const UnsaveArticle = async (articleId) => {
    try {
      const response = await api.unsaveArticle(articleId, token);
      const deletedArticle = await response.json();
      console.log(response);

      // setAllSavedArticles((prevSavedArticles) => prevSavedArticles.filter((item) => item !== deletedArticle));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSave = (article) => {
    if (allSavedArticles.length === 0) {
      if (!isLoggedIn) {
        popup.openPopup('signin');
        return;
      }
    }
    if (allSavedArticles.length > 0) {
      console.log(allSavedArticles);
      const isArticleIsSaved = allSavedArticles.find((savedArticle) => savedArticle.link === article.link);

      if (isArticleIsSaved) {
        UnsaveArticle(isArticleIsSaved._id);
      } else SaveArticle(article);
    } else SaveArticle(article);
  };

  const handleArticleClick = (e) => {
    const isButtonClicked = e.target.closest('button');
    if (!isButtonClicked) {
      article.url ? window.open(article.url, '_blank') : window.open(article.link, '_blank'); // Redirect to the URL
    }
  };

  const onHoverMessage = (e) => {
    e.preventDefault();
    setShowToolTip(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
>>>>>>> stage-3
    setShowToolTip(false);
  };

  return (
<<<<<<< HEAD
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
=======
    <>
      <article className="newscard" onClick={handleArticleClick}>
        <div className="newscard-img" style={{ backgroundImage: `url(${article.urlToImage})` }}>
          <div className="newscard-img-container">
            <button className="newscard-img-tagbtn">{article.source.name || article.keyword}</button>
            {showToolTip && !isHome && <button className="news-card__tootltip">{toolTipText}</button>}
            <button className="newscard-img-icon newscard-img-save" onClick={() => toggleSave(Article)}>
              <img
                src={isLoggedIn && !isHome ? trashIcon : isLoggedIn && isSaved ? savedIcon : saveIcon}
                alt={toolTipText}
                title={toolTipText}
                onMouseEnter={onHoverMessage}
                onMouseLeave={handleMouseLeave}
              />
            </button>
          </div>
        </div>
        <div className="newscard-text">
          <p className="newscard-text-date">{Article.date}</p>
          <h3 className="newscard-text-title">{Article.title}</h3>
          <p className="newscard-text-text">{Article.text}</p>
          <p className="newscard-text-source">{Article.source}</p>
        </div>
      </article>
    </>
  );
};

>>>>>>> stage-3
export default NewsCard;
