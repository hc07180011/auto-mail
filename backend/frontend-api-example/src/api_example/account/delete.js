import React, {useState} from 'react';

function AccountDelete(props) {
  const [state, setState] = useState({
    usernameOrEmail: "admin",
    password: "henry0718",
    status: "",
    token: "",
    username: "",
  })

  const onSubmit = () => {
    props.instance.post('/account/delete', {
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