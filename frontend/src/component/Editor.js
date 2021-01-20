import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { useEffect, useState } from "react";

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
      <div className={classes.editor}>
        <BraftEditor
          language="en"
          value={braftEditorState}
          onChange={(state) => setBraftEditorState(state)}
        />
      </div>
      {/* <Grid container justify="flex-end" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
          >
            Recipients
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
          >
            Attachments
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
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
      </Grid> */}
    </>
  );
};

export default Editor;