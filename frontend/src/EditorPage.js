import Box from "@material-ui/core/Box";
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

const EditorPage = ({
  username,
  token,
  setStatus,
}) => {
  const [emailList, setEmailList] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(-1);
  const [createAddress, setCreateAddress] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [contentList, setContentList] = useState([]);
  const [currentContent, setCurrentContent] = useState(-1);
  const [subject, setSubject] = useState("");
  const [braftEditorState, setBraftEditorState] = useState(BraftEditor.createEditorState(null));

  (async function() {
    const { status, email } = await getEmailList({ token });
    if (status === "ok") {
      setEmailList(email);
    } else if (status === "token invalid") {
      setStatus({ type: "error", msg: "Token is invalid." });
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to initially load the Email list." });
    }
  })();

  useEffect(() => {
    if (currentEmail === -1) {
      setContentList([]);
      setCurrentContent(-1);
    }
  }, [currentEmail]);

  const handleAddEmail = async () => {
    const { status, id } = await addEmail({ token, address: createAddress, password: createPassword });
    if (status === "ok") {
      setEmailList([...emailList, { id, address: createAddress, status: true }]);
      setStatus({ type: "success", msg: "Email was added." });
      setCreateAddress("");
      setCreatePassword("");
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to add an email." });
    }
  };

  const handleUpdateEmail = async (index) => {
    const { status } = await updateEmail({ token, emailId: emailList[index].id, updateAddress, updatePassword });
    if (status === "ok") {
      let newEmailList = emailList;
      newEmailList[index].address = updateAddress;
      setEmailList(newEmailList);
      setStatus({ type: "success", msg: "Email information was updated." });
      setUpdateAddress("");
      setUpdatePassword("");
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
      const { status } = await deleteEmail({ token, emailId: emailList[currentEmail].id });
      if (status === "ok") {
        let newEmailList = emailList;
        newEmailList.splice(currentEmail, 1);
        setEmailList(newEmailList);
        setCurrentEmail(-1);
        setStatus({ type: "success", msg: "Email was deleted." });
      } else {
        // unexpected error
        setStatus({ type: "error", msg: "Failed to delete an Email." });
      }
    } else {
      setStatus({ type: "warning", msg: "Please select an Email to delete." });
    }
  };

  const handleGetContentList = async () => {
    const { status, content } = await getContentList({ token, emailId: emailList[currentEmail].id });
    if (status === "ok") {
      setContentList(content);
      setCurrentContent(-1);
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to load the content list." });
    }
  };

  const handleAddContent = async () => {
    const { status, id } = await addContent({
      token,
      emailId: emailList[currentEmail].id,
      subject,
      text: braftEditorState.toHTML(),
    });
    if (status === "ok") {
      const newCurrentContent = contentList.length;
      setContentList([...contentList, { id, subject }]);
      setCurrentContent(newCurrentContent);
      setStatus({ type: "success", msg: "Content was added." });
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to add a content." });
    }
  };

  const handleGetContent = async () => {
    const { status, subject, text } = await getContent({
      token,
      emailId: emailList[currentEmail].id,
      contentId: contentList[currentContent].id
    });
    if (status === "ok") {
      setSubject(subject);
      setBraftEditorState(BraftEditor.createEditorState(text));
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

  const handleUpdateContent = async () => {
    const { status } = await updateContent({
      token,
      emailId: emailList[currentEmail].id,
      contentId: contentList[currentContent].id,
      subject,
      text: braftEditorState.toHTML(),
    });
    if (status === "ok") {
      let newContentList = contentList;
      newContentList[currentContent].subject = subject;
      setContentList(newContentList);
      setStatus({ type: "success", msg: "Content was updated." })
    } else {
      // unexpected error
      setStatus({ type: "error", msg: "Failed to update a content." });
    }
  };

  const handleDeleteContent = async () => {
    if (currentContent !== -1) {
      const { status } = await deleteContent({ token, emailId: emailList[currentEmail].id, contentId: contentList[currentContent].id });
      if (status === "ok") {
        let newContentList = contentList;
        newContentList.splice(currentContent, 1);
        setContentList(newContentList);
        setCurrentContent(-1);
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
    <Box>
      <EmailList
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
        setUpdatePassword={setCreatePassword}
        handleAddEmail={handleAddEmail}
        handleUpdateEmail={handleUpdateEmail}
        handleDeleteEmail={handleDeleteEmail}
        handleGetContentList={handleGetContentList}
      />
      <ContentList
        contentList={contentList}
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
        handleGetContent={handleGetContent}
        handleDeleteContent={handleDeleteContent}
      />
      <Editor
        disabled={currentEmail === -1}
        currentContent={currentContent}
        subject={subject}
        setSubject={setSubject}
        braftEditorState={braftEditorState}
        setBraftEditorState={setBraftEditorState}
        handleAddContent={handleAddContent}
        handleUpdateContent={handleUpdateContent}
        handleDeliver={handleDeliver}
      />
    </Box>
  );
};

export default EditorPage;