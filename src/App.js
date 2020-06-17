import React, { useEffect, useContext } from "react";
import "./App.css";
import Index from "./components/index/index";
import { AuthContext } from "./components/contexts/auth.provider";

function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    document.title = "Some Good News";
    authContext.autoLogin();
  }, []);
  return <Index />;
}

export default App;
