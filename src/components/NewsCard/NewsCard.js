import { useState, useCallback } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
import savedIcon from '../../images/icons/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';

const NewsCard = ({ savedArticlesSet, searchTerm, article, allSavedArticles, setAllSavedArticles }) => {
  const token = localStorage.getItem('token');
  const { api } = useArticles();
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const { isHome } = useHome();
  const { isLoggedIn } = useAuth();
  const date = new Date();
  const toolTipText = isLoggedIn && isArticleSaved ? `Remove from saved` : `Sign in to save articles`;
  const changeDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };
  const [Article] = useState({
    title: article.title,
    keyword: searchTerm,
    text: article.description,
    date: changeDate(article.publishedAt) || changeDate(date),
    source: article.source.name,
    image: article.urlToImage || null,
    link: article.url,
  });

  const saveArticle = useCallback(async () => {
    try {
      const response = await api.saveArticle(Article, token);
      const savedResult = await response.json();
      savedArticlesSet.add(savedResult._id);
      setIsArticleSaved(savedArticlesSet.has(savedResult._id));
      const response2 = await api.getSavedArticles(token);
      const updatedArticles = await response2.json();
      setAllSavedArticles(updatedArticles);
    } catch (err) {
      console.log(err);
    }
  }, [api, Article, savedArticlesSet, setAllSavedArticles, setIsArticleSaved, token]);
  const unSaveArticle = useCallback(
    async (url) => {
      try {
        const filteredArticle = allSavedArticles.articles.filter((card) => card.url === url);
        if (filteredArticle.length > 0) {
          const response = await api.deleteArticle(filteredArticle[0]._id);
          const deletedArticle = await response.json();
          console.log(deletedArticle);
          savedArticlesSet.delete(deletedArticle._id);
          savedArticlesSet.has(deletedArticle._id);
          const response2 = await api.getSavedArticles(token);
          const updatedArticles = await response2.json();
          setAllSavedArticles(updatedArticles);
        }
      } catch (err) {
        console.log(err);
        // Handle the error here, e.g., show an error message
      }
    },
    [allSavedArticles, api, savedArticlesSet, setAllSavedArticles, token]
  );

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
    setShowToolTip(false);
  };

  return (
    <>
      <article className="newscard" onClick={handleArticleClick}>
        <div className="newscard-img" style={{ backgroundImage: `url(${article.urlToImage})` }}>
          <div className="newscard-img-container">
            <button className="newscard-img-tagbtn">{article.source.name || article.keyword}</button>
            {showToolTip && <button className="news-card__tootltip">{toolTipText}</button>}
            <button
              className="newscard-img-icon newscard-img-save"
              onClick={isArticleSaved ? () => unSaveArticle(article.url) : saveArticle}
            >
              <img
                src={isHome && isArticleSaved ? savedIcon : isHome ? saveIcon : trashIcon}
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

export default NewsCard;
