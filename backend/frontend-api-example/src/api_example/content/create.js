import React, {useState} from 'react';

function ContentCreate(props) {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    subject: "",
    text: "",
    status: "",
    id: "",
  })

  const onSubmit = () => {
    props.instance.post('/content/create', {
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