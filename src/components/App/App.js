import { useState } from 'react';
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
  const { setUser, user, setIsLoggedIn, setToken, checkToken } = useAuth();
  const [errMessage, setErrMessage] = useState('');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  if (!isLoggedIn && token && email) {
    setPopupState({
      ...popupState,
      signin: true,
    });
  }
  function handleLogin(email, password) {
    signin(email, password)
      .then((res) => {
        if (res.status === 401) {
          setErrMessage('incorrct Email or password');
        }
        res.json().then((res) => {
          console.log(res.user.username);
          setUser({ username: res.user.username });
          if (res.token) {
            setIsLoggedIn(true);
            localStorage.setItem('token', res.token);
            setToken(res.token);
            checkToken(res.token);
            localStorage.setItem('email', user.email);
            setPopupState({
              ...popupState,
              signin: false,
            });
            setErrMessage('');
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setErrMessage('User Does not exists');
      });
  }

  function handleRegister(email, username, password) {
    setErrMessage('');
    if (password.length <= 4) {
      setErrMessage('Password must be longer then 4 digits');
      return;
    } else if (username.length < 3) {
      setErrMessage('Name must be longer');
      return;
    }

    signup(email, username, password)
      .then((res) => {
        res.json().then((res) => {
          setUser(res.user);
          if (res.ok && res.user._id) {
            setPopupState({
              popupState,
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
