import { useState, useEffect, useLayoutEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import logo from './img/logo.png';
import backgroundImage from './img/background.png';

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import EditorPage from "./EditorPage";
import { message } from "antd";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Pigeons
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: "#3e7bbc",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    color: "#4e8bcc",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const App = () => {
  const [page, setPage] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("localState"));
    if (localState) {
      setPage(localState.page);
      setToken(localState.token);
      setUsername(localState.username);
    } else {
      localStorage.setItem("localState", JSON.stringify({ page: "login", token: "", usernme: "" }));
      setPage("login")
    }
    setTimeoutId(setTimeout(() => {
      localStorage.removeItem("localState");
      setTimeoutId(null);
    }, 5 * 60 * 1000));
  }, []);

  useEffect(() => {
    if (page !== "") {
      localStorage.setItem("localState", JSON.stringify({ page, token, username }));
    }
    if (timeoutId)
      clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => {
      localStorage.removeItem("localState");
      setTimeoutId(null);
    }, 5 * 60 * 1000));
  }, [page, token, username]);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };

      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "danger":
        default:
          message.error(content);
          break;
      }
    }
  }

  const MainAppBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    }
  
    return (
      <AppBar style={{ background: "rgb(216,234,245)", marginBottom: "1%" }} position="static">
          <Toolbar>
            <a href="http://abclabs.csie.org/automail/">
              <img
                alt="logo-img-main"
                src={logo}
                
                width="50px"
              />
            </a>
            <Typography className={classes.title} variant="h6" noWrap>
              &nbsp;&nbsp;Pigeons
            </Typography>
            <div className={classes.search} display="none">
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {
              token !== "" ?
              <div style={{ marginLeft: "1%", color: "#3e7bbc" }}>
                <label htmlFor="account-avatar">
                  <Button color="inherit">
                    Welcome, {username.slice(0, username.length < 10 ? username.length : 10) + (username.length < 10 ? "" : " ...") }
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      {/* <MenuItem onClick={handleClose}></MenuItem> */}
                      <MenuItem style={{ justifyContent: "flex-end" }} onClick={() => {setPage("login"); setToken(""); setUsername("")}}>Log out</MenuItem>
                    </Menu>
                  </Button>
                </label>
              </div> :
              <></>
            } 
          </Toolbar>
        </AppBar>
    )
  }

  useEffect(() => {
    displayStatus(status);
  }, [status])

  if (page === "signUp") {
    return (
      <div>
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 950 }}>
          <MainAppBar />
        </div>
        <div style={{ backgroundImage: `url(${backgroundImage})`, position: "fixed", bottom: 0, top: 0, width: "100%", zIndex: -1 }}></div>
        <div style={{ float: "right", paddingTop: "7%", paddingBottom: "2%", paddingRight: "8%", paddingLeft: "8%" }}>
          <SignUpPage
            toLogin={() => setPage("login")}
            setStatus={(status) => setStatus(status)}
          />
        </div>
        <Box mt={8} style={{ backgroundColor: "rgb(216,234,245)", position: "fixed", bottom: "0%", width: "100%", zIndex: 950 }}>
          <Copyright />
        </Box>
      </div>
    )
  } else if (page === "editor" && token !== "") {
    return (
      <div>
        <MainAppBar/>
        <EditorPage
          username={username}
          token={token}
          setStatus={(status) => setStatus(status)}
        />
      </div>
    )
  } else if (page === "login") {
    return (
      <div>
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 950 }}>
          <MainAppBar />
        </div>
        <div style={{ backgroundImage: `url(${backgroundImage})`, position: "fixed", bottom: 0, top: 0, width: "100%", zIndex: -1 }}></div>
        <div style={{ float: "right", paddingTop: "7%", paddingBottom: "2%", paddingRight: "8%", paddingLeft: "8%" }}>
          <LoginPage
            toSignUp={() => setPage("signUp")}
            toEditor={() => setPage("editor")}
            setToken={(token) => setToken(token)}
            setUsername={(username) => setUsername(username)}
            setStatus={(status) => setStatus(status)}
          />
        </div>
        <Box mt={8} style={{ backgroundColor: "rgb(216,234,245)", position: "fixed", bottom: "0%", width: "100%", zIndex: 950 }}>
          <Copyright />
        </Box>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default App;
