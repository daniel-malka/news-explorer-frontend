<<<<<<< HEAD
import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
// images
import nav1 from '../../images/header/Rectangle1.png';
import nav2 from '../../images/header/Rectangle2.png';
import exitImg from '../../images/icons/logout.svg';
import blackLogo from '../../images/blackLogo.svg';
import logo from '../../images/logo.png';
=======
import React, { useLayoutEffect, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
// images
import menuWhite from '../../images/icons/menuW.svg';
import menuBlack from '../../images/icons/menuB.svg';
import exitImg from '../../images/icons/logout.svg';
import exitImgDark from '../../images/icons/logout-dark.svg';
import blackLogo from '../../images/blackLogo.svg';
import whiteLogo from '../../images/logo.svg';
>>>>>>> stage-3
// context
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';

function Header() {
<<<<<<< HEAD
  const { isHome, location } = useHome();
=======
  const { isHome } = useHome();
>>>>>>> stage-3
  const { openPopup, closeAllPopups } = usePopup();
  const elemntClass = document.getElementsByClassName('header__navburger');
  const liClass = document.querySelectorAll('.header__button');
  const { isLoggedIn, user, handleLogout } = useAuth();
<<<<<<< HEAD
  const navBurgerChange = () => {
=======
  const location = useLocation();

  let [isSavedNews, setIsSavedNews] = useState(false);
  let [isNavActive, setIsNavActive] = useState(false);

  isSavedNews = location.pathname === '/saved-news';

  const navBurgerChange = () => {
    setIsNavActive(!isNavActive);
>>>>>>> stage-3
    if (!elemntClass[0].classList.contains('open')) {
      elemntClass[0].classList.add('open');
    } else {
      elemntClass[0].classList.remove('open');
      closeAllPopups();
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    isHome
      ? liClass.forEach((li) => li.classList.add('header__active-white'))
      : liClass.forEach((li) => li.classList.add('li__active-dark'));
  }, [location, isHome, liClass]);
  return (
    <header className={isHome ? 'header' : 'header white-bg '}>
      <div className="header__wrap">
        <img
          src={isHome ? logo : blackLogo}
=======
  useLayoutEffect(() => {
    setIsSavedNews(location.pathname === '/saved-news');
  }, [location]);

  useLayoutEffect(() => {
    isHome
      ? liClass.forEach((li) => li.classList.add('header__active'))
      : liClass.forEach((li) => li.classList.add('li__active-dark'));

    // Add padding-top: 11px to header__home and header__saved classes
    const homeElements = document.querySelectorAll('.header__link .header__saved');
    homeElements.forEach((element) => {
      element.style.paddingTop = '11px';
    });
  });

  return (
    <header className={isHome || isSavedNews ? `header` : 'header white-bg'}>
      <div className="header__wrap">
        <img
          src={isHome || (isNavActive && isSavedNews) || (!isSavedNews && !isNavActive) ? whiteLogo : blackLogo}
>>>>>>> stage-3
          alt="Logo"
          className="header__logo"
        />
        <ul className="header__div">
          {isLoggedIn ? (
            <>
<<<<<<< HEAD
              <li
                onClick={() => handleLogout()}
                className={
                  isHome
                    ? 'header__link header__button'
                    : 'header__link header__button-dark'
                }
              >
                {user.userName}
                <img
                  className={
                    isHome
                      ? 'header__button-image'
                      : 'header__button-image-dark'
                  }
                  src={exitImg}
                  alt="Log out"
                />
              </li>
              <li>
                <NavLink
                  to="/saved-news"
                  end
                  className={
                    isHome
                      ? 'header__link header__button header__active-white '
                      : 'header__link header__button selected-dark'
                  }
=======
              <li onClick={() => handleLogout()} className={isHome ? 'header__logout header__button' : 'header__logout '}>
                {user.username}
                <img className="header__button-image" src={isHome ? exitImg : exitImgDark} alt="Log out" />
              </li>
              <li
                className={
                  isHome
                    ? 'header__saved header__button header__active header__items'
                    : 'header__saved header__button selected-dark'
                }
              >
                <NavLink
                  to="/saved-news"
                  className={
                    isHome
                      ? 'header__saved header__button header__active header__items'
                      : 'header__saved header__button selected-dark'
                  }
                  end
>>>>>>> stage-3
                >
                  saved news
                </NavLink>
              </li>
<<<<<<< HEAD
              <li>
                <NavLink
                  className={
                    isHome
                      ? 'header__link header__button header__active-white selected'
                      : 'header__link header__button '
                  }
=======
              <li className={isHome ? 'header__home header__button header__active selected' : 'header__home-dark header__button'}>
                <NavLink
                  className={isHome ? 'header__home header__button header__active selected' : 'header__home header__button'}
>>>>>>> stage-3
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
<<<<<<< HEAD
              {' '}
=======
>>>>>>> stage-3
              <li
                onClick={() => openPopup('signin')}
                className="header__link header__button"
                elemnt={<Navigate replace to="/signin" />}
              >
                Sign in
              </li>
              <li className="header__home header__button selected">
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div
          className={isHome ? `header__navburger` : 'header__navburger dark'}
          onClick={() => {
            openPopup('nav');
            navBurgerChange();
          }}
        >
<<<<<<< HEAD
          <img className="navFirst" src={nav1} alt="" />
          <img className="navSecond" src={nav2} alt="" />
=======
          <img className="navFirst" src={isHome ? menuWhite : menuBlack} alt="open or close navigation menu" />
          <img className="navSecond" src={isHome ? menuWhite : menuBlack} alt="open or close navigation menu" />
>>>>>>> stage-3
        </div>
      </div>
    </header>
  );
}

export default Header;
