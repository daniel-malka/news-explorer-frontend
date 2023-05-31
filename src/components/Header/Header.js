import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
// images
import nav1 from '../../images/header/Rectangle1.png';
import nav2 from '../../images/header/Rectangle2.png';
import exitImg from '../../images/icons/logout.svg';
import exitImgDark from '../../images/icons/logout-dark.svg';
import blackLogo from '../../images/blackLogo.svg';
import logo from '../../images/logo.svg';
// context
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';

function Header() {
  const { isHome, location } = useHome();
  const { openPopup, closeAllPopups } = usePopup();
  const elemntClass = document.getElementsByClassName('header__navburger');
  const liClass = document.querySelectorAll('.header__button');
  const { isLoggedIn, user, handleLogout } = useAuth();

  const navBurgerChange = () => {
    if (!elemntClass[0].classList.contains('open')) {
      elemntClass[0].classList.add('open');
    } else {
      elemntClass[0].classList.remove('open');
      closeAllPopups();
    }
  };

  useEffect(() => {
    isHome
      ? liClass.forEach((li) => li.classList.add('header__active-white'))
      : liClass.forEach((li) => li.classList.add('li__active-dark'));

    // Add padding-top: 11px to header__home and header__saved classes
    const homeElements = document.querySelectorAll(
      '.header__link .header__saved'
    );
    homeElements.forEach((element) => {
      element.style.paddingTop = '11px';
    });
  }, [location, isHome, liClass]);
  return (
    <header className={isHome ? 'header' : 'header white-bg'}>
      <div className="header__wrap">
        <img
          src={isHome ? logo : blackLogo}
          alt="Logo"
          className="header__logo"
        />
        <ul className="header__div">
          {isLoggedIn ? (
            <>
              <li
                onClick={() => handleLogout()}
                className={
                  isHome ? 'header__logout header__button' : 'header__logout '
                }
              >
                {user.userName == '' ? `Daniel` : user.userName}
                <img
                  className="header__button-image"
                  src={isHome ? exitImg : exitImgDark}
                  alt="Log out"
                />
              </li>
              <li
                className={
                  isHome
                    ? 'header__saved header__button header__active-white header__items'
                    : 'header__saved header__button selected-dark'
                }
              >
                <NavLink
                  to="/saved-news"
                  className={
                    isHome
                      ? 'header__saved header__button header__active-white header__items'
                      : 'header__saved header__button selected-dark'
                  }
                  end
                >
                  saved news
                </NavLink>
              </li>
              <li
                className={
                  isHome
                    ? 'header__home header__button header__active-white selected'
                    : 'header__home-dark header__button'
                }
              >
                <NavLink
                  className={
                    isHome
                      ? 'header__home header__button header__active-white selected'
                      : 'header__home header__button'
                  }
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
          <img className="navFirst" src={nav1} alt="" />
          <img className="navSecond" src={nav2} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Header;
