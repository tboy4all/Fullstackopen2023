const Blog = require('./../models/blogModel')

exports.createBlog = async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body)

    // res.status(201).json(newBlog)
    res.status(201).json({
      status: 'success',
      data: {
        tour: newBlog,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()

    // res.status(200).json(blogs)
    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: blogs.length,
      data: {
        blogs,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getBlog = async (req, res, next) => {
  'use strict'
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return next('No blog found with that ID', 404)
    }
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    })

    res.status(200).json(blog)
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.updateBlog = async (req, res, next) => {
  'use strict'
  try {
    // const body = request.body
    // const updatePerson = {
    //   name: body.name,
    //   number: body.number,
    // }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    })
    res.status(200).json(blog)
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.deleteBlog = async (req, res, next) => {
  'use strict'
  try {
    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}
