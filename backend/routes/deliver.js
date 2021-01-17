const express = require('express')
const nodemailer = require('nodemailer')

const multer = require('multer')
var upload = multer({ storage: multer.memoryStorage() })

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
  console.log('/deliver/create', token, emailId, contentId, recipients, cc, bcc, attachments)

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
      response[0].mailList[0].content.forEach((content) => {
        if (String(content._id) === String(contentId)) {
          recipients.forEach((recipient, index) => {
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
              subject: content.subject,
              html: content.text,
              attachments: attachments.map((attachment) => (
                 {
                  filename: attachment.originalname,
                  content: Buffer.from(attachment.buffer),
                  contentType: attachment.mimetype,
                 }
              ))
            }
            
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response)
              }
            })
          })
          console.log('ok')
          res.status(200).send({
            status: 'ok',
          })
        }
      })
    }
  })
})

module.exports = router