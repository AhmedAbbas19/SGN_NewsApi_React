import React, { Fragment } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import RouteGuard from "../route-guard/route-guard";
import { ToastContainer } from "react-toastify";

import Header from "../header/header";
import Home from "../home/home";
import Sources from "../news-sources/news-sources";
import Login from "../login-form/login-form";
import SignUp from "../signup-form/signup-form";

export default () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Redirect from="/" to="/home" exact />
        <RouteGuard path="/sources" component={Sources} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={SignUp} />
        <RouteGuard path="/home" component={Home} />
      </Switch>
      <ToastContainer />
    </Fragment>
  );
};
