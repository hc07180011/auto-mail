import { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

const App = () => {
  const [page, setPage] = useState("login");

  if (page === "signUp") {
    return <SignUpPage toLogin={() => setPage("login")}/>
  } else if (page === "editor") {

  } else {
    return <LoginPage toSignUp={() => setPage("signUp")} toEditor={() => setPage("editor")}/>
  }
}

export default App;
