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
import useStyles from "./signup-form-styles";

const schema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .trim()
    .min(4)
    .max(30)
    .matches(/^[a-zA-Z]+.*$/, "Full name must start with alphabetic letter")
    .matches(
      /^[a-zA-Z0-9_.-\s]*$/,
      "Full name can't contain special characters"
    ),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .trim()
    .min(8)
    .max(30)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password must contain at least 1 number, 1 lower-case and 1 upper-case letters."
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: "onBlur",
  });
  const classes = useStyles();

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
        onSubmit={handleSubmit(authContext.signup)}
        noValidate
        className={classes.form}
        autoComplete="off"
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              id="fullName"
              label="Full Name"
              fullWidth
              name="fullName"
              type="text"
              inputRef={register}
              helperText={errors.fullName?.message}
              error={!!errors.fullName}
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              fullWidth
              name="confirmPassword"
              type="password"
              inputRef={register}
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword}
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
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
