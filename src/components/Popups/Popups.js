import Nav from '../Navigation/Nav';
import SignUp from '../Signup/Signup';
import SignIn from '../Signin/Signin';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import { usePopup } from '../../contexts/PopupContext';
const Popups = ({ handleLogin, handleRegister }) => {
  const { popupState, setPopupState } = usePopup();

  return (
    <>
      <SignUp handleRegister={handleRegister} popupState={popupState} setPopupState={setPopupState} />
      <SignIn handleLogin={handleLogin} popupState={popupState} setPopupState={setPopupState} />
      <Nav popupState={popupState} />
      <SuccessPopup />
    </>
  );
};

export default Popups;
