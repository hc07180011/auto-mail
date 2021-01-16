import React from 'react';

import AccountRead from './api_example/account/read';
import AccountCreate from './api_example/account/create';
import AccountDelete from './api_example/account/delete';
import AccountEmailCreate from './api_example/account/email_create';
import AccountEmailRead from './api_example/account/email_read';
import AccountEmailUpdate from './api_example/account/email_update';
import AccountEmailDelete from './api_example/account/email_delete';

import ContentCreate from './api_example/content/create';
import ContentRead from './api_example/content/read';
import ContentDelete from './api_example/content/delete';
import ContentDetailRead from './api_example/content/detail_read';
import ContentDetailUpdate from './api_example/content/detail_update';

const baseUri = "api.automail.henrychao.me"

class App extends React.Component {

  constructor() {
    super()
    this.state = ({ page: "" })
  }

  render() {
    let page
    switch (this.state.page) {
      case "AccountCreate":
        page = <AccountCreate />
        break
      case "AccountRead":
        page = <AccountRead />
        break
      case "AccountDelete":
        page = <AccountDelete />
        break
      case "AccountEmailCreate":
        page = <AccountEmailCreate />
        break
      case "AccountEmailRead":
        page = <AccountEmailRead />
        break
      case "AccountEmailUpdate":
        page = <AccountEmailUpdate />
        break
      case "AccountEmailDelete":
        page = <AccountEmailDelete />
        break
      case "ContentCreate":
        page = <ContentCreate />
        break
      case "ContentRead":
        page = <ContentRead />
        break
      case "ContentDelete":
        page = <ContentDelete />
        break
      case "ContentDetailRead":
        page = <ContentDetailRead />
        break
      case "ContentDetailUpdate":
        page = <ContentDetailUpdate />
        break
      default:
        break
    }
    return  (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        Choose an api to test:
        <br></br>
        <select onChange={(e) => this.setState({ ...this.state, page: e.target.value })}>
          <option value="None" ></option>
          <option value="AccountCreate">POST {baseUri}/account/create</option>
          <option value="AccountRead">POST {baseUri}/account/read</option>
          <option value="AccountDelete">POST {baseUri}/account/delete</option>
          <option value="AccountEmailCreate">POST {baseUri}/account/email/create</option>
          <option value="AccountEmailRead">POST {baseUri}/account/email/read</option>
          <option value="AccountEmailUpdate">POST {baseUri}/account/email/update</option>
          <option value="AccountEmailDelete">POST {baseUri}/account/email/delete</option>
          <option value="ContentCreate">POST {baseUri}/content/create</option>
          <option value="ContentRead">POST {baseUri}/content/read</option>
          <option value="ContentDetailRead">POST {baseUri}/content/detail/read</option>
          <option value="ContentDetailUpdate">POST {baseUri}/content/detail/update</option>
          <option value="ContentDelete">POST {baseUri}/content/delete</option>
        </select>
        <br></br>
        <hr></hr>
        API Playground:
        <br></br>
        <div style={{ marginTop: "5%" }}>{page}</div>
      </div>
    )
  }
}

export default App;
