require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')

var ip = require("ip")
console.error(ip.address())

console.error(`Current dir: ${process.cwd()}`)

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

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

  wss.on('connection', ws => {
  })

  const PORT = (process.env.port || 4000)
  console.error(PORT)

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
