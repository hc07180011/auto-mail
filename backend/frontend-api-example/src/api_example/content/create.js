import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function ContentCreate() {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    subject: "",
    text: "",
    status: "",
    id: "",
  })

  const onSubmit = () => {
    instance.post('/content/create', {
      token: state.token,
      emailId: state.emailId,
      subject: state.subject,
      text: state.text,
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
      emailId:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        emailId: e.target.value,
      })}></input>
      <br></br>
      subject:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        subject: e.target.value,
      })}></input>
      <br></br>
      text:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        text: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Compose email</button>
      <br></br>
      status: {state.status}
      <br></br>
      id: {state.id}
    </div>
  )
}

export default ContentCreate;