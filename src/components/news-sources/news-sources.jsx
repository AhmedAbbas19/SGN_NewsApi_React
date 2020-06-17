import React, { useEffect, useContext, useState } from "react";

import { NewsContext } from "../contexts/news.provider";
import { Container, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import SkeletonContainer from "../../skeletons/skeleton-container";
import SourceSkeleton from "../../skeletons/source-skeleton";

import NewsSource from "../news-source/news.source";

export default () => {
  const newsContext = useContext(NewsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const sourcesPortion = newsContext.sources.slice(startIndex, endIndex);

  useEffect(() => {
    if (!newsContext.sources.length) {
      newsContext.getSources();
    }
  }, []);

  if (newsContext.isLoading) {
    return (
      <SkeletonContainer>
        <SourceSkeleton />
        <SourceSkeleton />
        <SourceSkeleton />
      </SkeletonContainer>
    );
  }

  return (
    <Container>
      <Typography variant="h4" color="primary" style={{ margin: "42px 0" }}>
        Explore News Sources
      </Typography>
      <Grid container spacing={4}>
        {sourcesPortion.map((source) => (
          <Grid item xs={12} sm={6} md={4} key={source.id}>
            <NewsSource source={source} />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Pagination
            style={{ maxWidth: 400, margin: "0 auto" }}
            count={Math.ceil(newsContext.sources.length / pageSize)}
            color="secondary"
            onChange={(e, pageNumber) => setCurrentPage(pageNumber)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
