import React from 'react'
import Markup from "./jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './jsx/components/Navbar'
import Footer from './jsx/components/Footer'
import setAuthHeader from './Authentication/setAuthentication'



if (localStorage.Token) {
  setAuthHeader(localStorage.Token.replace(/['"]+/g, ''))
} else {
  console.log("else jwt");
  setAuthHeader(false)
  localStorage.clear()
}

// const navigate = useNavigate();
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error?.response?.status == 401) {
    localStorage.removeItem("userMailId");
    localStorage.removeItem("Token");
    setAuthHeader(false)
    // navigate('/', { replace: true });
  }
  return Promise.reject(error);
});
export default function App() {
  return (
    <BrowserRouter>      
        <Navbar />
            <Markup/>
        <Footer />     
    </BrowserRouter>
  );
}


