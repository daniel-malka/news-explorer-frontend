import { useState, useEffect, useContext } from 'react';
import trashIcon from '../../images/icons/recycle-bin.svg';
import saveIcon from '../../images/icons/save.svg';
// import savedIcon from '../../images/icons/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';
import ArticlesContextProvider from '../../contexts/ArticlesContext';

const NewsCard = ({
  savedArticles,
  searchTerm,
  article,
  userArticles,
  setUserArticles,
  handleDeleteArticleFunc,
  articlesLength,
  articleId,
  allSavedArticles,
  setAllSavedArticles,
}) => {
  const token = localStorage.getItem('token');
  const api = useContext(ArticlesContextProvider);

  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const { isHome } = useHome();
  const { isLoggedIn } = useAuth();
  const date = new Date();

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
    source: article.source?.id ? article.source.id : article.source?.name,
    image: article.urlToImage || null,
    link: article.url,
  });

  const saveArticle = async () => {
    try {
      console.log('Article', Article);
      console.log('article', article);
      console.log('allSaved', allSavedArticles);
      await api.saveArticle(Article, token);
      savedArticles.add(article.id);
      setIsArticleSaved(true);
      const updatedArticles = await api.getSavedArticles(token);
      setAllSavedArticles(updatedArticles);
    } catch (err) {
      console.log(err);
    }
  };
  const unSaveArticle = async (url) => {
    try {
      await api.deleteArticle(
        allSavedArticles.data.find((element) => element.link === url).id
      );
      setAllSavedArticles(await api.getSavedArticles(token));
    } catch (err) {
      console.log(err);
    }
  };

  const handleArticleClick = (e) => {
    const isButtonClicked = e.target.closest('button');
    if (!isButtonClicked) {
      article.url
        ? window.open(article.url, '_blank')
        : window.open(article.link, '_blank'); // Redirect to the URL
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

  useEffect(() => {
    if (allSavedArticles && allSavedArticles.data) {
      const isArticleSaved = allSavedArticles.data.some(
        (element) => element.link === article.url
      );
      setIsArticleSaved(isArticleSaved);
    }
  }, [allSavedArticles, article.url]);

  return (
    <article className="newscard" onClick={handleArticleClick}>
      <div
        className="newscard-img"
        style={{ backgroundImage: `url(${article.urlToImage})` }}
      >
        <div className="newscard-img-container">
          <button
            className="newscard-img-tagbtn"
            onClick={isArticleSaved ? unSaveArticle : saveArticle}
          >
            {article.source.name || article.keyword}
          </button>
          {isHome ? (
            <>
              {!isLoggedIn && showToolTip && (
                <button className="news-card__tootltip">
                  Sign in to save articles
                </button>
              )}
              <button className=" newscard-img-icon newscard-img-save">
                <img
                  src={saveIcon}
                  alt="save"
                  title="please login to save articles"
                  onMouseEnter={onHoverMessage}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
            </>
          ) : (
            <>
              {showToolTip ? (
                <button className="news-card__tootltip">
                  Remove from saved
                </button>
              ) : (
                ''
              )}

              <button className="newscard-img-icon newscard-img-delete">
                <img
                  src={trashIcon}
                  alt="Remove from saved"
                  onMouseEnter={onHoverMessage}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="newscard-text">
        <p className="newscard-text-date">{Article.date}</p>
        <h3 className="newscard-text-title">{Article.title}</h3>
        <p className="newscard-text-text">{Article.text}</p>
        <p className="newscard-text-source">{Article.source.name}</p>
      </div>
    </article>
  );
};
export default NewsCard;
