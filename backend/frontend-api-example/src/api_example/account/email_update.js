import React, {useState} from 'react';

function AccountEmailUpdate(props) {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    address: "",
    password: "",
    status: "",
  })

  const onSubmit = () => {
    props.instance.post('/account/email/update', {
      token: state.token,
      emailId: state.emailId,
      address: state.address,
      password: state.password,
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
      address:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        address: e.target.value,
      })}></input>
      <br></br>
      password:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        password: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Update email</button>
      <br></br>
      status: {state.status}
    </div>
  )
}

export default AccountEmailUpdate;