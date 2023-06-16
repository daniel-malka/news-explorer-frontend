import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popups from '../Popups/Popups';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
<<<<<<< HEAD
// import { useAuth } from '../../contexts/AuthContext';
=======
import { signin, signup } from '../../utilities/MainApi';
>>>>>>> stage-3

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
<<<<<<< HEAD
      <Popups />
=======
      <Popups signin={signin} signup={signup} />
>>>>>>> stage-3
    </div>
  );
}
export default App;
