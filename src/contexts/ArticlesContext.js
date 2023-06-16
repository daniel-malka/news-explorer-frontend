<<<<<<< HEAD
=======
import { newsApi } from '../utilities/NewsApi';
import { getSavedArticles, saveArticle, unsaveArticle } from '../utilities/MainApi';
>>>>>>> stage-3
const { createContext, useContext } = require('react');

const ArticlesContext = createContext();

<<<<<<< HEAD
// data
const data = require('../data');

//provider
const ArticlesContextProvider = ({ children }) => {
  return (
    <ArticlesContext.Provider value={{ data }}>
=======
//provider
const ArticlesContextProvider = ({ children }) => {
  return (
    <ArticlesContext.Provider
      value={{
        newsApi,
        getSavedArticles,
        saveArticle,
        unsaveArticle,
      }}
    >
>>>>>>> stage-3
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;

//make a custom hook for accessing the context
export const useArticles = () => {
<<<<<<< HEAD
  const { data } = useContext(ArticlesContext).data;

  return { data };
=======
  const api = useContext(ArticlesContext);

  return { api };
>>>>>>> stage-3
};
