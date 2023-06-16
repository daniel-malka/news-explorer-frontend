<<<<<<< HEAD
import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';

const Signin = ({ isLoading }) => {
  const { popupState, setPopupState } = usePopup();
  const { setIsLoggedIn } = useAuth();

=======
import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SignIn = ({
  isLoading,
  handleLogin,
  popupState,
  setPopupState,
  errMessage,
  setErrMessage,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
>>>>>>> stage-3
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: '',
    password: '',
  });
<<<<<<< HEAD

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    // do something with the user login info

    // reset the user login info
    setUserLoginInfo({
      email: '',
      password: '',
    });

    // close the signin popup
=======
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userLoginInfo;
    handleLogin(email, password);
  }
  // reset the user login info

  const closePopup = () => {
>>>>>>> stage-3
    setPopupState({
      ...popupState,
      signin: false,
    });
<<<<<<< HEAD
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
  };
  return (
    <PopupWithForm
      isOpen={popupState.signin}
      onClose={() =>
        setPopupState({
          ...popupState,
          signin: false,
        })
      }
=======
  };
  const handleEmailInput = (event) => {
    const { name, value } = event.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = value.trim() !== '' && emailPattern.test(value);
    setValidation((prevValidation) => ({
      ...prevValidation,
      email: isEmailValid ? '' : 'Please add a correct email',
    }));

    setUserLoginInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handlePasswordInput = (event) => {
    const { name, value } = event.target;
    const isPasswordValid = value.trim() !== '';
    setValidation((prevValidation) => ({
      ...prevValidation,
      password: isPasswordValid ? '' : "Password can't be empty",
    }));

    setUserLoginInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    if (userLoginInfo.email !== '' && userLoginInfo.password !== '') {
      setIsFormValid(false);
      if (validation && validation.email === '' && validation.password === '') {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  useEffect(() => {
    validateInputs();
  });

  return (
    <PopupWithForm
      errMessage={errMessage}
      validation={validation}
      isFormValid={isFormValid}
      setErrMessage={setErrMessage}
      isOpen={popupState.signin}
      setIsFormValid={setIsFormValid}
      onClose={closePopup}
>>>>>>> stage-3
      title="sign in"
      name="signin"
      buttonText={`${isLoading ? 'Connecting...' : 'Sign in'}`}
      onSubmit={handleSubmit}
    >
<<<<<<< HEAD
      <label className="signin-label" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="popup__input login-form__input"
        placeholder="Email"
        value={userLoginInfo.email}
        onChange={handleChange}
        required
      />
      <label className="signin-label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="popup__input login-form__input"
        placeholder="Password"
        value={userLoginInfo.password}
        onChange={handleChange}
        required
      />
=======
      <div className="popup__inputs-div signin">
        <label className="signin-label signin-label-email" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="popup__input login-form__input"
          placeholder="Email"
          value={userLoginInfo.email}
          onChange={handleEmailInput}
          required
        />
        {validation.email !== '' && (
          <span className="popup__error-message email">{validation.email}</span>
        )}
      </div>
      <div className="popup__inputs-div signin">
        <label className="signin-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="popup__input login-form__input"
          placeholder="Password"
          value={userLoginInfo.password}
          onChange={handlePasswordInput}
          required
        />
        {validation.password !== '' && (
          <span className="popup__error-message password">
            {validation.password}
          </span>
        )}
      </div>
>>>>>>> stage-3
    </PopupWithForm>
  );
};

<<<<<<< HEAD
export default Signin;
=======
export default SignIn;
>>>>>>> stage-3
