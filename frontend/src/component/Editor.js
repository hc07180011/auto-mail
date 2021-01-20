import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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
          value=""
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="cc"
          value=""
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="bcc"
          value=""
        />
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