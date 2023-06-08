import mainHeaderImg from '../../images/main.jpg';
import { useState, useRef } from 'react';
import { useArticles } from '../../contexts/ArticlesContext';
import SearchResults from '../SearchResults/SearchResults';
import Preloader from '../Preloader/preloader';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [handleSearchClicked] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allResolts, setAllResolts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [screenWidth] = useState(window.innerWidth);
  const { api } = useArticles();
  const inputRef = useRef('');
  let filter = '';

  const onClickShowmore = async (event) => {
    event.preventDefault();
    setShowMore(true);

    let nextCounter;
    if (screenWidth > 700) {
      nextCounter = counter + 3;
    } else if (screenWidth > 500) {
      nextCounter = counter + 2;
    } else if (screenWidth <= 500) {
      nextCounter = counter + 1;
    }

    const allResoltsArr = Array.from(allResolts);
    console.log(allResoltsArr);
    const filter =
      allResoltsArr.length > 3 && showMore === false
        ? Object.values(allResoltsArr.slice(0, nextCounter))
        : allResoltsArr.articles;
    setSearchResults(filter);
    // setCounter(nextCounter);
    setShowMore(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const input = inputRef.current.value;
    setSearchTerm(input);
    setIsLoading(true);
    console.log(searchTerm);
    try {
      const response = await api.newsApi.getArticles(searchTerm);
      const data = await response.json();
      setAllResolts(data);

      let nextCounter;
      if (screenWidth > 700) {
        nextCounter = 3;
      } else if (screenWidth > 500) {
        nextCounter = 2;
      } else if (screenWidth <= 500) {
        nextCounter = 1;
      }

      filter =
        data.articles.length > 3 && showMore === false
          ? Object.values(data.articles.slice(0, nextCounter))
          : data.articles;
      setSearchResults(filter);
      setCounter(nextCounter);
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
      {isLoading || !searchResults.length === 0 ? (
        <Preloader />
      ) : (
        <SearchResults
          showMore={showMore}
          onClickShowmore={onClickShowmore}
          searchResults={Object.values(searchResults)}
          handleSearchClicked={handleSearchClicked}
          searchTerm={searchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default SearchForm;
