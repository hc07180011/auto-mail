import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useRef } from "react"
import { signUp } from "./axios"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        My website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }
}));

const SignUpPage = ({ toLogin }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    if (username === "")
      setUsernameError(true);
    else
      setUsernameError(false);
    if (email === "")
      setEmailError(true);
    else
      setEmailError(false);
    if (password === "")
      setPasswordError(true);
    else
      setPasswordError(false);
    if (username !== "" && email !== "" && password !== "") {
      const { status } = await signUp({ username, email, password });
      if (status === "ok") {
        toLogin();
      } else {
        if (status === "username already taken") {
          setUsernameError(true);
        } else if (status === "email already taken") {
          setEmailError(true);
        } else {
          // unknown error
        }
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Container className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                emailRef.current.focus();
              }
            }}
            error={usernameError}
            autoFocus
            // autoComplete="fname"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
            inputRef={emailRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordRef.current.focus();
              }
            }}
            error={emailError}
            // autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            inputRef={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            error={passwordError}
            // autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" color="primary" className={classes.login} onClick={toLogin}>
                Already have an account? Log in
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpPage;