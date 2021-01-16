import React, {useState} from 'react';

function AccountEmailCreate(props) {
  const [state, setState] = useState({
    token: "",
    address: "",
    password: "",
    status: "",
    id: "",
  })

  const onSubmit = () => {
    props.instance.post('/account/email/create', {
      token: state.token,
      address: state.address,
      password: state.password,
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
        id: res.data.id,
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
      <button onClick={() => onSubmit()}>Add email</button>
      <br></br>
      status: {state.status}
      <br></br>
      id: {state.id}
    </div>
  )
}

export default AccountEmailCreate;