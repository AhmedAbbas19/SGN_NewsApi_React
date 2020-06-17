import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import queryString from "query-string";

import { AuthContext } from "../contexts/auth.provider";
import * as Yup from "yup";

import {
  TextField,
  Container,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import useStyles from "./login-form-styles";

const schema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required").min(7).max(30),
});

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });

  useEffect(() => {
    if (authContext.auth) {
      let params = queryString.parse(props.location.search);
      let target = params.target || "/home";
      props.history.push(target);
    }
  }, [authContext.auth, props.history, props.location.search]);

  return (
    <Container className={classes.container}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(authContext.login)}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              fullWidth
              name="email"
              type="email"
              inputRef={register}
              helperText={errors.email?.message}
              error={!!errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              fullWidth
              name="password"
              type="password"
              inputRef={register}
              helperText={errors.password?.message}
              error={!!errors.password}
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submitBtn}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
