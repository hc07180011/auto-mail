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
        onClick={() => {
          handleAddEmail(createAddress, createPassword);
          setAddEmailOpen(false);
          setCreateAddress("");
          setCreatePassword("");
        }}
        className={classes.button}
      >
        Add
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          setAddEmailOpen(false);
          setCreateAddress("");
          setCreatePassword("");
        }}
        className={classes.button}
      >
        Close
      </Button>
      {/*<Button
        fullWidth
        variant="contained"
        className={classes.button}
      >
        For Google Login
      </Button>*/}
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