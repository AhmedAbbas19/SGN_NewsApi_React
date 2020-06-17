import React, { useContext } from "react";

import { AuthContext } from "../contexts/auth.provider";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./news-source-styles";

export default function NewsSource({ source }) {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  const isSubscribed = authContext.auth.sources.includes(source.id);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Category: {source.category}
        </Typography>
        <Typography variant="h5" component="h2">
          {source.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Language: {source.language}
        </Typography>
        <Typography variant="body2" component="p">
          {`${source.description.slice(0, 85)}${
            source.description.length > 85 && "..."
          }`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color={isSubscribed ? "default" : "secondary"}
          size="medium"
          onClick={() => authContext.subscribtion(source.id)}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </CardActions>
    </Card>
  );
}
