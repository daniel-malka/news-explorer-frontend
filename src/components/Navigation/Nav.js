import { usePopup } from '../../contexts/PopupContext';
import { Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Nav = () => {
  const elemntClass = document.getElementsByClassName('header__navburger');
  const { openPopup, popupState, closeAllPopups } = usePopup();
  const { isLoggedIn, handleLogout } = useAuth();

  const turnOffNav = () => {
    popupState.nav = false;
    elemntClass[0].classList.remove('open');
  };
  return (
<<<<<<< HEAD
    <div className={`navMobile ${popupState.nav ? 'nav_active' : ''}`}>
      <div className="navMobile__ul">
        {isLoggedIn ? (
          <>
            <p className="navMobile__ul-home">
=======
    <div className={`navmobile ${popupState.nav ? 'nav__active' : ''}`}>
      <div
        className={
          isLoggedIn ? `navmobile__ul navmobile__ul-logged` : `navmobile__ul`
        }
      >
        {isLoggedIn ? (
          <>
            <p className="navmobile__ul-home ">
>>>>>>> stage-3
              <NavLink onClick={closeAllPopups} to="/">
                Home
              </NavLink>
            </p>
            <p
<<<<<<< HEAD
              className="navMobile__ul-saved-articles"
=======
              className="navmobile__ul-saved-articles"
>>>>>>> stage-3
              onClick={() => {
                turnOffNav();
                closeAllPopups();
              }}
            >
              <NavLink to="/saved-news">Saved Articles</NavLink>
            </p>
            <p onClick={() => handleLogout()}>Log Out</p>
          </>
        ) : (
          <>
<<<<<<< HEAD
            <p className="navMobile__ul-home">
=======
            <p className="navmobile__ul-home ">
>>>>>>> stage-3
              <a href="/" onClick={closeAllPopups}>
                Home
              </a>
            </p>
            <button
<<<<<<< HEAD
              className="navMobile__signin"
=======
              className="navmobile__signin"
>>>>>>> stage-3
              onClick={() => {
                turnOffNav();
                openPopup('signin');
              }}
              elemnt={<Navigate replace to="/signin" />}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Nav;
