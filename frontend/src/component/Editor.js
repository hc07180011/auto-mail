import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    flexGrow: 1,
  }
}));

const Editor = ({
  disabled,
  currentEmail,
  currentContent,
  subject,
  setSubject,
  text,
  setText,
  handleAddContent,
  handleUpdateContent,
  handleDeliver,
}) => {
  const classes = useStyles();
  const [braftEditorState, setBraftEditorState] = useState(BraftEditor.createEditorState(text));

  useEffect(() => {
    setBraftEditorState(BraftEditor.createEditorState(text));
  }, [text]);

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
      <BraftEditor
        language="en"
        value={braftEditorState}
        onChange={(state) => setBraftEditorState(state)}
      />
      <Grid container className={classes.footer} justify="flex-end" spacing={2}>
        <Button>
          Recipients
        </Button>
        <Button>
          Attachments
        </Button>
        <Button
          onClick={currentContent === -1 ? (() => {
            const text = braftEditorState.toHTML();
            setText(text);
            handleAddContent(text);
          }) : (() => {
            const text = braftEditorState.toHTML();
            setText(text);
            handleUpdateContent(text);
          })}
        >
          {currentContent === -1 ? "Save" : "Update"}
        </Button>
      </Grid>
    </>
  );
};

export default Editor;