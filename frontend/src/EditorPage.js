import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from '@material-ui/core/styles';
import BraftEditor from "braft-editor";

import GoogleLogin from 'react-google-login';
import * as XLSX from 'xlsx';
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import copy from 'copy-to-clipboard';

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

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  preview: {
    fontSize: '10px',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 32,
    height: 32,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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
  const [attachments, setAttachments] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [recipientData, setRecipientData] = useState(["", "", ""]);
  const [copyData, setCopyData] = useState("");

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

  const handleDeliver = async (response) => {
    let data = new FormData();
    const tokenTmp = token;
    const emailIdTmp = emailList[currentEmail].id;
    const authToken = response ? response.code : null;
    const subjectTmp = subject;
    const textTmp = braftEditorState.toHTML();
    const attachmentsTmp = attachments;
    const recipientDataTmp = recipientData;
    const excelDataTmp = excelData;
    if (currentContent === -1) {
      handleAddContent(emailList[currentEmail].id, subject, braftEditorState.toHTML());
      setSubject("");
      setBraftEditorState(BraftEditor.createEditorState(null));
    } else {
      handleUpdateContent(
        emailList[currentEmail].id,
        contentList[currentContent].id,
        subject,
      );
    }
    data.append("productionMode", process.env.REACT_APP_PRODUCTION_MODE || "true");
    data.append("token", tokenTmp);
    data.append("emailId", emailIdTmp);
    if (authToken)
      data.append("authToken", authToken);
    data.append("subject", subjectTmp);
    data.append("text", textTmp);
    for (let i = 0; i < attachmentsTmp.length; i++) {
      data.append('attachments', attachmentsTmp[i])
    }
    data.append("recipients", recipientDataTmp[0]);
    data.append("cc", recipientDataTmp[1]);
    data.append("bcc", recipientDataTmp[2]);
    data.append("excelData", JSON.stringify(excelDataTmp));
    const { status } = await deliver(data);
    if (status === "ok") {
      setStatus({ type: "success", msg: "An Email was delivered." });
    } else {
      setStatus({ type: "error", msg: "Failed to deliver an Email." })
    }
  }

  const SubmitButton = () => {
    if (currentEmail !== -1 &&
      emailList[currentEmail].address.length > 10 &&
      emailList[currentEmail].address.substr(emailList[currentEmail].address.length - 10) === "@gmail.com" &&
      recipientData[0] !== "") {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID || "421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com"}
          buttonText="Send Gmail"
          scope="https://www.googleapis.com/auth/gmail.compose/"
          responseType="code"
          approvalPrompt="force"
          prompt='consent'
          accessType="offline"
          onSuccess={handleDeliver}
          onFailure={handleDeliver}
          cookiePolicy={'single_host_origin'}
        />
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={recipientData[0] !== "" ? (() => handleDeliver(false)) :
            (currentContent === -1 ? (() => {
              handleAddContent(emailList[currentEmail].id, subject, braftEditorState.toHTML());
              setSubject("");
              setBraftEditorState(BraftEditor.createEditorState(null));
            }) : (() => handleUpdateContent(
              emailList[currentEmail].id,
              contentList[currentContent].id,
              subject,
            )))}
        >
          {recipientData[0] !== "" ? "Send" : (currentContent === -1 ? "Save" : "Update")}
        </Button>
      ); 
    }
  };

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
            copyData={copyData}
            setCopyData={setCopyData}
            recipientData={recipientData}
            setRecipientData={setRecipientData}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Box mt={8} style={{ backgroundColor: "rgb(216, 234, 245)", position: "fixed", bottom: "0%", width: "100%", zIndex: 950 }}>
        <Grid container justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            {excelData.length ? excelData[0].map((elem, idx) => (
              <Chip
                variant="outlined"
                color="primary"
                size="small"
                label={elem}
                key={idx}
                icon={<LocationOnIcon />}
                onClick={(e) => {
                  copy(`$[[${elem}]]`);
                  setCopyData(`$[[${elem}]],`);
                }}
              />
            )) : <></>}
          </Grid>
          <Grid item>
            <Button
              component="label"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Recipients
              <input
                accept="*"
                hidden
                onChange={(e) => {
                  const reader = new FileReader()
                  const workSheetIndex = 0
                  reader.onload = (evt) => { // evt = on_file_select event
                    /* Parse data */
                    const bstr = evt.target.result;
                    const wb = XLSX.read(bstr, {type:'binary'});
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[workSheetIndex];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    let data = XLSX.utils.sheet_to_json(ws, { header: 1 }).filter((elem) => elem.length);
                    setExcelData(data);
                  };
                  reader.readAsBinaryString(e.target.files[0]);
                }}
                type="file"
              />
            </Button>
          </Grid>
          <Grid item>
            <Grid container>
              {[...attachments].map((f, idx) => (
                <Paper className={classes.preview}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="preview" src={URL.createObjectURL(f)} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            {f.name}<br></br>
                            {f.type}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Fab size="small" color="secondary" aria-label="add">
                        <DeleteIcon onClick={() => { 
                          let newAttachments = [...attachments];
                          newAttachments.splice(idx, 1);
                          setAttachments(newAttachments);
                        }}/>
                      </Fab>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              component="label"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Attachments
              <input type="file" multiple hidden onChange={(e) => setAttachments([...attachments, ...e.target.files])}/>
            </Button>
          </Grid>
          <Grid item>
            <SubmitButton />
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
