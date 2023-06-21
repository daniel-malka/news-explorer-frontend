import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../utilities/MainApi';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({ email: '', username: '' });

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    setToken(localStorage.getItem('token'));
    navigate('/');
  }

  useEffect(() => {
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res._id) {
            setIsLoggedIn(true);
            setUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/');
          setIsLoggedIn(false);
        });
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        checkToken,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        setUser,
        user,
        handleLogout,
      }}
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
