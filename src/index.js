import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PopupControler } from '../src/contexts/PopupContext';
import AuthProvider from '../src/contexts/AuthContext';
import ArticlesContextProvider from '../src/contexts/ArticlesContext';
import { HomeControler } from './contexts/HomeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <HomeControler>
        <AuthProvider>
          <PopupControler>
            <ArticlesContextProvider>
              <App />
            </ArticlesContextProvider>
          </PopupControler>
        </AuthProvider>
      </HomeControler>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();