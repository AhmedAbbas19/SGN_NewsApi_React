import React, { useState, useContext } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth.provider";

export const NewsContext = React.createContext();

const NewsProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);

  const getSubscribedArticles = async () => {
    try {
      setIsLoaing(true);
      const { data } = await axios.get(`${BACKEND_URL}/news`);
      setArticles(data.articles);
    } catch (error) {
      setArticles([]);
      toast.info(error.response.data.message, { id: 0 });
    }
    setIsLoaing(false);
    authContext.updateSubsState(true);
  };

  const getSources = async () => {
    try {
      setIsLoaing(true);
      const { data } = await axios.get(`${BACKEND_URL}/news/sources`);
      setSources(data.sources);
    } catch (error) {
      toast.error(error.response.data.message, { id: 1 });
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
