import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import useStyles from "./Styles";
import { createpost, updatepost } from "../../actions/posts";
function Forms({ currentId, setCurrentID }) {
  const [postData, setpostData] = useState({
    
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user=JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatepost(currentId, {...postData,name:user?.result?.name}));
    } else {
      dispatch(createpost({...postData,name:user?.result?.name}));
    }
    clear()
  };
  const clear = () =>
   {
     setCurrentID(null)
     setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
   };
   if(!user?.result?.name){
     return (
<Paper className={classes.paper}>
  <Typography variant="h6" align="center"> Please sign in to create your own memories and like other memores</Typography>

</Paper>
     )
   }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setpostData({...postData,tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Forms;
