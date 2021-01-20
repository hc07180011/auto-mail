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
  root: {
    width: 230,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 4),
  },
  button:{
    margin: theme.spacing(1, 0, 1),
  },
  addButton:{
    position: 'absolute',
    left: 0,
    bottom: 0,
  }
}));

const EmailList = ({
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
  const [settingOpen, setSettingOpen] = useState(false);

  const addEmailBody = (
    <div style={modalStyle} className={classes.paper}>
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
          handleAddEmail();
          setAddEmailOpen(false);
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
      <Button
        fullWidth
        variant="contained"
        className={classes.button}
      >
        For Google Login
      </Button>
    </div>
  );

  const settingBody = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
      />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Update
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => setSettingOpen(false)}
        className={classes.button}
      >
        Close
      </Button>
    </div>
  );

  return (
    <>
      <Box className={classes.root} >
      <Paper className={classes.root}>
        <MenuList  component="nav">
          {emailList.map((email, index) => (
            <MenuItem
                button
                selected={index === currentEmail}
                onClick={() => setCurrentEmail(index)}
                key={index}
            >
              <ListItemIcon>
                  <EmailIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                    {email.address}
              </Typography>
              <Button
                onClick={() => setSettingOpen(true)}
                style={{position: "absolute", bottom: 0, right: 0}}
              >
                    <SettingsIcon/>
              </Button>
          </MenuItem>
          ))}
        </MenuList>
        <Modal
                open={settingOpen}
                onClose={() => setSettingOpen(false)}
              >
                {settingBody}
        </Modal>
      </Paper>
      </Box>
       <Box className={classes.addButton}>
       <Button
         color="primary"
         onClick={() => setAddEmailOpen(true)}
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
         disabled={currentEmail === -1}
         onClick={handleDeleteEmail}
       >
         <RemoveIcon/>
       </Button>
     </Box>
    </>
  );
};

export default EmailList;