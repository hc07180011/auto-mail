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

  try {
    const productionMode = req.body.productionMode
    const token = req.body.token
    const emailId = req.body.emailId
    const subject = req.body.subject
    const text = req.body.text
    const authToken = req.body.authToken
    const attachments = req.files
    const recipients = req.body.recipients.split(",").filter(elem => elem.length)
    const cc = req.body.cc.split(",").filter(elem => elem.length)
    const bcc = req.body.bcc.split(",").filter(elem => elem.length)
    const tmpExcelData = JSON.parse(req.body.excelData)
    var excelData = {}
    for (var i = 0; i < tmpExcelData[0].length; i++) {
      tmpExcelData[0][i] = "$[[" + tmpExcelData[0][i] + "]]"
      excelData[tmpExcelData[0][i]] = []
      for (var j = 1; j < tmpExcelData.length; j++) {
        excelData[tmpExcelData[0][i]].push(tmpExcelData[j][i])
      }
    }
    console.log('/deliver/create', productionMode, token, emailId, subject, text, authToken, recipients, cc, bcc, excelData, attachments.length)

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
        if (response[0].mailList[0].address.includes('gmail.com')) {
          const oAuth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URL,
          )

          oAuth2Client
          .getToken(authToken)
          .then((tokenResult) => {
            const refreshToken = tokenResult.tokens.refresh_token
            const accessToken = tokenResult.tokens.access_token
            console.log('success', refreshToken, accessToken)

            for (var i = 0; i < tmpExcelData.length-1; i++) {

              var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: response[0].mailList[0].address,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                },
              })
              
              var to_ = []
              for (var j = 0; j < recipients.length; j++) {
                if (excelData[recipients[j]][i]) {
                  to_.push(excelData[recipients[j]][i])
                }
              }
              var cc_ = []
              for (var j = 0; j < cc.length; j++) {
                if (excelData[cc[j]][i]) {
                  cc_.push(excelData[cc[j]][i])
                }
              }
              var bcc_ = []
              for (var j = 0; j < bcc.length; j++) {
                if (excelData[bcc[j]][i]) {
                  bcc_.push(excelData[bcc[j]][i])
                }
              }

              var subject_ = subject
              for (var j = 0; j < tmpExcelData[0].length; j++) {
                if (excelData[tmpExcelData[0][j]][i]) {
                  subject_ = subject_.replace(tmpExcelData[0][j], excelData[tmpExcelData[0][j]][i])
                } else {
                  subject_ = subject_.replace(tmpExcelData[0][j], '')
                }
              }
              var html_ = text
              for (var j = 0; j < tmpExcelData[0].length; j++) {
                if (excelData[tmpExcelData[0][j]][i]) {
                  html_ = html_.replace(tmpExcelData[0][j], excelData[tmpExcelData[0][j]][i])
                } else {
                  html_ = html_.replace(tmpExcelData[0][j], '')
                }
              }

              console.log('round', i)
              console.log('===========')
              console.log('from: ', response[0].mailList[0].address)
              console.log('to: ', to_)
              console.log('cc: ', cc_)
              console.log('bcc: ', bcc_)
              console.log('subject: ', subject_)
              console.log('html: ', html_)

              var mailOptions = {
                from: response[0].mailList[0].address,
                to: to_,
                cc: cc_,
                bcc: bcc_,
                subject: subject_,
                generateTextFromHTML: true,
                html: html_,
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
              
            }
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
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

module.exports = router