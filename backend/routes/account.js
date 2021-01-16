const express = require('express')
const { model } = require('mongoose')

const router = express.Router()

router.post('/testAlive', (_, res) => {
  res.status(200).send({
    status: 'ok'
  })
}) 

module.exports = router