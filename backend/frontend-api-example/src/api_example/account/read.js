import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function AccountRead() {
  const [state, setState] = useState({
    usernameOrEmail: "admin",
    password: "admin",
    status: "",
    token: "",
    username: "",
  })

  const onSubmit = () => {
    instance.post('/account/read', {
      usernameOrEmail: state.usernameOrEmail,
      password: state.password
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
        token: res.data.token,
        username: res.data.username,
      })
    })
    .catch((err) => {
      setState({
        ...state,
        status: "error",
      })
    })
  }

  return (
    <div>
      usernameOrEmail:
      <input type="text" defaultValue="admin" onChange={(e) => setState({
        ...state,
        usernameOrEmail: e.target.value,
      })}></input>
      <br></br>
      password:
      <input type="text" defaultValue="admin" onChange={(e) => setState({
        ...state,
        password: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Log in</button>
      <br></br>
      status: {state.status}
      <br></br>
      token: {state.token}
      <br></br>
      username: {state.username}
    </div>
  )
}

export default AccountRead;