import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../utilities/MainApi';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    email: '',
    username: '',
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setToken(localStorage.getItem('token'));
    history('/');
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem('token')) {
      checkToken(token)
        .then((res) => {
          if (res._id) {
            setIsLoggedIn(true);
            setUser({
              email: res.email,
              username: res.username,
              id: res._id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          history('/');
          setIsLoggedIn(false);
        });
    }
  }, [history, token, isLoggedIn]);
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
