import React,{ useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Forms from '../Forms/Forms'
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getposts } from "../../actions/posts";
import useStyles from '../Posts/Styles'
function Home() {
  const [currentId,setCurrentID]=useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getposts());
  }, [currentId,dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Forms currentId={currentId} setCurrentID={setCurrentID} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
