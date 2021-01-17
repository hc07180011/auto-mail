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
import { useState, useRef } from "react";
import { login } from "./axios";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }
}));

const LoginPage = ({ toSignUp, toEditor }) => {
  const classes = useStyles();
  
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameOrEmailError, setUsernameOrEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    if (usernameOrEmail === "")
      setUsernameOrEmailError(true);
    else
      setUsernameOrEmailError(false);
    if (password === "")
      setPasswordError(true);
    else
      setPasswordError(false);
    if (usernameOrEmail !== "" && password !== "") {
      const { status, token, username } = await login({ usernameOrEmail, password });
      if (status === "ok") {
        toEditor();
      } else {
        if (status === "wrong username/password") {
          setUsernameOrEmailError(true);
          setPasswordError(true);
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
          >
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" color="primary" className={classes.signup} onClick={toSignUp}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;