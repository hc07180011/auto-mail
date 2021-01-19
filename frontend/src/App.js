import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import EditorPage from "./EditorPage";
import { message } from "antd";

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState({});

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };

      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "danger":
        default:
          message.error(content);
          break;
      }
    }
  }

  useEffect(() => {
    displayStatus(status);
  }, [status])

  if (page === "signUp") {
    return <SignUpPage
      toLogin={() => setPage("login")}
    />
  } else if (page === "editor") {
    return <EditorPage
      username={username}
      token={token}
      setStatus={(status) => setStatus(status)}
    />
  } else {
    return <LoginPage
      toSignUp={() => setPage("signUp")}
      toEditor={() => setPage("editor")}
      setToken={(token) => setToken(token)}
      setUsername={(username) => setUsername(username)}
      setStatus={(status) => setStatus(status)}
    />
  }
}

export default App;
