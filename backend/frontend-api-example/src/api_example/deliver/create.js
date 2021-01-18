import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';

function DeliverCreate(props) {
  const [state, setState] = useState({
    token: "",
    emailId: "",
    contentId: "",
    attachments: [],
    recipients: "hendry0718@gmail.com, b06902017@csie.ntu.edu.tw",
    cc: "henrychao0718@gmail.com",
    bcc: "b06902017@ntu.edu.tw",
    status: "",
  })

  const onSubmit = () => {
    var data = new FormData()
    data.append("token", state.token)
    data.append("emailId", state.emailId)
    data.append("contentId", state.contentId)
    for (var i = 0; i < state.attachments.length; i++) {
      data.append('attachments', state.attachments[i])
    }
    data.append("recipients", state.recipients.split(", "))
    data.append("cc", state.cc)
    data.append("bcc", state.bcc)
    props.instance.post('/deliver/create', data, {
      'content-type': 'multipart/form-data'
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

  const responseGoogle = (response) => {
    var data = new FormData()
    data.append("token", state.token)
    data.append("emailId", state.emailId)
    data.append("contentId", state.contentId)
    data.append("authToken", response.code)
    for (var i = 0; i < state.attachments.length; i++) {
      data.append('attachments', state.attachments[i])
    }
    data.append("recipients", state.recipients.split(", "))
    data.append("cc", state.cc)
    data.append("bcc", state.bcc)
    props.instance.post('/deliver/create', data, {
      'content-type': 'multipart/form-data'
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
      attachments:
      <input type="file" multiple="multiple" onChange={(e) => setState({
        ...state,
        attachments: e.target.files
      })}></input>
      <br></br>
      recipients:
      <input type="text" defaultValue="hendry0718@gmail.com, b06902017@csie.ntu.edu.tw" onChange={(e) => setState({
        ...state,
        recipients: e.target.value,
      })}></input>
      <br></br>
      cc:
      <input type="text" defaultValue="henrychao0718@gmail.com" onChange={(e) => setState({
        ...state,
        cc: e.target.value,
      })}></input>
      <br></br>
      bcc:
      <input type="text" defaultValue="b06902017@ntu.edu.tw" onChange={(e) => setState({
        ...state,
        bcc: e.target.value,
      })}></input>
      <br></br>
      <button onClick={() => onSubmit()}>Send!</button>
      <br></br>
      <GoogleLogin
        clientId="421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com"
        buttonText="Send Gmail"
        scope="https://mail.google.com/"
        responseType="code"
        approvalPrompt="force"
        prompt='consent'
        accessType="offline"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <br></br>
      status: {state.status}
    </div>
  )
}

export default DeliverCreate;