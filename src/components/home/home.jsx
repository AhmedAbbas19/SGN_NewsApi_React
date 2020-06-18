import React, { useEffect, useContext, Fragment, useState } from "react";
import usePrevious from "../../custom-hooks/use-previous";
import { Link } from "react-router-dom";

import { NewsContext } from "../contexts/news.provider";
import { AuthContext } from "../contexts/auth.provider";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import Article from "../article/article";
import ArticleSkeleton from "../../skeletons/article-skeleton";
import SkeletonContainer from "../../skeletons/skeleton-container";
import Pagination from "@material-ui/lab/Pagination";

export default () => {
  const newsContext = useContext(NewsContext);
  const authContext = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const prevPageNumber = usePrevious(currentPage) || 1;

  const hasSubscribtion = !!newsContext.articles.length;

  useEffect(() => {
    if (currentPage !== prevPageNumber || !authContext.upToDate) {
      newsContext.getSubscribedArticles(currentPage);
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

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
            <Grid item xs={12} sm={6} md={4} key={article.url}>
              <Article article={article} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination
              style={{ maxWidth: 400, margin: "0 auto" }}
              count={5}
              color="secondary"
              page={currentPage}
              onChange={(e, pageNumber) => setCurrentPage(pageNumber)}
            />
          </Grid>
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
