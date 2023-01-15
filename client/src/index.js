import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import setAuthHeader from './Authentication/setAuthentication'

if (localStorage.Token){ 
    setAuthHeader(localStorage.Token.replace(/['"]+/g, ''))
}else{
  console.log("else jwt");

    setAuthHeader(false)
    localStorage.clear()
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error?.response?.status == 401) {
        localStorage.removeItem("user-info");
        localStorage.removeItem("jwt");
        setAuthHeader(false)
        // router.push({ name: 'signUp' })
    }
    return Promise.reject(error);
});

const options = {
  offset: '30px',
  transition: transitions.FADE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <Navbar/>
      <App />
      <Footer/>
    </AlertProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
