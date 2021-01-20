import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import BraftEditor from "braft-editor";


import { useEffect, useState } from "react";
import {
  addEmail,
  getEmailList,
  updateEmail,
  deleteEmail,
  addContent,
  getContentList,
  getContent,
  updateContent,
  deleteContent,
  deliver,
} from "./axios";

import EmailList from "./component/EmailList";
import ContentList from "./component/ContentList";
import Editor from "./component/Editor";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditorPage = ({
  username,
  token,
  setStatus,
}) => {
  const classes = useStyles();

  const [emailList, setEmailList] = useState([]);
  const [emailListLoading, setEmailListLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(-1);
  const [createAddress, setCreateAddress] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [contentList, setContentList] = useState([]);
  const [currentContent, setCurrentContent] = useState(-1);
  const [subject, setSubject] = useState("");
  const [braftEditorState, setBraftEditorState] = useState(BraftEditor.createEditorState(null));

  useEffect(() => {
    (async function () {
      // setEmailListLoading(true);
      const { status, email } = await getEmailList({ token });
      if (status === "ok") {
        setEmailList(email);
        // setEmailListLoading(false);
      } else if (status === "token invalid") {
        setStatus({ type: "error", msg: "Token is invalid." });
      } else {
        // unexpected error
        setStatus({ type: "error", msg: "Failed to load the Email list." });
      }
    })();
  }, [token]);

  useEffect(() => {
    if (currentEmail === -1) {
      setContentList([]);
      setCurrentContent(-1);
    }
  }, [currentEmail]);

  const handleAddEmail = async (address, password) => {
    const { status, id } = await addEmail({ token, address, password});
    if (status === "ok") {
      setEmailList([...emailList, { id, address, status: true }]);
      setStatus({ type: "success", msg: "Email was added." });
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to add an email." });
    }
  };

  const handleUpdateEmail = async (emailId, address, password) => {
    const { status } = await updateEmail({ token, emailId, address, password });
    if (status === "ok") {
      let newEmailList = emailList;
      for (let i = 0; i < newEmailList.length; i++) {
        if (newEmailList[i].id === emailId) {
          newEmailList[i].address = address;
          break;
        }
      }
      setEmailList(newEmailList);
      setStatus({ type: "success", msg: "Email information was updated." });
    } else if (status === "token/emailId invalid") {
      // unexpected error
      setStatus({ type: "error", msg: "Token/EmailId is invalid." });
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to update an Email." });
    }
  };

  const handleDeleteEmail = async () => {
    if (currentEmail !== -1) {
      const emailId = emailList[currentEmail].id;
      setCurrentEmail(-1);
      const { status } = await deleteEmail({ token, emailId });
      if (status === "ok") {
        let newEmailList = emailList;
        for (let i = 0; i < newEmailList.length; i++) {
          if (newEmailList[i].id === emailId) {
            newEmailList.splice(i, 1);
            break;
          }
        }
        setEmailList(newEmailList);
        setStatus({ type: "success", msg: "Email was deleted." });
      } else {
        // unexpected error
        setStatus({ type: "error", msg: "Failed to delete an Email." });
      }
    } else {
      setStatus({ type: "warning", msg: "Please select an Email to delete." });
    }
  };

  const handleGetContentList = async (emailId) => {
    setCurrentContent(-1);
    const { status, content } = await getContentList({ token, emailId });
    if (status === "ok") {
      if (currentEmail !== -1 && emailList[currentEmail].id === emailId)
        setContentList(content);
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to load the content list." });
    }
  };

  const handleAddContent = async (emailId, subject, text) => {
    const { status, id } = await addContent({
      token,
      emailId,
      subject,
      text,
    });
    if (status === "ok") {
      if (currentEmail !== -1 && emailList[currentEmail].id === emailId) {
        setContentList([...contentList, { id, subject }]);
      }
      setStatus({ type: "success", msg: "Content was added." });
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to add a content." });
    }
  };

  const handleGetContent = async (emailId, contentId) => {
    const { status, subject, text } = await getContent({
      token,
      emailId,
      contentId,
    });
    if (status === "ok") {
      if (currentEmail !== -1 &&
        emailList[currentEmail].id === emailId &&
        currentContent !== -1 &&
        contentList[currentContent].id === contentId) {
        setSubject(subject);
        setBraftEditorState(BraftEditor.createEditorState(text));
      }
    } else {
      setStatus({ type: "error", msg: "Failed to load a content." });
    }
  };

  useEffect(() => {
    if (currentContent === -1) {
      setSubject("");
      setBraftEditorState(BraftEditor.createEditorState(null));
    }
  }, [currentContent]);

  const handleUpdateContent = async (emailId, contentId, subject) => {
    const { status } = await updateContent({
      token,
      emailId,
      contentId,
      subject,
      text: braftEditorState.toHTML(),
    });
    if (status === "ok") {
      if (currentEmail !== -1 && emailList[currentEmail].id === emailId) {
        let newContentList = contentList;
        for (let i = 0; i < newContentList.length; i++) {
          if (newContentList[i].id === contentId) {
            newContentList[i].subject = subject;
          }
        }
        setContentList(newContentList);
      }
      setStatus({ type: "success", msg: "Content was updated." })
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to update a content." });
    }
  };

  const handleDeleteContent = async () => {
    if (currentContent !== -1) {
      const emailId = emailList[currentEmail].id;
      const contentId = contentList[currentContent].id;
      setCurrentContent(-1);
      const { status } = await deleteContent({ token, emailId, contentId});
      if (status === "ok") {
        if (currentEmail !== -1 && emailList[currentEmail].id === emailId) {
          let newContentList = contentList;
          for (let i = 0; i < newContentList.length; i++) {
            if (newContentList[i].id === contentId)
              newContentList.splice(i, 1);
          }
          setContentList(newContentList);
        }
        setStatus({ type: "success", msg: "Content was deleted." })
      } else {
        // unexpected error
        setStatus({ type: "error", msg: "Failed to delete a content." });
      }
    } else {
      setStatus({ type: "warning", msg: "Please select a content to delete." })
    }
  }

  const handleDeliver = async () => {

  }

  return (
    <>
      <Grid container spacing={2} justify="center" className={classes.root}>
        <Grid item xs={3}>
          <EmailList
            emailListLoading={emailListLoading}
            emailList={emailList}
            currentEmail={currentEmail}
            setCurrentEmail={setCurrentEmail}
            createAddress={createAddress}
            setCreateAddress={setCreateAddress}
            createPassword={createPassword}
            setCreatePassword={setCreatePassword}
            updateAddress={updateAddress}
            setUpdateAddress={setUpdateAddress}
            updatePassword={updatePassword}
            setUpdatePassword={setUpdatePassword}
            handleAddEmail={handleAddEmail}
            handleUpdateEmail={handleUpdateEmail}
            handleDeleteEmail={handleDeleteEmail}
            handleGetContentList={handleGetContentList}
          />
        </Grid>
        <Grid item xs={8}>
          <ContentList
            emailList={emailList}
            currentEmail={currentEmail}
            contentList={contentList}
            currentContent={currentContent}
            setCurrentContent={setCurrentContent}
            handleGetContent={handleGetContent}
            handleDeleteContent={handleDeleteContent}
          />
          <Editor
            disabled={currentEmail === -1}
            subject={subject}
            setSubject={setSubject}
            braftEditorState={braftEditorState}
            setBraftEditorState={setBraftEditorState}
          />
        </Grid>
      </Grid>
      <Box mt={8} style={{ backgroundColor: "rgb(216, 234, 245)", position: "fixed", bottom: "0%", width: "100%", zIndex: 950 }}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Recipients
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Attachments
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={currentContent === -1 ? (() => {
                handleAddContent(emailList[currentEmail].id, subject, braftEditorState.toHTML());
                setSubject("");
                setBraftEditorState(BraftEditor.createEditorState(null));
              }) : (() => handleUpdateContent(
                emailList[currentEmail].id,
                contentList[currentContent].id,
                subject,
              ))}
            >
              {currentContent === -1 ? "Save" : "Update"}
            </Button>
          </Grid>
          <Grid item>
          </Grid>
          <Grid item>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditorPage;