import { useState } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
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
  const undifindImg =
    'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  const thisArticle = article;
  const popup = usePopup();

  const toolTipText = isLoggedIn && !isHome ? `Remove from saved` : `Sign in to save articles`;
  function setDateString() {
    const isoDate = thisArticle.publishedAt || thisArticle.date;
    const date = new Date(isoDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const [Article] = useState({
    title: thisArticle.title,
    keyword: searchTerm,
    text: thisArticle.description || thisArticle.text,
    date: setDateString(),
    source: thisArticle.source?.name || thisArticle.source,
    image: thisArticle.urlToImage || thisArticle.image || undifindImg,
    link: thisArticle.link || thisArticle.url,
    _id: thisArticle._id,
  });
  if (allSavedArticles !== undefined) {
    isSaved = allSavedArticles.some((savedArticle) => savedArticle.link === thisArticle.url);
  }

  const SaveArticle = async (foundArticle) => {
    if (!isLoggedIn) {
      popup.openPopup('signup');
      return;
    }
    try {
      const saved = await api.saveArticle(foundArticle, token);
      console.log(saved);
      setAllSavedArticles((prevArticles) => [...prevArticles, saved]);
    } catch (err) {
      console.log(err);
    }
  };

  const UnsaveArticle = async (article) => {
    try {
      const response = await api.unsaveArticle(article._id, token);
      const deletedArticle = await response.json();
      setAllSavedArticles((prevSavedArticles) => prevSavedArticles.filter((item) => item._id !== article._id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSave = (isSavedArticle) => {
    if (allSavedArticles !== undefined) {
      if (!isLoggedIn) {
        popup.openPopup('signup');
        return;
      }
      const isArticleIsSaved = allSavedArticles.find(
        (savedArticle) => savedArticle.link === isSavedArticle.link || savedArticle.link === isSavedArticle.url
      );

      if (isArticleIsSaved !== undefined) {
        UnsaveArticle(isArticleIsSaved);
      } else SaveArticle(isSavedArticle);
    }
  };

  const handleArticleClick = (e) => {
    const isButtonClicked = e.target.closest('button');
    if (!isButtonClicked) {
      article.url ? window.open(thisArticle.url, '_blank') : window.open(thisArticle.link, '_blank'); // Redirect to the URL
    }
  };

  function onHoverMessage(e) {
    e.preventDefault();
    setShowToolTip(true);
  }

  function handleMouseLeave(e) {
    e.preventDefault();
    setShowToolTip(false);
  }
  return (
    <>
      <article className="newscard" onClick={handleArticleClick}>
        <div
          className="newscard-img"
          style={{
            backgroundImage: `url(${(Article.urlToImage !== undefined && Article.urlToImage) || Article.image})`,
          }}
        >
          <div className="newscard-img-container">
            <button className="newscard-img-tagbtn">{Article.keyword}</button>
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
          <p className="newscard-text-text">{Article.text || thisArticle.text}</p>
          <p className="newscard-text-source">{Article.source || thisArticle.source}</p>
        </div>
      </article>
    </>
  );
};

export default NewsCard;
