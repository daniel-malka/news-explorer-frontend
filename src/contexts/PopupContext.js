import { createContext, useState, useContext, useEffect } from 'react';

const PopupContext = createContext();
export const PopupControler = ({ children }) => {
  const [popupState, setPopupState] = useState({
    signin: false,
    signup: false,
    nav: false,
    successPopup: false,
  });

  const openPopup = (popupName) => {
    setPopupState({
<<<<<<< HEAD
      ...popupState,
      [popupName]: true,
    });
  };
  const closeAllPopups = () =>
    setPopupState(
      Object.keys(popupState).every((key) => (popupState[key] = false))
    );
=======
      popupState,
      [popupName]: true,
    });
  };
  const closeAllPopups = () => {
    setPopupState({
      signin: false,
      signup: false,
      nav: false,
      successPopup: false,
    });
  };

>>>>>>> stage-3
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    const closeOnClick = (evt) => {
<<<<<<< HEAD
      if (evt.target.classList.contains('popup_active')) {
=======
      if (
        evt.target.classList.contains('popup__active') ||
        evt.target.classList.contains('nav__active')
      ) {
>>>>>>> stage-3
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeOnClick);

<<<<<<< HEAD
    return () =>
      document.removeEventListener('keydown', closeByEscape) &&
      document.removeEventListener('click', closeOnClick);
=======
    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeOnClick);
    };
>>>>>>> stage-3
  });

  return (
    <PopupContext.Provider
      value={{ popupState, setPopupState, openPopup, closeAllPopups }}
    >
      {children}
    </PopupContext.Provider>
  );
};
export const usePopup = () => useContext(PopupContext);
