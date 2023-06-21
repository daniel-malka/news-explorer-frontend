import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Popups from '../Popups/Popups';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { signin, signup, checkToken } from '../../utilities/MainApi';
import { useAuth } from '../../contexts/AuthContext';
import { usePopup } from '../../contexts/PopupContext';
// css
import '../../index.css';

function App() {
  const { popupState, setPopupState } = usePopup();
  const { isLoggedIn } = useAuth();
  const { setUser, setIsLoggedIn, setToken } = useAuth();

  useEffect(() => {
    if (popupState.successPopup) {
      const timer = setTimeout(() => {
        setPopupState({
          ...popupState,
          successPopup: false,
          signin: true,
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [popupState, setPopupState]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsLoggedIn(true);
      setToken(token);
      checkToken(token);
    }
  }, [setUser, setIsLoggedIn, setToken]);

  function handleLogin(email, password) {
    signin(email, password)
      .then((res) => {
        res.json().then((res) => {
          if (res.token) {
            setIsLoggedIn(true);
            setUser(res.user);
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', res.user.email);
            setToken(res.token);
            checkToken(res.token);
            setPopupState({
              ...popupState,
              signin: false,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, username, password) {
    signup(email, username, password)
      .then((res) => {
        res.json().then((res) => {
          if (res.ok) {
            setPopupState({
              ...popupState,
              signup: false,
              successPopup: true,
            });
          }
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header />
              <SavedNews />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Popups signin={signin} signup={signup} handleLogin={handleLogin} handleRegister={handleRegister} />
    </div>
  );
}

export default App;
