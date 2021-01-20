import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const useStyles = makeStyles((theme) => ({
  editor: {
    maxHeight: "70%",
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: "1%",
    margin: theme.spacing(0, 0, 1),
  },
}));

const Editor = ({
  disabled,
  subject,
  setSubject,
  braftEditorState,
  setBraftEditorState,
  copyData,
  setCopyData,
  recipientData,
  setRecipientData,
}) => {
  const classes = useStyles();

  return disabled ? (<></>) : (
    <Grid container>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Recipients"
          value={recipientData[0]}
          disabled
        />
        <AddCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[0] += copyData;
          setRecipientData(newRecipientData);
          setCopyData("");
        }} />
        <RemoveCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[0] = newRecipientData[0].split(copyData).join("");
          setRecipientData(newRecipientData);
          setCopyData("");
        }}/>
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="cc"
          value={recipientData[1]}
          disabled
        />
        <AddCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[1] += copyData;
          setRecipientData(newRecipientData);
          setCopyData("");
        }} />
        <RemoveCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[1] = newRecipientData[1].split(copyData).join("");
          setRecipientData(newRecipientData);
          setCopyData("");
        }}/>
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="bcc"
          value={recipientData[2]}
          disabled
        />
        <AddCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[2] += copyData;
          setRecipientData(newRecipientData);
          setCopyData("");
        }} />
        <RemoveCircleIcon onClick={() => {
          let newRecipientData = recipientData;
          newRecipientData[2] = newRecipientData[2].split(copyData).join("");
          setRecipientData(newRecipientData);
          setCopyData("");
        }}/>
      </Grid>
      <div className={classes.editor}>
        <BraftEditor
          language="en"
          value={braftEditorState}
          onChange={(state) => setBraftEditorState(state)}
        />
      </div>
    </Grid>
  );
};

export default Editor;