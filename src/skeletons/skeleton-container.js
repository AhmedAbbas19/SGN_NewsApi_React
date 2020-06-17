import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <Typography variant="h4" color="primary" style={{ margin: "42px 0" }}>
        Loading...
      </Typography>
      <Grid container spacing={4}>
        {props.children}
      </Grid>
    </Container>
  );
};
