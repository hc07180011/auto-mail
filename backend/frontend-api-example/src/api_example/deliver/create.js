import React, {useState} from 'react';

import GoogleLogin from 'react-google-login';

import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

import * as XLSX from 'xlsx';

import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import copy from 'copy-to-clipboard';

function DeliverCreate(props) {
  const [state, setState] = useState({
    editorState: '',
    outputHTML: '',

    token: "",
    emailId: "",
    subject: "",
    text: "",
    attachments: [],
    recipients: "",
    cc: "",
    bcc: "",
    excelData: [],

    status: "",
  })

  const [popupState, setPopupState] = useState({
    recipients: false,
    cc: false,
    bcc: false,
  })

  const responseGoogle = (response) => {
    var data = new FormData()
    data.append("token", state.token)
    data.append("emailId", state.emailId)
    if (response) {
      data.append("authToken", response.code)
    }
    data.append("subject", state.subject)
    data.append("text", state.outputHTML)
    for (var i = 0; i < state.attachments.length; i++) {
      data.append('attachments', state.attachments[i])
    }
    data.append("recipients", state.recipients)
    data.append("cc", state.cc)
    data.append("bcc", state.bcc)
    data.append("excelData", JSON.stringify(state.excelData))
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
      attachments:
      <input type="file" multiple="multiple" onChange={(e) => setState({
        ...state,
        attachments: e.target.files
      })}></input>
      <br></br>
      recipients:
      <input type="text" value={state.recipients} onChange={(e) => setState({
        ...state,
        recipients: e.target.value,
      })}></input>
      <button onClick={() => {
        setPopupState({
          ...popupState,
          recipients: true
        }) 
      }}>click to add</button>
      {
        popupState.recipients ?
        (
          state.excelData.length ?
          state.excelData[0].map((elem, idx) => (
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            label={elem}
            icon={<LocationOnIcon />} 
            onClick={(e) => {
              setState({
                ...state,
                recipients: state.recipients + `$[[${elem}]],`
              })
              setPopupState({
                ...popupState,
                recipients: false
              }) 
            }}
          />
          )) :
          <></>
         ) :
         <></>
      }
      <br></br>
      cc:
      <input type="text" value={state.cc} onChange={(e) => setState({
        ...state,
        cc: e.target.value,
      })}></input>
      <br></br>
      bcc:
      <input type="text" value={state.bcc} onChange={(e) => setState({
        ...state,
        bcc: e.target.value,
      })}></input>
      <br></br>
      Excel:
      <input
        accept="*"
        onChange={(e) => {
          const reader = new FileReader()
          const workSheetIndex = 0
          reader.onload = (evt) => { // evt = on_file_select event
              /* Parse data */
              const bstr = evt.target.result;
              const wb = XLSX.read(bstr, {type:'binary'});
              /* Get first worksheet */
              const wsname = wb.SheetNames[workSheetIndex];
              const ws = wb.Sheets[wsname];
              /* Convert array of arrays */
              var data = XLSX.utils.sheet_to_json(ws, {header:1}).filter((elem) => elem.length)
              setState({
                ...state,
                excelData: data
              })
          };
          reader.readAsBinaryString(e.target.files[0]);
        }}
        type="file"
      />
      <br></br>
      <button onClick={() => responseGoogle(false)}>Send!</button>
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
      subject:
      <input type="text" defaultValue="" onChange={(e) => setState({
        ...state,
        subject: e.target.value,
      })}></input>
      <br></br>
      {
        state.excelData.length ?
        state.excelData[0].map((elem, idx) => (
        <Chip
          variant="outlined"
          color="primary"
          size="small"
          label={elem}
          icon={<LocationOnIcon />} 
          onClick={(e) => {
            copy(`$[[${elem}]]`)
          }}
        />
        )) :
        <></>
      }
      <br></br>
      <div>
        <div className="editor-wrapper" style={{ height: "50vh" }}>
          <BraftEditor
            value={state.editorState}
            onChange={(e) => {
              setState({
                ...state,
                editorState: e,
                outputHTML: e.toHTML()
              })
            }}
          />
        </div>
      </div>
      status: {state.status}
    </div>
  )
}

export default DeliverCreate;