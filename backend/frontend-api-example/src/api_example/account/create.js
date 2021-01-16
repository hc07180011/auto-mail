import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function AccountCreate() {
  const [state, setState] = useState({
    username: "admin",
    email: "hendry0718@gmail.com",
    password: "admin",
    status: "",
  })

  const onSubmit = () => {
    instance.post('/account/create', {
      username: state.username,
      email: state.email,
      password: state.password
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
      username:
      <input type="text" defaultValue="admin" onChange={(e) => setState({
        ...state,
        username: e.target.value,
      })}></input>
      <br></br>
      email:
      <input type="text" defaultValue="hendry0718@gmail.com" onChange={(e) => setState({
        ...state,
        email: e.target.value,
      })}></input>
      <br></br>
      password:
      <input type="text" defaultValue="admin" onChange={(e) => setState({
        ...state,
        password: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Register</button>
      <br></br>
      status: {state.status}
    </div>
  )
}

export default AccountCreate;