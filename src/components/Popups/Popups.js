import { useState } from 'react';
import Nav from '../Navigation/Nav';
import Signup from '../Signup/Signup';
import Signin from '../Signin/Signin';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
const Popups = ({ signIn, signUp }) => {
  const { popupState, setPopupState } = usePopup();
  const { setIsLoggedIn, setToken, checkToken } = useAuth();
  const [errMessage, setErrMessage] = useState('');

  const handleLogin = (email, password) => {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          localStorage.setItem('token', res.token);
          setToken(res.token);
          checkToken(res.token);
          setPopupState({
            ...popupState,
            signin: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMessage('User Does not exists');
      });
  };

  const handleRegister = (email, username, password) => {
    setErrMessage('');
    if (password.length < 4) {
      setErrMessage('Password must be longer then 4 digits');
      return;
    } else if (username.length < 3) {
      setErrMessage('Name must be longer');
      return;
    }

    signUp(email, username, password)
      .then((res) => {
        if (res.data._id) {
          localStorage.setItem('email', email);
          setPopupState({
            popupState,
            signup: false,
            successPopup: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Signup
        handleRegister={handleRegister}
        popupState={popupState}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
      />
      <Signin
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
