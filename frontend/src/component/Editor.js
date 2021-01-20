import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div className={classes.editor}>
        <BraftEditor
          language="en"
          value={braftEditorState}
          onChange={(state) => setBraftEditorState(state)}
        />
      </div>
    </>
  );
};

export default Editor;