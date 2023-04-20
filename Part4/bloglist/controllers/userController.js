// const bcrypt = require('bcrypt')
const User = require('./../models/userModel')

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  })
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })

    const displayUsers = users.map((user) => user.toJSON())

    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: users.length,
      data: {
        displayUsers,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getUser = async (req, res, next) => {
  'use strict'
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return next('No user found with that ID', 404)
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}
