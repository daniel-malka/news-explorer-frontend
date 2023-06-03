import mainHeaderImg from '../../images/main.jpg';
import { data } from '../../data';
import { useEffect, useState } from 'react';
import SearchResolts from '../SearchResolts/SearchResolts';
import Preloader from '../Preloader/preloader';
import NotFound from '../NotFound/NotFound';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [handleSearchClicked, setHandleSearchClicked] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredArr = data;

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const onClickShowmore = (event) => {
    event.preventDefault();
    setShowMore(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = filteredArr.filter((article) =>
      article.keyword.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setSearchResults(filteredResults);
    setIsLoading(true);
    setHandleSearchClicked(true);
  };

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setIsLoading(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

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

        <form className="search__input">
          <input
            id="search"
            name="search"
            onChange={handleInputChange}
            className="search__input-text"
            type="text"
            autoComplete="true"
            placeholder="Enter topic"
          />
          <button onClick={handleSearch} className="search__input-button">
            Search
          </button>
        </form>
      </section>
      {isLoading ? (
        <Preloader />
      ) : searchResults.length === 0 ? (
        <NotFound />
      ) : (
        <SearchResolts
          showMore={showMore}
          onClickShowmore={onClickShowmore}
          searchResults={searchResults}
          handleSearchClicked={handleSearchClicked}
          filteredArr={filteredArr}
          searchTerm={searchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default SearchForm;
