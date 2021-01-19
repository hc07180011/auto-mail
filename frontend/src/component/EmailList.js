import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(() => {
    return {
      top: "50%",
      left: "50%",
    };
  });
  const [addEmailOpen, setAddEmailOpen] = useState(false);

  const addEmailBody = (
    <div style={modalStyle}>
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
          if (createAddress !== "" && createPassword !== "") {
            handleAddEmail();
            setAddEmailOpen(false);
          }
        }}
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
      >
        Close
      </Button>
    </div>
  );

  return (
    <Box className={classes.root}>
      <List component="nav">
        {emailList.map((email, index) => (
          <ListItem
            button
            selected={index === currentEmail}
            onClick={() => setCurrentEmail(index)}
            key={index}
          >
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={email.address} />
          </ListItem>
        ))}
      </List>
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
  );
};

export default EmailList;