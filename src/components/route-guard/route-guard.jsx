import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../contexts/auth.provider";

const RouteGuard = ({ component: Component, path, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!authContext.auth) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/auth/login?target=${path}`} />;
        }
      }}
    />
  );
};
export default RouteGuard;
