import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormAndValidation } from '../../utilities/useFormAndValidation';

import { usePopup } from '../../contexts/PopupContext';
const Signup = ({ isLoading, handleRegister }) => {
  const { popupState, setPopupState } = usePopup(false);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const onClose = () => {
    setPopupState({
      ...popupState,
      signup: false,
    });
    resetForm();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, username, password } = values;
    await handleRegister(email, username, password);
    onClose();
    resetForm();
    setPopupState({
      ...popupState,
      successPopup: true,
    });
  }

  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      errors={errors}
      isValid={isValid}
      isOpen={popupState.signup}
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
          defaultValue={values.email}
          onChange={handleChange}
          required
        />
        {errors.email !== '' && <span className="popup__error-message email">{errors.email}</span>}
      </div>
      <div className="popup__inputs-div signup">
        <label className="signin-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="popup__input login-form__input"
          placeholder="Password"
          defaultValue={values.password}
          onChange={handleChange}
          required
        />
        {errors.password !== '' && <span className="popup__error-message password">{errors.password}</span>}
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
          defaultValue={values.username}
          onChange={handleChange}
          required
        />
        {errors.username !== '' && <span className="popup__error-message username">{errors.username}</span>}
      </div>
    </PopupWithForm>
  );
};
export default Signup;
