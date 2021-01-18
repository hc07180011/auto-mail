import { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import EditorPage from "./EditorPage";

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState({});

  if (page === "signUp") {
    return <SignUpPage
      toLogin={() => setPage("login")}
    />
  } else if (page === "editor") {
    return <EditorPage
      username={username}
      token={token}
      setStatus={(status) => { setStatus(status); }}
    />
  } else {
    return <LoginPage
      toSignUp={() => setPage("signUp")}
      toEditor={() => setPage("editor")}
      setToken={(token) => { setToken(token); }}
      setUsername={(username) => { setUsername(username); }}
      setStatus={(status) => { setStatus(status); }}
    />
  }
}

export default App;
