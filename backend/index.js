require('dotenv-defaults').config()

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

const ip = require("ip")
console.error(`ip: ${ip.address()}`)

console.error(`Current dir: ${process.cwd()}`)
console.error(`mongo url: ${process.env.MONGO_URL}`)

const account = require('./routes/account')
const content = require('./routes/content')
const deliver = require('./routes/deliver')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  const app = express()

  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100
  })

  var corsOptions = {
    allowHeaders: [
      'X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override',
      'Content-Type','Authorization','Accept','Accept-Version','Date',
      'X-Api-Version','Content-MD5','Content-Length','X-CSRF-Token'
    ],
    allowCredentials: true,
    exposeHeaders: [],
    maxAge: 86400,
    origin: '*',
  }

  // init middleware
  app.use(cors(corsOptions))
  app.use(limiter)
  app.use(express.json())
  app.use((req, res, next) => {
    return next()
  })

  app.use('/account', account)
  app.use('/content', content)
  app.use('/deliver', deliver)

  const PORT = process.env.PORT

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
