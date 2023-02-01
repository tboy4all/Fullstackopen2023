const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    required: [true, 'Title must be  provided'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  url: {
    type: String,
    required: [true, 'Author is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
