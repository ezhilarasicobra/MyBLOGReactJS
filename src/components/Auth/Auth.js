import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./Styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import {signIn,signUp} from '../../actions/auth' 
const initialstate={firstName:'',lastName:'',email:'',password:'',confirmPassword:''} 
function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setisSignup] = useState(false);
  const [formData,setFormdata]=useState(initialstate)
  const dispatch = useDispatch();
  const history=useHistory()

  const handlesubmit = (e) => {
    e.preventDefault()
    //getting correct form data
    if(isSignup){
      
dispatch(signUp(formData,history))
    }
    else{
     
      dispatch(signIn(formData,history))
    }
  };
  const handlechange = (e) => {
    setFormdata({...formData,[e.target.name]:e.target.value})
  };
  const handleShowPassword = () =>
    setShowPassword((prevshowPassword) => !prevshowPassword);
  const switchmode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setShowPassword(false);
  };
  const googlesuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({type:'AUTH',data:{result,token}})
    history.push('/')
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const googlefailure = () => {
    console.log("Google sign in failed");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handlesubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handlechange={handlechange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handlechange={handlechange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handlechange={handlechange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handlechange={handlechange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handlechange={handlechange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="686752734869-nfuhbfi5ruvrav468f97a5m82lv6bhka.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign IN
              </Button>
            )}
            onSuccess={googlesuccess}
            onFailure={googlefailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchmode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Dont have an Account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
