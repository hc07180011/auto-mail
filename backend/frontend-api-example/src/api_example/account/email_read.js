import React, {useState} from 'react';

function AccountEmailRead(props) {
  const [state, setState] = useState({
    token: "",
    status: "",
    email: [],
  })

  const onSubmit = () => {
    props.instance.post('/account/email/read', {
      token: state.token,
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
        email: res.data.email,
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
      <button onClick={() => onSubmit()}>List email</button>
      <br></br>
      status: {state.status}
      <br></br>
      email:
      <br></br>
      {
      state.email.map((elem) => (
        <div>
        id: {elem.id}
        <br></br>
        address: {elem.address}
        <br></br>
        password: {elem.password}
        <br></br>
        status: {elem.status}
        <hr></hr>
        </div>
      ))
      }
    </div>
  )
}

export default AccountEmailRead;