import newsApi from '../utilities/NewsApi';
import {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from '../utilities/MainApi';
const { createContext, useContext } = require('react');

const ArticlesContext = createContext();

//provider
const ArticlesContextProvider = ({ children }) => {
  return (
    <ArticlesContext.Provider
      value={{ newsApi, getSavedArticles, saveArticle, deleteArticle }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;

//make a custom hook for accessing the context
export const useArticles = () => {
  const api = useContext(ArticlesContext);

  return { api };
};
