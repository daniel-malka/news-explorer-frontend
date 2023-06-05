import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popups from '../Popups/Popups';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import { signin, signup } from '../../utilities/MainApi';

// css
import '../../index.css';

// import "../Preloader/preloader.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute>
              <SavedNews />
            </ProtectedRoute>
          }
        />
        <Route exact path="*" element={<Main />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
      <Popups signIn={signin} signUp={signup} />
    </div>
  );
}
export default App;
