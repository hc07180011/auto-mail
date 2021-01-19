import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

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
  const [text, setText] = useState("");

  useEffect(() => {
    (async function() {
      const { status, email } = await getEmailList({ token });
      if (status === "ok") {
        setEmailList(email);
      } else if (status === "token invalid") {
        setStatus({ type: "error", msg: "Token is invalid." })
      } else {
        // unexpected error
      }
    })();
  }, [token]);

  useEffect(() => {
    if (currentEmail !== -1) {
      (async function () {
        const { status, content } = await getContentList({ token, emailId: emailList[currentEmail].id });
        if (status === "ok") {
          setContentList(content);
          setCurrentContent(-1);
        } else {
          // unexpected error
        }
      })();
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
      setStatus({ type: "success", msg: "Token/EmailId is invalid." });
    } else {
      // unexpected error
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
      }
    }
  };

  const handleAddContent = async () => {
    const { status, id } = await addContent({ token, emailId: emailList[currentEmail].id, subject, text });
    if (status === "ok") {
      setContentList([...contentList, { id, subject }]);
      setStatus({ type: "success", msg: "Content was added." });
    } else {
      // unexpected error
    }
  };

  const handleGetContent = async () => {
    const { status, subject, text } = await getContent({ token, emailId: emailList[currentEmail].id, contentId: contentList[currentContent].id });
    if (status === "ok") {
      setSubject(subject);
      setText(text);
    } 
  };

  useEffect(() => {
    if (currentContent !== -1) {
      handleGetContent();
    } else {
      setSubject("");
      setText("");
    }
  }, [currentContent]);

  const handleUpdateContent = async () => {
    const { status } = await updateContent({
      token,
      emailId: emailList[currentEmail].id,
      contentId: contentList[currentContent].id,
      subject,
      text,
    });
    if (status === "ok") {
      setStatus({type: "success", msg: "Content was updated."})
    } else {
      // unexpected error
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
      }
    }
  }

  const handleDeliver = async () => {

  }

  return (
    <Box>
      <EmailList
        emailList={emailList}
        currentEmail={currentEmail}
        setCurrentEmail={(currentEmail) => setCurrentEmail(currentEmail)}
        createAddress={createAddress}
        setCreateAddress={(createAddress) => setCreateAddress(createAddress)}
        createPassword={createPassword}
        setCreatePassword={(createPassword) => setCreatePassword(createPassword)}
        updateAddress={updateAddress}
        setUpdateAddress={(updateAddress) => setUpdateAddress(updateAddress)}
        updatePassword={updatePassword}
        setUpdatePassword={(updatePassword) => setCreatePassword(updatePassword)}
        handleAddEmail={handleAddEmail}
        handleUpdateEmail={handleUpdateEmail}
        handleDeleteEmail={handleDeleteEmail}
      />
      <ContentList
        contentList={ContentList}
        currentContent={currentContent}
        setCurrentContent={(currentContent) => setCurrentContent(currentContent)}
        handleAddContent={handleAddContent}
        handleGetContent={handleGetContent}
        handleDeleteContent={handleDeleteContent}
      />
    </Box>
  );
};

export default EditorPage;