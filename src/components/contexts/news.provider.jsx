import React, { useState, useContext } from "react";
import { BACKEND_URL } from "../../config";
import axios from "../../api/axios";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/auth.provider";
import { toast } from "react-toastify";

export const NewsContext = React.createContext();

const NewsProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);

  const getSubscribedArticles = async (page) => {
    try {
      setIsLoaing(true);
      const { data } = await axios.get(`${BACKEND_URL}/news/${page}`);
      if (data.articles.length) {
        setArticles(data.articles);
      } else {
        toast.info("No more Articles", { id: 0 });
      }
    } catch (error) {
      setArticles([]);
      authContext.errorHandler(error);
    }
    setIsLoaing(false);
    authContext.updateSubsState(true);
  };

  const getSources = async () => {
    try {
      setIsLoaing(true);
      const { data } = await axios.get(`${BACKEND_URL}/sources`);
      setSources(data.sources);
    } catch (error) {
      authContext.errorHandler(error);
    }
    setIsLoaing(false);
  };

  return (
    <NewsContext.Provider
      value={{
        getSubscribedArticles,
        articles,
        getSources,
        sources,
        isLoading,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default withRouter(NewsProvider);
