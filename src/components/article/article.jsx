import React, { useState } from "react";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./article-styles";
import Moment from "react-moment";

export default ({ article }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {article.source.name.slice(0, 2)}
          </Avatar>
        }
        title={`${article.title.slice(0, 60)}${
          article.title.length > 60 && "..."
        }`}
      />
      <CardMedia
        className={classes.media}
        image={
          article.urlToImage === "null"
            ? "/imgs/Some_Good_News.jpg"
            : article.urlToImage
        }
        title={article.title}
        component="a"
        href={`${article.url}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Published By: {article.source.name} <br></br>
          <Moment fromNow>{article.publishedAt}</Moment>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Title: {article.title}</Typography>
          <Typography paragraph>{article.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
