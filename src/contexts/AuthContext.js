import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    email: '',
    firstName: '',
    userName: '',
  });
  const history = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    history('/');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth };
