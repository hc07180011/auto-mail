const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const multer = require('multer')
const upload = multer({ dest: 'upload/'})

const router = express.Router()

const User = require('../models/user')

router.post('/testAlive', (_, res) => {
  res.status(200).send({
    status: 'ok'
  })
})

router.post('/create', upload.array('attachments', 32), (req, res) => {
  const token = req.body.token
  const emailId = req.body.emailId
  const contentId = req.body.contentId
  const attachments = req.files
  const recipients = req.body.recipients.split(",")
  const cc = req.body.cc
  const bcc = req.body.bcc
  console.log('/deliver/create', token, emailId, contentId, recipients, cc, bcc, req.files)

  User.find({
    $and: [
      { token: token },
      { "mailList._id": emailId }
    ]
  },
  { "mailList.$": 1 }
  )
  .exec((error, response) => {
    if (error) {
      console.log('internal error')
      res.status(500).send({
        status: 'internal error',
      })
    }
    else if (!response.length || !response[0].mailList.length) {
      console.log('internal error')
      res.status(500).send({
        status: 'token/emailId invalid',
      })
    }
    else {
      recipients.forEach(recipient => {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: response[0].mailList[0].address,
            pass: response[0].mailList[0].password,
          }
        })
        
        var mailOptions = {
          from: response[0].mailList[0].address,
          to: recipient,
          cc: cc,
          bcc: bcc,
          subject: 'Sending Email using Node.js',
          html: '<h1>Welcome</h1><p>That was easy!</p>',
          attachments: attachments
        }
        
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
      })
      console.log('ok')
      res.status(200).send({
        status: 'ok',
      })
    }
  })
})

module.exports = router