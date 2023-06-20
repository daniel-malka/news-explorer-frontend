import { useState } from 'react';
import Nav from '../Navigation/Nav';
import SignUp from '../Signup/Signup';
import SignIn from '../Signin/Signin';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from '../../contexts/PopupContext';
const Popups = ({ handleLogin, handleRegister }) => {
  const { popupState, setPopupState } = usePopup();

  const [errMessage, setErrMessage] = useState('');

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
