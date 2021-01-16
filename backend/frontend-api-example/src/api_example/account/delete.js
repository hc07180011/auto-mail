import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function AccountDelete() {
  const [state, setState] = useState({
    usernameOrEmail: "admin",
    password: "henry0718",
    status: "",
    token: "",
    username: "",
  })

  const onSubmit = () => {
    instance.post('/account/delete', {
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
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
      <h1>Warning: this is going to delete ALL data</h1>
      <br></br>
      <button onClick={() => onSubmit()}>Delete</button>
      <br></br>
      status: {state.status}
    </div>
  )
}

export default AccountDelete;