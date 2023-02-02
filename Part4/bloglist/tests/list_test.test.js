const listHelper = require('../utils/list_helper')
const { noBlogs, listWithOneBlog, blogs } = require('./blog_posts_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(10)
  })

  test('when list has many blogs, equals the sum of them all', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has no blogs, equals to null', () => {
    const result = listHelper.favoriteBlog(noBlogs)
    expect(result).toEqual({})
  })

  test('when list has one blog, equals to that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    })
  })

  test('when list has many blogs, equals to the most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('when list has no blogs, equals to null', () => {
    const result = listHelper.mostBlogs(noBlogs)
    expect(result).toEqual({})
  })

  test('when list has one blog, equals to that blog', () => {
    // const result = listHelper.mostBlogs(blogs.slice(0, 1))
    // expect(result).toEqual({
    //   author: 'Michael Chan',
    //   blogs: 1,
    // })
    expect(listHelper.mostBlogs(blogs.slice(0, 1))).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    })
  })

  test('when list has many blogs, equals to Robert C. Martin', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('when list has no blogs, equals to null', () => {
    const result = listHelper.mostLikes(noBlogs)
    expect(result).toEqual({})
  })

  test('when list has one blog, equals to that blog', () => {
    // const result = listHelper.mostLikes(listWithOneBlog)
    // expect(result).toEqual({
    //   author: 'Robert C. Martin',
    //   likes: 10,
    // })
    expect(listHelper.mostLikes(blogs.slice(0, 1))).toEqual({
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('when list has many blogs, equals to Edsger W. Dijkstra', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
