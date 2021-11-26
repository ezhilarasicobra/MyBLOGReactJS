import React from "react";
import useStyles from "./Styles";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";

import { useSelector } from "react-redux";
function Posts({currentId,setCurrentID}) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentID={setCurrentID}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
