import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from '@material-ui/icons/Settings';
import GoogleLogin from "react-google-login";
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  input: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 4),
  },
  button:{
    margin: theme.spacing(1),
  },
}));

const EmailList = ({
  emailListLoading,
  emailList,
  currentEmail,
  setCurrentEmail,
  createAddress,
  setCreateAddress,
  createPassword,
  setCreatePassword,
  updateAddress,
  setUpdateAddress,
  updatePassword,
  setUpdatePassword,
  handleAddEmail,
  handleUpdateEmail,
  handleDeleteEmail,
  handleGetContentList,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(() => {
    return {
      top: "10%",
      left: "35%",
    };
  });
  const [addEmailOpen, setAddEmailOpen] = useState(false);
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false);

  const addEmailBody = (
    <div style={modalStyle} className={classes.input}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        value={createAddress}
        onChange={(e) => setCreateAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={createPassword}
        onChange={(e) => setCreatePassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled
        onClick={() => {
          handleAddEmail(createAddress, createPassword);
          setAddEmailOpen(false);
          setCreateAddress("");
          setCreatePassword("");
        }}
        className={classes.button}
      >
        Add (not supported for free version)
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled
        onClick={() => {
          setAddEmailOpen(false);
          setCreateAddress("");
          setCreatePassword("");
        }}
        className={classes.button}
      >
        Close (not supported for free version)
      </Button>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || "421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com"}
        buttonText="Add Gmail"
        onSuccess={(e) => {
          handleAddEmail(e.profileObj.email, '')
          setAddEmailOpen(false);
          setCreateAddress("");
          setCreatePassword("");
        }}
        onFailure={(e) => {}}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => {
          return (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color=""
                className={classes.button}
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
              Add Gmail (USE THIS!!)
              </Button>
            </div>
          )
        }}
      />
    </div>
  );

  const updateEmailBody = (
    <div style={modalStyle} className={classes.input}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        value={updateAddress}
        onChange={(e) => setUpdateAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={updatePassword}
        onChange={(e) => setUpdatePassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          handleUpdateEmail(emailList[currentEmail].id, updateAddress, updatePassword);
          setUpdateEmailOpen(false);
          setUpdateAddress("");
          setUpdatePassword("");
        }}
      >
        Update
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          setUpdateEmailOpen(false);
          setUpdateAddress("");
          setUpdatePassword("");
        }}
        className={classes.button}
      >
        Close
      </Button>
    </div>
  );

  return emailListLoading ? (<>Loading...</>) : (
    <>
      <Paper className={classes.paper}>
        <MenuList  component="nav">
          {emailList.map((email, index) => (
            <MenuItem
              button
              key={email.id}
              selected={index === currentEmail}
              onClick={() => {
                setCurrentEmail(index);
                handleGetContentList(email.id);
              }}
            >
              <ListItemIcon>
                  <EmailIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                    {email.address}
              </Typography>
              <Button
                onClick={() => {
                  setUpdateAddress(email.address);
                  setUpdateEmailOpen(true);
                }}
                style={{position: "absolute", bottom: 0, right: 0}}
              >
                    <SettingsIcon/>
              </Button>
          </MenuItem>
          ))}
        </MenuList>
        <Modal
                open={updateEmailOpen}
                onClose={() => setUpdateEmailOpen(false)}
              >
                {updateEmailBody}
        </Modal>
      </Paper>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setAddEmailOpen(true)}
        className={classes.button}
      >
        <AddIcon/>
      </Button>
      <Modal
        open={addEmailOpen}
        onClose={() => setAddEmailOpen(false)}
      >
        {addEmailBody}
      </Modal>
      <Button
        color="secondary"
        variant="outlined"
        disabled={currentEmail === -1}
        onClick={handleDeleteEmail}
        className={classes.button}
      >
        <RemoveIcon/>
      </Button>
    </>
  );
};

export default EmailList;