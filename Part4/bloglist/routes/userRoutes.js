const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// Protect all routes after this middleware
router.use(authController.protect)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router.route('/:id').get(userController.getUser)
//   .patch(blogController.updateBlog)
//   .delete(blogController.deleteBlog)

module.exports = router
