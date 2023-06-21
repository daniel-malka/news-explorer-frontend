import { useFormAndValidation } from '../../utilities/useFormAndValidation';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SignIn = ({ isLoading, handleLogin, popupState, setPopupState }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const onClose = () => {
    setPopupState({
      ...popupState,
      signin: false,
    });
    resetForm();
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    handleLogin(email, password);
    onClose();
  }

  return (
    <PopupWithForm
      onClose={onClose}
      errors={errors}
      isValid={isValid}
      isOpen={popupState.signin}
      handleSubmit={handleSubmit}
      title="sign in"
      name="signin"
      buttonText={`${isLoading ? 'Connecting...' : 'Sign in'}`}
    >
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
          defaultValue={values.email}
          onChange={handleChange}
          required
        />
        {errors.email !== '' && <span className="popup__error-message email">{errors.email}</span>}
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
          defaultValue={values.password}
          onChange={handleChange}
          required
        />
        {errors.password !== '' && <span className="popup__error-message password">{errors.password}</span>}
      </div>
    </PopupWithForm>
  );
};

export default SignIn;
