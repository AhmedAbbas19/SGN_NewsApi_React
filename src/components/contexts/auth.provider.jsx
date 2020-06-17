import React, { useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthorizationToken } from "../../utils/utils";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(null);
  const [upToDate, setUptoDate] = useState(true);
  const [isLoading, setIsLoaing] = useState(false);

  const signup = async (values) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/users/`, values);
      setAuthentication(data);
    } catch (err) {
      toast.error(err.response.data.message, { id: 1 });
    }
  };

  const login = async (values) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/users/login`, values);
      setAuthentication(data);
    } catch (err) {
      toast.error(err.response.data.message, { id: 3 });
    }
  };

  const autoLogin = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/users/${storedToken}`);
        setAuth(data.user);
        setAuthorizationToken(storedToken);
      } catch (error) {
        toast.error("Your session has expired", { id: 2 });
        logout();
      }
    }
  };

  const setAuthentication = (data) => {
    setAuth(data.user);
    localStorage.setItem("token", data.token);
    setAuthorizationToken(data.token);
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
      } catch (err) {
        toast.error(err.response.data.message, { id: 5 });
      }
      setIsLoaing(false);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
