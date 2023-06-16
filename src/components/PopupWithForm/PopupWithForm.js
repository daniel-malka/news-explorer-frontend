<<<<<<< HEAD
import Popup from "../Popup/Popup";
import { usePopup } from '../../contexts/PopupContext';
const PopupWithForm = (props) => {
    const popupContext = usePopup();
    let popupToOpen = props.name === 'signin' ? 'signup' : 'signin';
    const handleRedirect = () => {
        popupContext.closeAllPopups();
        popupContext.openPopup(popupToOpen);
    };
    return (
        <Popup title={props.title} isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
            <form
                action="submit"
                className={`popup__inputs-container popup__inputs-${props.name}`}
                name={props.name}
                onSubmit={props.onSubmit}
            >
                {props.children}
                <button
                    className={`popup__submit-button popup__submit-button-${props.name}`}
                    type="submit"
                >
                    {props.buttonText}
                </button>
                <p> or <button type="button" className="signin__redirect-button" onClick={handleRedirect} >{popupToOpen} </button></p>
            </form>

        </Popup>
    );
=======
import Popup from '../Popup/Popup';
import { usePopup } from '../../contexts/PopupContext';

const PopupWithForm = (props) => {
  const { popupState, setPopupState } = usePopup();
  const popupToOpen = props.name === 'signin' ? 'signup' : 'signin';

  const handleRedirect = () => {
    props.setIsFormValid(true);
    setPopupState((prevState) => ({
      ...prevState,
      [props.name]: false,
      [popupToOpen]: true,
    }));
  };

  return (
    <Popup
      title={props.title}
      isOpen={props.isOpen}
      name={props.name}
      onClose={props.onClose}
    >
      <form
        className={`popup__inputs-container popup__inputs-${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button
          className={`popup__submit-button popup__submit-button-${props.name} ${
            props.validation.email === '' && props.validation.password === ''
              ? 'popup__submit-button-filled'
              : ''
          }`}
          type="submit"
        >
          {props.buttonText}
        </button>
        <p>
          or{' '}
          <button
            type="button"
            className="signin__redirect-button"
            onClick={handleRedirect}
          >
            {popupToOpen}
          </button>
        </p>
      </form>
    </Popup>
  );
>>>>>>> stage-3
};

export default PopupWithForm;
