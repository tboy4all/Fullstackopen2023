/* eslint-disable no-unused-vars */
const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const favorite = blogs.reduce((last_blog, current_blog) => {
    return current_blog.likes > last_blog.likes ? current_blog : last_blog
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostiteratee = (blog) => blog.author

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authorCount = lodash.countBy(blogs, 'author')

  const topAuthor = Object.keys(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b
  })

  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const likesCount = lodash(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: lodash.sumBy(objs, 'likes'),
    }))
    .value()

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b
  })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
