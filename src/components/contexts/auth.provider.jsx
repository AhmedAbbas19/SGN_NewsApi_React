import React, { useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "../../api/axios";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(null);
  const [upToDate, setUptoDate] = useState(false);
  const [isLoading, setIsLoaing] = useState(false);

  const signup = async (values) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/users/`, values);
      setAuthentication(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const login = async (values) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/users/login`, values);
      setAuthentication(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const autoLogin = async () => {
    setIsLoaing(true);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/users/${storedToken}`);
        setAuth(data.user);
      } catch (error) {
        errorHandler(error);
      }
    }
    setIsLoaing(false);
  };

  const setAuthentication = (data) => {
    setAuth(data.user);
    localStorage.setItem("token", data.token);
    props.history.replace("/home");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuth(null);
    props.history.replace("/auth/login");
  };

  const subscribtion = async (sourceId) => {
    if (!isLoading) {
      setIsLoaing(true);
      try {
        // Obtimistic Update ;)
        const user = JSON.parse(JSON.stringify(auth));
        const isSubscribed = user.sources.includes(sourceId);
        if (isSubscribed) {
          user.sources = user.sources.filter((id) => sourceId !== id);
        } else {
          user.sources = [sourceId, ...user.sources];
        }
        setAuth(user);
        setUptoDate(false);

        await axios.post(`${BACKEND_URL}/users/subscribe/${sourceId}`);
      } catch (error) {
        errorHandler(error);
      }
      setIsLoaing(false);
    }
  };

  const errorHandler = (error) => {
    if (error.response.status === 401) {
      toast.error("Your session has expired", { id: 0 });
      logout();
    } else if (error.response.status >= 500) {
      toast.error("Something went wrong", { id: 1 });
    } else {
      toast.error(error.response.data.message, { id: 2 });
    }
  };

  const updateSubsState = (state) => {
    setUptoDate(state);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        signup,
        autoLogin,
        subscribtion,
        upToDate,
        updateSubsState,
        isLoading,
        errorHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
