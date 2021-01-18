import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

function AccountRead(props) {
  const [state, setState] = useState({
    usernameOrEmail: "admin",
    password: "admin",
    status: "",
    token: "",
    username: "",
  })


  const onSubmit = () => {
    props.instance.post('/account/read', {
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

  const responseGoogle = (response) => {
    const username = response.profileObj.name + " (" + response.profileObj.email + ")"
    const email = response.profileObj.email
    const password = response.googleId

    props.instance.post('/account/read', {
      usernameOrEmail: username,
      password: password
    })
    .then((res) => {
      if (res.data.status === "ok") {
        setState({
          ...state,
          status: res.data.status,
          token: res.data.token,
          username: res.data.username,
        })
      }
      else {
        props.instance.post('/account/create', {
          username: username,
          email: email,
          password: password
        })
        .then((res) => {
          props.instance.post('/account/read', {
            usernameOrEmail: username,
            password: password
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
        })
        .catch((err) => {
          setState({
            ...state,
            status: "error",
          })
        })
      }
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
      <GoogleLogin
        clientId="421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
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