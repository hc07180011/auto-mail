import { useEffect, useState } from "react";
import {
  addEmail,
  getEmailList,
  updateEmail,
  deleteEmail,
  addContent,
  getContentList,
  getEmailDetail,
} from "./axios";

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
      const { status, email } = getEmailList({ token });
      if (status === "ok") {
        setEmailList(email);
      } else if (status === "token invalid") {
        setStatus({ type: "error", msg: "Token is invalid." })
      } else {
        // unknown error
      }
    })();
  }, []);

  useEffect(() => {
    if (currentEmail !== -1) {
      (async function () {
        const { status, content } = getContentList({ token, emailId: emailList[currentEmail].id });
        if (status === "ok") {
          setContentList(content);
          setCurrentContent(-1);
        } else {
          // unknown error
        }
      })();
    }
  }, [currentEmail]);

  const handleAddEmail = async () => {
    const { status, id } = await addEmail({ token, createAddress, createPassword });
    if (status === "ok") {
      setEmailList([...emailList, { id, createAddress, status: true }]);
      setStatus({ type: "success", msg: "Email was added." });
    } else {
      // unknown error
    }
  };

  const handleUpdateEmail = async (index) => {
    setUpdateAddress("");
    setUpdatePassword("");
    const { status } = await updateEmail({ token, emailId: emailList[index].id, updateAddress, updatePassword });
    if (status === "ok") {
      let newEmailList = emailList;
      newEmailList[index].address = updateAddress;
      setEmailList(newEmailList);
      setStatus({ type: "success", msg: "Email information was updated." });
    } else if (status === "token/emailId invalid") {
      setStatus({ type: "success", msg: "Token/EmailId is invalid." });
    } else {
      // unknown error
    }
  };

  const handleDeleteEmail = async (index) => {
    const { status } = await deleteEmail({ token, emailId: emailList[index].id });
    if (status === "ok") {
      let newEmailList = emailList;
      newEmailList.splice(index, 1);
      setEmailList(newEmailList);
      if (index < currentEmail)
        setCurrentEmail(currentEmail - 1);
      else if (index === currentEmail)
        setCurrentEmail(-1);
      setStatus({ type: "success", msg: "Email was deleted." });
    } else {
      // unknown error
    }
  };

  const handleAddContent = async () => {
    const { status, id } = await addContent({ token, emailId: emailList[currentEmail].id, subject, text });
    if (status === "ok") {
      setContentList([...contentList, { id, subject }]);
      setStatus({ type: "success", msg: "Content was added." });
    } else {
      // unknown error
    }
  };

  const handleShowEmail = async () => {
    const { status, subject, text } = await getEmailDetail({ token, emailId: emailList[currentEmail].id, contentId: contentList[currentContent].id });
    if (status === "ok") {
      setSubject(subject);
      setText(text);
    }
  };

  return (
    <div>

    </div>
  );
};

export default EditorPage;