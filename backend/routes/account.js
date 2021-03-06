const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')

const router = express.Router()

const User = require('../models/user')

router.post('/testAlive', (_, res) => {
  res.status(200).send({
    status: 'ok'
  })
})

router.post('/create', (req, res) => {

  try {

    const username = req.body.username
    const email = req.body.email
    const password = crypto.createHash('md5').update(req.body.password).digest('hex')
    console.log('/account/create', username, email, password)

    const seed = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const token = Array(256).fill(seed).map(function(x) {
      return x[Math.floor(Math.random() * x.length)]
    }).join('')
    const mailList = []
    
    User.insertMany([{
      username: username,
      email: email,
      password: password,
      token: token,
      mailList: mailList,
    }], (err, result) => {
      console.log(err)
      if (err && err.name && err.name === 'BulkWriteError') {
        User.find({
          username: username
        })
        .exec((error, response) => {
          if (response.length) {
            console.log('username already taken')
            res.status(200).send({
              status: 'username already taken',
            })
          }
        })
        User.find({
          email: email
        })
        .exec((error, response) => {
          if (response.length) {
            console.log('email already taken')
            res.status(200).send({
              status: 'email already taken',
            })
          }
        })
      }
      else if (err) {
        console.log(err)
        res.status(500).send({
          status: 'internal error',
        })
      }
      else {
        console.log('ok')
        res.status(200).send({
          status: 'ok',
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

router.post('/read', (req, res) => {

  try {
    const usernameOrEmail = req.body.usernameOrEmail
    const password = crypto.createHash('md5').update(req.body.password).digest('hex')
    console.log('/account/read', usernameOrEmail, password)

    User.find({
      $and: [
        { $or: [{username: usernameOrEmail}, {email: usernameOrEmail}] },
        { password: password },
      ],
    })
    .exec((error, response) => {
      if (error) {
        console.log(error)
        res.status(500).send({
          status: 'internal error',
        })
      }
      else if (!response.length) {
        console.log('wrong username/password')
        res.status(200).send({
          status: 'wrong username/password',
        })
      }
      else {
        console.log('ok')
        res.status(200).send({
          status: 'ok',
          token: response[0].token,
          username: response[0].username,
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

router.post('/delete', (_, res) => {

  try {
    console.log('delete all data')
    User.deleteMany({}, () => {
      res.status(200).send({
        status: 'ok',
      })
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

router.post('/email/create', (req, res) => {

  try {
    const token = req.body.token
    const address = req.body.address
    const password = req.body.password
    const id = mongoose.Types.ObjectId()
    console.log('/account/email/create', token, address, password, id)

    User.updateOne(
      {token: token},
      { 
        $push: {
          mailList: {
            _id: id,
            address: address,
            password: password,
            content: [],
          } 
        }
      },
      (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).send({
            status: 'internal error',
          })
        }
        else {
          console.log('ok')
          res.status(200).send({
            status: 'ok',
            id: id,
          })
        }
      }
    )
  } catch(error) {
    console.log(error)
    res.status(500).send({
      status: 'internal error',
    })
  }
})

router.post('/email/read', (req, res) => {

  try {
    const token = req.body.token
    console.log('/account/email/read', token)

    User.find({
      token: token
    })
    .exec((error, response) => {
      if (error) {
        console.log(errpr)
        res.status(500).send({
          status: 'internal error',
        })
      }
      else if (!response.length) {
        console.log('token invalid')
        res.status(200).send({
          status: 'token invalid',
        })
      }
      else {
        console.log('ok')
        res.status(200).send({
          status: 'ok',
          email: (
            response[0].mailList.length ?
            response[0].mailList.map((elem) => {
              return {
                id: elem._id,
                address: elem.address,
                status: "true",
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

router.post('/email/update', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    const address = req.body.address
    const password = req.body.password
    console.log('/account/email/update', token, emailId, address, password)

    User.updateOne({
        token: token,
        "mailList._id": emailId,
      },
      { 
        $set: {
          "mailList.$.address": address,
          "mailList.$.password": password,
        }
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

router.post('/email/delete', (req, res) => {

  try {
    const token = req.body.token
    const emailId = req.body.emailId
    console.log('/account/email/delete', token, emailId)

    User.updateOne({
        token: token,
      },
      {
        $pull: {
          mailList: { _id: emailId }
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
          console.log('token/emailId invalid')
          res.status(200).send({
            status: 'token/emailId invalid',
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