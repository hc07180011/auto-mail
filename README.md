# Pigeons Mail

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/favicon.png" width="200">

## Motivation
For organizations or activity holders, there are frequent needs to send a larger number of emails with a similar format to members or participants. However, sometimes PR wants to customize mail contents according to the receiver's personal information (e.g. name, student id, etc), so they have to send the emails one by one. To deal with the problem, we decide to build an automatic email sending service and share the service with others.

## Service
### Login
 - Sign up
 - Login
    - Username and Password
    - Google Account

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/login_page.png" width="600">

### Editor Page
 1. Choose an email account as email-sender

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/service_content1.png" width="600">

 2. Upload excel files with receiver information

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/service_content2.png" width="600">

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/service_content3.png" width="600">

 3. Add tags to email 
  - Tag content will be copied to clipborad when a tag is clicked. 
  - Recipients, CC, BCC: add tags through plus button

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/service_content4.png" width="600">

  - Subject, Email content: 

<img src="https://github.com/hc07180011/auto-mail/blob/main/frontend/public/service_content5.png" width="600">

 4. Content will be saved automatically afted sending


## Frontend

### Environment

* **OS**: MacOS, Ubuntu, [Vercel](https://vercel.com/docs/runtimes)
* Latest version of [React](https://reactjs.org)
* npm 6.14.4

### Packages

* [```"@agney/react-loading": "^0.1.2"```](https://reactjsexample.com/simple-and-accessible-loading-indicators-with-react/): provides loading animation
* [```"@material-ui/core": "^4.11.2"```](https://material-ui.com): variance design themes
* [```"@material-ui/icons": "^4.11.2"```](https://material-ui.com): variance icons
* [```"axios": "^0.21.1"```](https://github.com/axios/axios): promise based http client
* [```"braft-editor": "^2.3.9"```](https://braft.margox.cn): mail editor generating html text
* [```"react-google-login": "^5.2.2"```](https://anthonyjgrove.github.io/react-google-login/?path=/story/google-login-button--default-button): login tool for google accounts

### Deployment

You have **three** options, two stable versions along with one beta version

#### Prerequisition

1. Get a google login api credential. (see [here](https://developers.google.com/identity/sign-in/web/sign-in) for more details)
2. Replace the ```clientId``` with your own id
3. Setup ```rediredtUrl``` with the domain you are going to use
4. **Make sure you are using ```https```**

#### ```MacOS```, ```Ubuntu```

0. Make sure the web server is availabe

1. Clone the repo
```bash
git clone https://github.com/hc07180011/auto-mail.git
cd frontend/
```

2. Install dependencies

```bash
yarn
```

3. Build the service

```bash
yarn build
```

4. Deploy on a server

```bash
cp -r build/* ${webServerBaseDir}/
```

#### [```Vercel```](https://vercel.com/docs/runtimes)

0. Register an account

1. Follow the instructions and enjoy! 🎉

#### Beta: **desktop app** (```electron.js```)

1. Clone the repo

```bash
git clone https://github.com/hc07180011/auto-mail.git
cd frontend/
```

2. Install dependencies

```bash
npm install
```

3. Build the application

```bash
npm run build
npm run build-app
```

4. Open the app generated by ```electron.js```

## Backend

### Environment

* **OS**: Ubuntu, [Heroku](http://heroku.com)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* node v10.19.0
* npm 6.14.4

### Packages

* [```"cors": "^2.8.5"```](https://expressjs.com/en/resources/middleware/cors.html): provides ```CORS``` option for backend
* [```"crypto": "^1.0.1"```](https://nodejs.org/api/crypto.html): supports ```md5()``` asymmetric encryption
* [```"dotenv-defaults": "^2.0.1"```](https://www.npmjs.com/package/dotenv-defaults): keeps ```MONGO_URL``` secret
* [```"express": "^4.17.1"```](http://expressjs.com): fast, unopinionated, minimalist web framework for Node.js
* [```"google-auth-library": "^6.1.4"```](https://github.com/googleapis/google-auth-library-nodejs): Google authentication library
* [```"googleapis": "^67.0.0"```](https://developers.google.com/apis-explorer/): Google official apis
* [```"mongoose": "^5.11.12"```](https://mongoosejs.com): mongoDB connection
* [```"multer": "^1.4.2"```](https://www.npmjs.com/package/multer): enable file uploading
* [```"nodemailer": "^6.4.17"```](https://nodemailer.com): send email using ```smtp``` protocal
* [```"nodemon": "^2.0.7```](https://nodemon.io): backend management

### Deployment

You have **two** options.

#### Prerequisition

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) official website and create a cluster
2. Keep the login url, which is going to be used later
3. Change the ```redirectUrl``` to the domain you want to use
4. Change ```clientId``` and ```clientSecret``` to your GCP keys

#### ```Ubuntu```

1. Clone the repo
```bash
git clone https://github.com/hc07180011/auto-mail.git
cd backend/
```

2. Install dependencies

```bash
npm install
```

3. Start the service

```bash
npm run server
```

#### [```Heroku```](http://heroku.com)

0. Register an account

1. Follow the instructions and enjoy! 🎉

## Contribution

* 趙允祥, B06902017, CSIE, NTU
  * Frontend: [welcome page](https://pigeons-mail.vercel.app/welcome/), API template
  * Backend: MongoDB, Node.js, API
  * Deployment
* 邱于賓, B06902096, CSIE, NTU
  * Frontend: Flow tesing, UI optimization
  * Backend: API testing
* 陳彥　, B06902047, CSIE, NTU
  * Frontend: UI tesing, packages research
  * Backend: API testing

### 外掛

* 陳若婕, B08902009, CSIE, NTU
  * Design an original logo for us
  * Because our group members have no art talent
  
## Website Link

* [Pigeons](https://pigeons-mail.vercel.app)
