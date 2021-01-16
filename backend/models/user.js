const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required.'],
  },
  token: {
    type: String,
    required: [true, 'Token field is required.'],
  },
  mailList: [
    {
      address: {
        type: String,
        required: [true, 'Email address filed is required.'],
      },
      password: {
        type: String,
        required: [false],
      },
      content: [
        {
          subject: {
            type: String,
            required: [true, 'Subject of an email is required.'],
          },
          text: {
            type: String,
            required: [true, 'Content of an email is required.'],
          },
          attachments: [
            {
              fileName: {
                type: String,
                required: [true, 'File name is required.'],
              },
              filePath: {
                type: String,
                required: [true, 'File uploaded path is required.'],
              },
              thumbnail: {
                type: String,
                required: [true, 'Thumbnail path is required.'],
              },
            },
          ],
        },
      ],
    },
  ],
})

const User = mongoose.model('users', UserSchema)

module.exports = User