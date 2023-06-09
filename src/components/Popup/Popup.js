<<<<<<< HEAD
import './Popup.css';
const Popup = ({  isOpen,onClose, name, title, children }) => {
 return (
        <div
            className={`popup ${name} ${isOpen ? "popup__active" : ""}`}
        >
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Popup;
=======
const Popup = ({ isOpen, onClose, name, title, children }) => {
  return (
    <div className={`popup ${name} ${isOpen ? 'popup__active' : ''}`}>
      <div
        className={
          name === 'success'
            ? 'popup__container success__container'
            : name === 'signup'
            ? 'popup__container signup__container'
            : 'popup__container'
        }
      >
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;
>>>>>>> stage-3
