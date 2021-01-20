const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const User = require('../models/user')

router.post('/testAlive', (_, res) => {
  res.status(200).send({
    status: 'ok'
  })
})

router.post('/create', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    const subject = req.body.subject
    const text = req.body.text
    const id = mongoose.Types.ObjectId()
    console.log('/content/create', token, emailId, subject, text, id)

    User.updateOne({
        token: token,
        "mailList._id": emailId,
      },
      { 
        $push: {
          "mailList.$.content": {
            _id: id,
            subject: subject,
            text: text,
          },
        },
      },
      (err, result) => {
        if (err) {
          console.log('internal error')
          res.status(500).send({
            status: 'internal error',
          })
        }
        else if (!result.n) {
          console.log('token/emailId invalid')
          res.status(200).send({
            status: 'token/emailId invalid',
          })
        }
        else {
          console.log('ok')
          res.status(200).send({
            status: 'ok',
            id: id,
          })
        }
      },
    )
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

router.post('/read', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    console.log('/content/read', token, emailId)

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
        console.log('ok')
        res.status(200).send({
          status: 'ok',
          content: (
            response[0].mailList[0].content.length ?
            response[0].mailList[0].content.map((elem) => {
              return {
                id: elem._id,
                subject: elem.subject,
              }
            }) :
            []
          ),
        })
      }
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

router.post('/detail/read', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    const contentId = req.body.contentId
    console.log('/content/detail/read', token, emailId, contentId)

    User.find({
      $and: [
        { token: token },
        { "mailList._id": emailId },
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
      else if (!response.length || !response[0].mailList.length || !response[0].mailList[0].content.length) {
        console.log('token/emailId/contentId invalid')
        res.status(200).send({
          status: 'token/emailId/contentId invalid',
        })
      }
      else {
        response[0].mailList[0].content.forEach(elem => {
          if (String(elem._id) === contentId) {
            console.log('ok')
            res.status(200).send({
              status: 'ok',
              subject: elem.subject,
              text: elem.text
            })
          }
        })
      }
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

router.post('/detail/update', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    const contentId = req.body.contentId
    const subject = req.body.subject
    const text = req.body.text
    console.log('/content/detail/update', token, emailId, contentId, subject, text)

    User.find({
      $and: [
        { token: token },
        { "mailList._id": emailId },
        { "mailList.content._id": contentId },
      ]
    },
    { "mailList.content.$": 1 }
    )
    .exec((error, response) => {
      if (error) {
        console.log('internal error')
        res.status(500).send({
          status: 'internal error',
        })
      }
      else if (!response.length || !response[0].mailList.length || !response[0].mailList[0].content.length) {
        console.log('token/emailId/contentId invalid')
        res.status(200).send({
          status: 'token/emailId/contentId invalid',
        })
      }
      else {
        for (var i = 0; i < response[0].mailList[0].content.length; i++) {
          console.log(response[0].mailList[0].content[i])
          if (String(response[0].mailList[0].content[i]._id) === contentId) {
            response[0].mailList[0].content[i] = {
              _id: mongoose.Types.ObjectId(contentId),
              subject: subject,
              text: text,
              attachments: []
            }
            console.log('after mod', response[0].mailList[0].content[i])
            response[0].markModified("mailList.0.content")
            console.log('ok')
            res.status(200).send({
              status: 'ok',
            })
            response[0].save()
            return
          }
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

router.post('/delete', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    const contentId = req.body.contentId
    console.log('/content/delete', token, emailId, contentId)

    User.updateOne({
        token: token,
        "mailList._id": emailId,
      },
      {
        $pull: {
          "mailList.$.content": { _id: contentId }
        }
      },
      (err, result) => {
        if (err) {
          console.log('internal error')
          res.status(500).send({
            status: 'internal error',
          })
        }
        else if (!result.n || !result.nModified) {
          console.log('token/emailId/contentId invalid')
          res.status(200).send({
            status: 'token/emailId/contentId invalid',
          })
        }
        else {
          console.log('ok')
          res.status(200).send({
            status: 'ok',
          })
        }
      },
    )
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

module.exports = router