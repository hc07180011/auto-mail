import React, {useState} from 'react';

function ContentRead(props) {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    username: "",
    status: "",
    content: [],
  })

  const onSubmit = () => {
    props.instance.post('/content/read', {
      token: state.token,
      emailId: state.emailId
    })
    .then((res) => {
      setState({
        ...state,
        status: res.data.status,
        content: res.data.content,
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
      <button onClick={() => onSubmit()}>List email</button>
      <br></br>
      status: {state.status}
      <br></br>
      content:
      <br></br>
      {
      state.content.map((elem) => (
        <div>
        id: {elem.id}
        <br></br>
        subject: {elem.subject}
        <hr></hr>
        </div>
      ))
      }
    </div>
  )
}

export default ContentRead;