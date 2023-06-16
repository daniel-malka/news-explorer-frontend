<<<<<<< HEAD
import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../utilities/MainApi';
>>>>>>> stage-3

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
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
            console.log(user);
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
        setUser,
        user,
        handleLogout,
      }}
>>>>>>> stage-3
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
