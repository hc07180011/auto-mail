import React, {useState} from 'react';

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