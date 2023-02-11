const router = require('express').Router()
const Blog = require('../models/blogModel')

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})

  res.status(204).end()
})

module.exports = router
