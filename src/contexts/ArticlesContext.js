const { createContext, useContext } = require('react');

const ArticlesContext = createContext();

// data
const data = require('../data');

//provider
const ArticlesContextProvider = ({ children }) => {
  return (
    <ArticlesContext.Provider value={{ data }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;

//make a custom hook for accessing the context
export const useArticles = () => {
  const { data } = useContext(ArticlesContext).data;

  return { data };
};
