import React, { useContext, Fragment, useState, useEffect } from "react";

import { AuthContext } from "../contexts/auth.provider";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Container,
} from "@material-ui/core";
import useStyles from "./header-styles";

export default () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(location.pathname === "/sources" ? 1 : 0);
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/home"
            color="inherit"
          >
            SGN
          </Typography>

          {!!authContext.auth && (
            <Fragment>
              <Tabs variant="fullWidth" value={value}>
                <Tab
                  label="Home"
                  component={Link}
                  to="/home"
                  className={classes.tapHight}
                />
                <Tab
                  label="Explore"
                  component={Link}
                  to="/sources"
                  className={classes.tapHight}
                />
              </Tabs>
              <Button onClick={authContext.logout} color="inherit">
                Logout
              </Button>
            </Fragment>
          )}

          {!!authContext.auth ? (
            ""
          ) : (
            <Fragment>
              <Button component={Link} to="/auth/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/auth/signup" color="inherit">
                Sign up
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
