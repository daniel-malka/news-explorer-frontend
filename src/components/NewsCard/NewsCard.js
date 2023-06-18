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
    title: thisArticle.title,
    keyword: searchTerm,
    text: thisArticle.description,
    date: changeDate(date) || changeDate(thisArticle.publishedAt),
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
      popup.openPopup('signin');
      return;
    }
    try {
      const response = await api.saveArticle(foundArticle, token);
      const savedArticle = await response.json();
      console.log('the article is saved', savedArticle);

      setAllSavedArticles((prevArticles) => [...prevArticles, savedArticle]);
    } catch (err) {
      console.log(err);
    }
  };

  const UnsaveArticle = async (article) => {
    try {
      const response = await api.unsaveArticle(article._id, token);
      const deletedArticle = await response.json();
      setAllSavedArticles((prevSavedArticles) => prevSavedArticles.filter((item) => item !== article));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSave = (isSavedArticle) => {
    if (allSavedArticles !== undefined) {
      if (!isLoggedIn) {
        popup.openPopup('signin');
        return;
      }
      const isArticleIsSaved = allSavedArticles.find((savedArticle) => savedArticle.link === isSavedArticle.link);

      if (isArticleIsSaved !== undefined) {
        console.log(isArticleIsSaved);
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

  const onHoverMessage = (e) => {
    e.preventDefault();
    setShowToolTip(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setShowToolTip(false);
  };

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
