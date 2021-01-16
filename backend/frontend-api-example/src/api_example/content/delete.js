import React, {useState} from 'react';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

function ContentDelete() {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    contentId: "",
    status: "",
  })

  const onSubmit = () => {
    instance.post('/content/delete', {
      token: state.token,
      emailId: state.emailId,
      contentId: state.contentId,
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
      contentId:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        contentId: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Delete content</button>
      <br></br>
      status: {state.status}
    </div>
  )
}

export default ContentDelete;