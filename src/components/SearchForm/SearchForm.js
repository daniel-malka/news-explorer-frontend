import mainHeaderImg from '../../images/main.jpg';
import { useState, useRef } from 'react';
import { useArticles } from '../../contexts/ArticlesContext';
import SearchResults from '../SearchResults/SearchResults';
import Preloader from '../Preloader/preloader';
import NotFound from '../NotFound/NotFound';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [showMore, setShowMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [screenWidth] = useState(window.innerWidth);
  const { api } = useArticles();
  const inputRef = useRef('');

  const onClickShowmore = async (event) => {
    event.preventDefault();
    console.log(searchResults);
    if (screenWidth > 700) {
      setCounter(counter + 3);
    } else if (screenWidth > 500) {
      setCounter(counter + 2);
    } else if (screenWidth <= 500) {
      setCounter(counter + 1);
    }

    let filter =
      allResults.length > 3
        ? [...allResults].slice(0, counter)
        : (allResults, setShowMore(false));

    setSearchResults(filter);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (counter > 3) {
      if (screenWidth > 700) {
        setCounter(counter + 3);
      } else if (screenWidth > 500) {
        setCounter(counter + 2);
      } else if (screenWidth <= 500) {
        setCounter(counter + 1);
      }
    }

    const input = inputRef.current.value;
    setSearchTerm(input);
    setIsLoading(true);

    try {
      const response = await api.newsApi.getArticles(input);
      const { articles } = await response.json();
      setAllResults(articles);
      console.log('allResults', allResults);
      console.log('articles', articles);
      const filter =
        articles.length > 3
          ? [...articles].slice(0, counter)
          : (articles, setShowMore(false));
      setSearchResults(filter);
      setIsLoading(false);
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
        <div className="search__text">
          <h1 className="search__title">What's going on in the world?</h1>
          <p className="search__pargraph">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
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
      {isLoading && <Preloader />}
      {searchResults === undefined ? (
        <NotFound />
      ) : (
        <SearchResults
          showMore={showMore}
          onClickShowmore={onClickShowmore}
          searchResults={searchResults}
          searchTerm={searchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default SearchForm;
