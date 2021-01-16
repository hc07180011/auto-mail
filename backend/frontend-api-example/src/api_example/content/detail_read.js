import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function ContentDetailRead() {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    contentId: "",
    status: "",
    subject: "",
    text: "",
  })

  const onSubmit = () => {
    instance.post('/content/detail/read', {
      token: state.token,
      emailId: state.emailId,
      contentId: state.contentId,
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
        subject: res.data.subject,
        text: res.data.text,
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
      contentId:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        contentId: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>List content detail</button>
      <br></br>
      status: {state.status}
      <br></br>
      subject: {state.subject}
      <br></br>
      text: {state.text}
    </div>
  )
}

export default ContentDetailRead;