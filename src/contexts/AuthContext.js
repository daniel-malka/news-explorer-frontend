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
    firstName: '',
    userName: '',
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.clear();
    setToken(localStorage.getItem('token'));
    history('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkToken(token)
        .then((res) => {
          if (res._id) {
            setIsLoggedIn(true);
            setUser({
              email: res.email,
              firstName: res.name,
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
  }, [history, token]);
  return (
    <AuthContext.Provider
      value={{
        checkToken,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
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
