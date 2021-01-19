import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useRef } from "react"
import { signUp } from "./axios"

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
  login: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  }
}));

const SignUpPage = ({ toLogin, setStatus }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignUp = async () => {
    if (username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        setStatus({ type: "error", msg: "Password is not matched." });
        return
      } else
        setConfirmPasswordError(false);
      const { status } = await signUp({ username, email, password });
      if (status === "ok") {
        setStatus({ type: "success", msg: "Signed up successfully." });
        toLogin();
      } else {
        if (status === "username already taken") {
          setUsernameError(true);
          setStatus({ type: "error", msg: "Username is already taken." });
        } else if (status === "email already taken") {
          setEmailError(true);
          setStatus({ type: "error", msg: "Email is already taken." });
        } else {
          // unexpected error
        }
      }
    } else {
      let errorMsg = "";
      if (username === "") {
        setUsernameError(true);
        if (errorMsg !== "")
          errorMsg += " ";
        errorMsg += "Username is required.";
      } else
        setUsernameError(false);
      if (email === "") {
        setEmailError(true);
        if (errorMsg !== "")
          errorMsg += " ";
        errorMsg += "Email address is required.";
      } else
        setEmailError(false);
      if (password === "") {
        setPasswordError(true);
        if (errorMsg !== "")
          errorMsg += " ";
        errorMsg += "Password is required.";
      } else
        setPasswordError(false);
      if (confirmPassword === "") {
          setConfirmPasswordError(true);
          if (errorMsg !== "")
            errorMsg += " ";
          errorMsg += "Password confirm is required.";
      } else
        setConfirmPasswordError(false);
      setStatus({ type: "error", msg: errorMsg });
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
            margin="small"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                emailRef.current.focus();
              }
            }}
            error={usernameError}
            autoFocus
            // autoComplete="fname"
          />
          <div style={{ height: "1vh" }}></div>
          <TextField
            variant="outlined"
            margin="small"
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
          <div style={{ height: "1vh" }}></div>
          <TextField
            variant="outlined"
            margin="small"
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
                confirmPasswordRef.current.focus();
              }
            }}
            error={passwordError}
            // autoComplete="current-password"
          />
          <div style={{ height: "1vh" }}></div>
          <TextField
            variant="outlined"
            margin="small"
            required
            fullWidth
            id="confirm password"
            name="confirm password"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); }}
            inputRef={confirmPasswordRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSignUp();
              }
            }}
            error={confirmPasswordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" color="primary" className={classes.login} onClick={toLogin}>
                Already have an account? Log In
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Container>
  );
};

export default SignUpPage;