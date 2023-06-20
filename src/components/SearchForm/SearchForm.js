import mainHeaderImg from '../../images/main.jpg';
import { useState, useRef, useEffect } from 'react';
import { useArticles } from '../../contexts/ArticlesContext';
import SearchResults from '../SearchResults/SearchResults';
import Preloader from '../Preloader/preloader';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(3);
  const [triedTosearch, setTriedTosearch] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [screenWidth] = useState(window.innerWidth);
  const { api } = useArticles();
  const inputRef = useRef('');
  useEffect(() => {
    if (screenWidth > 700) {
      setCounter(3);
    } else if (screenWidth > 500) {
      setCounter(2);
    } else if (screenWidth <= 500) {
      setCounter(1);
    }
  }, []);

  useEffect(() => {
    if (!isFirstClick) {
      let filter = allResults.length > 3 ? [...allResults].slice(0, counter) : allResults;
      setSearchResults(filter);
      setShowMore(filter.length !== allResults.length);
    }
  }, [counter, allResults, isFirstClick]);

  const onClickShowmore = (event) => {
    event.preventDefault();
    if (isFirstClick) {
      setCounter(6);
      setIsFirstClick(false);
    }
    if (screenWidth > 700) {
      setCounter(counter + 3);
    } else if (screenWidth > 500) {
      setCounter(counter + 2);
    } else if (screenWidth <= 500) {
      setCounter(counter + 1);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setTriedTosearch(true);
    setAllResults([]);
    setCounter(3);

    const input = inputRef.current.value;
    setSearchTerm(input);
    setIsLoading(true);
    try {
      const response = await api.newsApi.getArticles(input);
      const { articles } = await response.json();
      setAllResults(articles);

      const filter = articles.length > 3 ? [...articles].slice(0, counter) : articles;
      setSearchResults(filter);
      setIsLoading(false);
      setShowMore(articles.length > 3);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className="search"
        style={{
          backgroundImage: `url(${mainHeaderImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="search__text">
          <h1 className="search__title">What's going on in the world?</h1>
          <p className="search__pargraph">Find the latest news on any topic and save them in your personal account.</p>
        </div>
        <form onSubmit={handleSearch} className="search__input">
          <input
            id="search"
            name="search"
            ref={inputRef}
            className="search__input-text"
            type="text"
            autoComplete="true"
            placeholder="Enter topic"
          />
          <button type="submit" className="search__input-button">
            Search
          </button>
        </form>
      </section>
      {isLoading ? (
        <Preloader />
      ) : triedTosearch && searchResults === 0 ? (
        <div className="searchresult__cards-listitem">
          <NotFound />
        </div>
      ) : (
        <SearchResults
          showMore={showMore}
          triedTosearch={triedTosearch}
          onClickShowmore={onClickShowmore}
          searchResults={searchResults}
          searchTerm={searchTerm}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default SearchForm;
