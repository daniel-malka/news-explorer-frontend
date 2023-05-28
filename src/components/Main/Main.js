import { Routes, Route } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <SearchForm />
              <About />
            </>
          }
        />
      </Routes>
    </main>
  );
};
export default Main;
