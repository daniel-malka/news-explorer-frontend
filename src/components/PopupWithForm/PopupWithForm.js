import Popup from '../Popup/Popup';
import { usePopup } from '../../contexts/PopupContext';

const PopupWithForm = ({ buttonText, name, title, handleSubmit, errors, onClose, isOpen, children }) => {
  const { setPopupState } = usePopup();
  const popupToOpen = name === 'signin' ? 'signup' : 'signin';

  const handleRedirect = () => {
    setPopupState((prevState) => ({
      ...prevState,
      [name]: false,
      [popupToOpen]: true,
    }));
  };

  return (
    <Popup title={title} isOpen={isOpen} name={name} onClose={onClose}>
      <form className={`popup__inputs-container popup__inputs-${name}`} name={name} onSubmit={handleSubmit}>
        {children}
        <button
          className={`popup__submit-button popup__submit-button-${name} ${
            errors.email === '' && errors.password === '' ? 'popup__submit-button-filled' : ''
          }`}
          type="submit"
        >
          {buttonText}
        </button>
        <p>
          or
          <button type="button" className="signin__redirect-button" onClick={handleRedirect}>
            {popupToOpen}
          </button>
        </p>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
