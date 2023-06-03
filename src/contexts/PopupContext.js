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

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    const closeOnClick = (evt) => {
      if (
        evt.target.classList.contains('popup__active') ||
        evt.target.classList.contains('nav__active')
      ) {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeOnClick);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeOnClick);
    };
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
