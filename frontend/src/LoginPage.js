import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useRef } from "react";
import { login, signUp } from "./axios";
import GoogleLogin from "react-google-login";
import { Puff } from '@agney/react-loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: "10px",
    backgroundColor: "rgba(216,234,245,0.8)",
    boxShadow: "1px 1px 3px 4px rgba(170,180,200,0.8)",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  signup: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }
}));

const LoginPage = ({ toSignUp, toEditor, setToken, setUsername, setStatus }) => {
  const classes = useStyles();
  
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameOrEmailError, setUsernameOrEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    if (usernameOrEmail !== "" && password !== "") {
      setLoading(true)
      const { status, token, username } = await login({ usernameOrEmail, password });
      setLoading(false)
      if (status === "ok") {
        setStatus({ type: "success", msg: "Logged in successfully." });
        setToken(token);
        setUsername(username);
        toEditor();
      } else {
        if (status === "wrong username/password") {
          setUsernameOrEmailError(true);
          setPasswordError(true);
          setStatus({ type: "error", msg: "Wrong username/password." })
        } else {
          // unexpected error
        }
      }
    } else {
      let errorMsg = "";
      if (usernameOrEmail === "") {
        setUsernameOrEmailError(true);
        if (errorMsg !== "")
          errorMsg += " ";
        errorMsg += "Username or Email is required.";
      }
      else
        setUsernameOrEmailError(false);
      if (password === "") {
        setPasswordError(true);
        if (errorMsg !== "")
          errorMsg += " ";
        errorMsg += "Password is required.";
      }
      else
        setPasswordError(false);
      setStatus({ type: "error", msg: errorMsg });
    }
  };

  const googleLoginSuccess = async (res) => {
    const username = `${res.profileObj.name} (${res.profileObj.email})`;
    const email = res.profileObj.email;
    const password = res.googleId;

    setLoading(true)
    login({usernameOrEmail: username, password})
      .then((data) => {
        if (data.status === "ok") {
          setLoading(false)
          setToken(data.token);
          setUsername(data.username);
          setStatus({ type: "success", msg: "Logged in successfully." });
          toEditor();
        } else {
          signUp({ username, email, password })
            .then((res) => {
              login({ usernameOrEmail: username, password })
                .then((data) => {
                  setLoading(false)
                  setToken(data.token);
                  setUsername(data.username);
                  setStatus({ type: "success", msg: "Logged in successfully." });
                  toEditor();
                })
                .catch((err) => {
                  // unexpected error
                  setLoading(false)
                  setStatus({ type: "error", msg: "Second login failed." });
                })
            })
            .catch((err) => {
              // unexpected error
              setLoading(false)
              setStatus({ type: "error", msg: "Sign up failed." });
            })
        }
      })
      .catch((err) => {
        // unexpected error
        setLoading(false)
        setStatus({ type: "error", msg: "First login failed." });
      })
  };
  const googleLoginFailure = (error) => {
    // unexpected error
    setLoading(false)
    if (error.error === "idpiframe_initialization_failed") {
      setStatus({ type: "error", msg: "IP blocked." });
      return
    }
    setStatus({ type: "error", msg: "Google login failed." });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          { isLoading ? <Puff width="50" /> : <LockOutlinedIcon /> }
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Container component="div" className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usernameOrEmail"
            label="Username or Email Address"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => { setUsernameOrEmail(e.target.value); }}
            error={usernameOrEmailError}
            onKeyDown={(e) => { 
              if (e.key === "Enter")
                passwordRef.current.focus();
            }}
            // autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            error={passwordError}
            inputRef={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleSubmit();
            }}
            // autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading ? "true" : ""}
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID || "421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com"}
            buttonText="Log in with Google"
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            cookiePolicy={'single_host_origin'}
            // uxMode="redirect"
            // redirectUri="http://localhost:3000"
            render={(renderProps) => {
              return (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color=""
                    disabled={isLoading ? "true" : ""}
                    className={classes.submit}
                    onClick={renderProps.onClick}
                  >
                  <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#000">
                      <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path>
                      <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path>
                      <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
                      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path>
                      <path fill="none" d="M0 0h18v18H0z"></path>
                    </g>
                  </svg>
                  Log in with Google
                  </Button>
                </div>
              )
            }}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" color="primary" className={classes.signup} onClick={toSignUp}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Container>
  );
}

export default LoginPage;
