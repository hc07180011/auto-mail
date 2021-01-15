const express = require('express')
const { model } = require('mongoose')

const router = express.Router()

router.post('/register', (req, res) => {
    res.status(200).send({
        msg: 'ok'
    })
})

module.exports = router