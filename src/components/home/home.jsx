import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import { NewsContext } from "../contexts/news.provider";
import { AuthContext } from "../contexts/auth.provider";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import Article from "../article/article";
import ArticleSkeleton from "../../skeletons/article-skeleton";
import SkeletonContainer from "../../skeletons/skeleton-container";

export default () => {
  const newsContext = useContext(NewsContext);
  const authContext = useContext(AuthContext);

  const hasSubscribtion = !!newsContext.articles.length;

  useEffect(() => {
    if (!hasSubscribtion || !authContext.upToDate) {
      newsContext.getSubscribedArticles();
    }
  }, []);

  if (newsContext.isLoading) {
    return (
      <SkeletonContainer>
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
      </SkeletonContainer>
    );
  }

  return (
    <Container>
      <Typography variant="h4" color="primary" style={{ margin: "42px 0" }}>
        {hasSubscribtion
          ? "Latest News"
          : `Hello, ${authContext.auth.fullName}`}
      </Typography>

      {hasSubscribtion ? (
        <Grid container spacing={4}>
          {newsContext.articles.map((article) => (
            <Grid item xs={12} sm={6} lg={4} key={article.url}>
              <Article article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Fragment>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            component="p"
            style={{ margin: 0 }}
          >
            Subscribe to see Some Good News
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 22 }}
            component={Link}
            to="/sources"
          >
            Explore News Sources
          </Button>
        </Fragment>
      )}
    </Container>
  );
};
