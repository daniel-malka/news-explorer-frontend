import { useState } from 'react';
import Nav from '../Navigation/Nav';
import SignUp from '../Signup/Signup';
import SignIn from '../Signin/Signin';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
const Popups = ({ signin, signup }) => {
  const { popupState, setPopupState } = usePopup();
  const { setIsLoggedIn, setToken, checkToken } = useAuth();
  const [errMessage, setErrMessage] = useState('');

  const handleLogin = (email, password) => {
    signin(email, password)
      .then((res) => {
        if (res.status === 401) {
          setErrMessage('incorrct Email or password');
        }
        res.json().then((res) => {
          if (res.token) {
            setIsLoggedIn(true);
            localStorage.setItem('token', res.token);
            setToken(res.token);
            checkToken(res.token);
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
  };

  const handleRegister = (email, username, password) => {
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
          if (res.user._id) {
            localStorage.setItem('email', email);
            setPopupState({
              popupState,
              signup: false,
              successPopup: true,
            });
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SignUp
        handleRegister={handleRegister}
        popupState={popupState}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
        setPopupState={setPopupState}
      />
      <SignIn
        handleLogin={handleLogin}
        popupState={popupState}
        setPopupState={setPopupState}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
      />
      <Nav popupState={popupState} />
      <SuccessPopup />
    </>
  );
};

export default Popups;
