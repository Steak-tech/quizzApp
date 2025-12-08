"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function Disconect() {
    setIsLoggedIn(false);
    setUser(null);
    delete localStorage.token;
    delete localStorage.user;
    delete localStorage.refresh;
  }
  function setAuthState({ isLoggedIn, user }) {
    setIsLoggedIn(isLoggedIn);
    setUser(user);
  }

  // La gestion du rafraichissement du token avec les Timestamp à été vu avec notre professeur de CSS Said.
  useEffect(() => {
    const token = localStorage.getItem("token")
    const refresh = localStorage.getItem("refresh")
    if(!token) return;
    if(!refresh) return;
    const refreshParsed = JSON.parse(refresh);
    if(refreshParsed && Date.now() > parseInt(refreshParsed.TIMESTAMP)){
      axios.post('http://localhost:8000/api/refresh/', {
        refresh: refreshParsed.token,
      }).then((res) => {
        localStorage.setItem('token', res.data.access);
        const refreshWithTimestamp = {
          token: res.data.refresh,
          TIMESTAMP: new Date().getTime() + 1 * 60 * 1000, // 1 minute
        };
        localStorage.setItem('refresh', JSON.stringify( refreshWithTimestamp ));
        setUser( JSON.parse(localStorage.getItem("user")).user );
        setIsLoggedIn(true);
      }).catch((err) => {
        Disconect();
      });
      return;
    }else{
      setIsLoggedIn(true);
      const user = localStorage.getItem("user");
      
      if(user){
        setUser( JSON.parse(user).user );
      }

    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setAuthState, user, setUser ,Disconect}}>
      {children}
    </AuthContext.Provider>
  );
};
