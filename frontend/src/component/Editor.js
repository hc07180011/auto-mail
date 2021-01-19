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

  }, []);

  return (
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
        <Button>
          Send
        </Button>
      </Grid>
    </>
  );
};

export default Editor;