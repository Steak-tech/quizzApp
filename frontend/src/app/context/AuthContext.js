"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // NOUVEAU : On ajoute un état de chargement initial
  const [authLoading, setAuthLoading] = useState(true);

  function Disconect() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
  }

  function setAuthState({ isLoggedIn, user }) {
    setIsLoggedIn(isLoggedIn);
    setUser(user);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");

    if (!token || !refresh) {
      setAuthLoading(false);
      return;
    }

    const refreshParsed = JSON.parse(refresh);

    if (refreshParsed && Date.now() > parseInt(refreshParsed.TIMESTAMP)) {
      axios.post('http://localhost:8000/api/refresh/', {
        refresh: refreshParsed.token,
      }).then((res) => {
        localStorage.setItem('token', res.data.access);
        const refreshWithTimestamp = {
          token: res.data.refresh,
          TIMESTAMP: new Date().getTime() + 1 * 60 * 1000,
        };
        localStorage.setItem('refresh', JSON.stringify(refreshWithTimestamp));

        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        setIsLoggedIn(true);
      }).catch((err) => {
        Disconect();
      }).finally(() => {
        setAuthLoading(false);
      });

    } else {
      setIsLoggedIn(true);
      const userStored = localStorage.getItem("user");
      if (userStored) {
        setUser(JSON.parse(userStored).user);
      }
      setAuthLoading(false);
    }
  }, []);

  return (
      <AuthContext.Provider value={{ isLoggedIn, setAuthState, user, setUser, Disconect, authLoading }}>
        {children}
      </AuthContext.Provider>
  );
};