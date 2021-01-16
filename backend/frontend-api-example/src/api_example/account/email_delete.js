import React, {useState} from 'react';

function AccountEmailDelete(props) {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    status: "",
  })

  const onSubmit = () => {
    props.instance.post('/account/email/delete', {
      token: state.token,
      emailId: state.emailId,
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
      token:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        token: e.target.value,
      })}></input>
      <br></br>
      emailId:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        emailId: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Delete email</button>
      <br></br>
      status: {state.status}
    </div>
  )
}

export default AccountEmailDelete;