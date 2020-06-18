import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

export default () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Skeleton
            animation="wave"
            width="40%"
            height={10}
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            width="50%"
            height={10}
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            width="40%"
            height={10}
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation="wave" height={50} style={{ marginBottom: 6 }} />
        </CardContent>
        <CardActions>
          <Skeleton
            animation="wave"
            width="30%"
            height={50}
            style={{ marginBottom: 6 }}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};
