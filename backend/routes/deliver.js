const express = require('express')
const nodemailer = require('nodemailer')

const multer = require('multer')
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 }
})

const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const router = express.Router()

const User = require('../models/user')

router.post('/testAlive', (_, res) => {
  res.status(200).send({
    status: 'ok'
  })
})

router.post('/create', upload.array('attachments', 8), (req, res) => {
  const token = req.body.token
  const emailId = req.body.emailId
  const contentId = req.body.contentId
  const authToken = req.body.authToken
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
      res.status(200).send({
        status: 'token/emailId invalid',
      })
    }
    else {
      response[0].mailList[0].content.forEach((content) => {
        if (String(content._id) === String(contentId)) {
          if (response[0].mailList[0].address.includes('gmail.com')) {
            const oAuth2Client = new OAuth2(
              '421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com',
              'ZoVhm_48CzhGJfDN2zqjDRj7',
              'http://ntuai.csie.org/automail/api/'
            )

            oAuth2Client
            .getToken(authToken)
            .then((tokenResult) => {
              const refreshToken = tokenResult.tokens.refresh_token
              const accessToken = tokenResult.tokens.access_token
              console.log('success', refreshToken, accessToken)

              recipients.forEach((recipient) => {
                var transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                      type: 'OAuth2',
                      user: response[0].mailList[0].address,
                      clientId: '421394122052-uslhegpknc7pqmfeto1k6rr65m28gtdi.apps.googleusercontent.com',
                      clientSecret: 'ZoVhm_48CzhGJfDN2zqjDRj7',
                      refreshToken: refreshToken,
                      accessToken: accessToken,
                  },
                })
                
                var mailOptions = {
                  from: response[0].mailList[0].address,
                  to: recipient,
                  cc: cc,
                  bcc: bcc,
                  subject: content.subject,
                  generateTextFromHTML: true,
                  html: content.text,
                  attachments: attachments.map((attachment) => (
                    {
                      filename: attachment.originalname,
                      content: Buffer.from(attachment.buffer),
                      contentType: attachment.mimetype,
                    }
                  )),
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
            })
            .catch((err) => {
              console.log('failed', err)
            })
          }
          else {
            recipients.forEach((recipient) => {
              var transporter = nodemailer.createTransport({
                host: 'smtps.ntu.edu.tw',
                port: 465,
                secure: true,
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
              console.log('ok')
              res.status(200).send({
                status: 'ok',
              })
            })
          }
        }
      })
    }
  })
})

module.exports = router