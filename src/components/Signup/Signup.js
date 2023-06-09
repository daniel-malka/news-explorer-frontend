<<<<<<< HEAD
import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { usePopup } from '../../contexts/PopupContext';

const Signup = ({ isLoading }) => {
  const { popupState, setPopupState } = usePopup();
=======
import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { usePopup } from '../../contexts/PopupContext';
const Signup = ({ isLoading, handleRegister, setErrMessage, errMessage }) => {
  const { popupState, setPopupState } = usePopup(false);
  const [isFormValid, setIsFormValid] = useState(false);
>>>>>>> stage-3

  const [userLoginInfo, setUserLoginInfo] = useState({
    email: '',
    password: '',
<<<<<<< HEAD
    userName: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    // reset the user login info
    setUserLoginInfo({
      email: '',
      password: '',
    });

    // close the signup popup
=======
    username: '',
  });

  const [validation, setValidation] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onClose = () => {
    setPopupState({
      ...popupState,
      signup: false,
    });
    setValidation({
      email: '',
      password: '',
      username: '',
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const { email, username, password } = userLoginInfo;
    handleRegister(email, username, password);
>>>>>>> stage-3
    setPopupState({
      ...popupState,
      signup: false,
      successPopup: true,
    });
<<<<<<< HEAD
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
=======
    setUserLoginInfo({
      email: '',
      password: '',
      username: '',
    });
    setValidation({
      email: '',
      password: '',
      username: '',
    });
  }

  const handleEmailInput = (e) => {
    const { name, value } = e.target;
    const emailPattern = /^[^\s@]{4,}@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = value.trim() !== '' && emailPattern.test(value);
    setValidation((prevValidation) => ({
      ...prevValidation,
      email: isEmailValid ? '' : 'Please enter a valid Email',
    }));

>>>>>>> stage-3
    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
  };

<<<<<<< HEAD
  return (
    <PopupWithForm
      isOpen={popupState.signup}
      onClose={() =>
        setPopupState({
          ...popupState,
          signup: false,
        })
      }
      title="sign up"
      name="signup"
      buttonText={`${isLoading ? 'Connecting...' : 'sign up'}`}
      onSubmit={handleSubmit}
    >
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
      <label className="signin-label" htmlFor="username">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="popup__input login-form__input"
        placeholder="user name"
        defaultValue={userLoginInfo.userName || ''}
        onChange={handleChange}
        required
      />
=======
  const handleNameInput = (e) => {
    const { name, value } = e.target;
    const isNameValid = value.trim() !== '';
    setValidation((prevValidation) => ({
      ...prevValidation,
      username: isNameValid ? '' : "User name can't be empty",
    }));

    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    const isPasswordValid = value.trim() !== '';
    setValidation((prevValidation) => ({
      ...prevValidation,
      password: isPasswordValid ? '' : "Password can't be empty",
    }));

    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
  };

  const signupValidtion =
    validation &&
    validation.email === '' &&
    validation.password === '' &&
    validation.ame === '';
  const validateForm = () => {
    if (
      userLoginInfo.email !== '' &&
      userLoginInfo.password !== '' &&
      userLoginInfo.username !== ''
    ) {
      setIsFormValid(true);
      if (signupValidtion) {
        setIsFormValid(true);
      }
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  });
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      setErrMessage={setErrMessage}
      errMessage={errMessage}
      validation={validation}
      isFormValid={isFormValid}
      isOpen={popupState.signup}
      setIsFormValid={setIsFormValid}
      onClose={onClose}
      title="sign up"
      name="signup"
      buttonText={`${isLoading ? 'Connecting...' : 'sign up'}`}
    >
      <div className="popup__inputs-div signup">
        <label className="signin-label signin-label-email" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="popup__input login-form__input"
          placeholder="Email"
          defaultValue={userLoginInfo.email}
          onChange={handleEmailInput}
          required
        />
        {validation.email !== '' && (
          <span className="popup__error-message email">{validation.email}</span>
        )}
      </div>
      <div className="popup__inputs-div signup">
        {' '}
        <label className="signin-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="popup__input login-form__input"
          placeholder="Password"
          defaultValue={userLoginInfo.password}
          onChange={handlePasswordInput}
          required
        />
        {validation.password !== '' && (
          <span className="popup__error-message password">
            {validation.password}
          </span>
        )}
      </div>
      <div className="popup__inputs-div signup">
        <label className="signin-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="popup__input login-form__input"
          placeholder="user name"
          defaultValue={userLoginInfo.username}
          onChange={handleNameInput}
          required
        />
        {validation.username !== '' && (
          <span className="popup__error-message username">
            {validation.username}
          </span>
        )}
      </div>
>>>>>>> stage-3
    </PopupWithForm>
  );
};
export default Signup;
