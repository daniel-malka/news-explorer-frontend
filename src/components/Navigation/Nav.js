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
    <div className={`navMobile ${popupState.nav ? 'nav_active' : ''}`}>
      <div className="navMobile__ul">
        {isLoggedIn ? (
          <>
            <p className="navMobile__ul-home">
              <NavLink onClick={closeAllPopups} to="/">
                Home
              </NavLink>
            </p>
            <p
              className="navMobile__ul-saved-articles"
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
            <p className="navMobile__ul-home">
              <a href="/" onClick={closeAllPopups}>
                Home
              </a>
            </p>
            <button
              className="navMobile__signin"
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
