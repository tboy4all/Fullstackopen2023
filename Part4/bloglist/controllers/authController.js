/* eslint-disable no-unused-vars */
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { createSendToken } = require('../utils/token')

exports.signup = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body)

  //   const saltRounds = 10
  //   const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  })

  const { username, password } = newUser

  if (!(username && password)) {
    return res.status(400).json({
      error: 'username and password are required',
    })
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'username and password must be at least 3 characters long',
    })
  }

  createSendToken(newUser, 201, req, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body

  // 1) Check if email and password exist
  if (!username || !password) {
    return next(new AppError('Please provide a valid username and password'))
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ username }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401))
  }

  // 3) if everything is ok, send token to client
  createSendToken(user, 200, req, res)
})

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    status: 'success',
  })
}

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }
  //   console.log(token)

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    )
    // return res.status(401).json({
    //   error: 'token invalid',
    // })
  }

  // 4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError('User recently changed password! Please log in again', 401)
  //     )
  //   }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  res.locals.user = currentUser
  next()
})
