const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blogModel')

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have id property named id instead of _id', async () => {
    const singleBlog = await helper.blogsInDb()

    expect(singleBlog[0].id).toBeDefined()
    expect(singleBlog[0]._id).toBe(undefined)
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const loginUser = {
        username: 'test',
        password: 'password',
      }

      const loggedUser = await api
        .post('/api/users/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'Test an app Blog',
        author: 'Jhon Doe',
        url: 'https://fullstackopen.com/',
        likes: 4,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((t) => t.title)
      expect(titles).toContain('Test an app Blog')
    })

    test('verifies that if the likes property is missing, then default it to 0', async () => {
      const loginUser = {
        username: 'test',
        password: 'password',
      }

      const loggedUser = await api
        .post('/api/users/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'Testing default like',
        author: 'Josh Smith',
        url: 'https://example.com/',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // expect(res.body.likes).toBeDefined()
      // expect(res.body.likes).toBe(0)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('backend responds with status 400 if title and url are missing', async () => {
      const newBlog = {
        // author: 'Testing app',
        likes: 2,
      }
      await api.post('/api/blogs').send(newBlog).expect(400)
      // .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('if token is not provided blog is not added', async () => {
      const newBlog = {
        title: 'Test an app',
        author: 'Jhon Doe',
        url: 'https://fullstackopen.com/',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog ', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const loginUser = {
        username: 'test',
        password: 'password',
      }

      const loggedUser = await api
        .post('/api/users/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status 200 if id is valid', async () => {
      const loginUser = {
        username: 'test',
        password: 'password',
      }

      const loggedUser = await api
        .post('/api/users/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'Masterpiece',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(newBlog)
        .expect(201)

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart.find(
        (blog) => blog.title === newBlog.title
      )

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }

      // await api
      //   .put(`/api/blogs/${blogToUpdate.id}`)
      //   .send({ likes: 8 })
      //   .expect(200)
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      // const updatedBlog = blogsAtEnd[0]
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      // expect(updatedBlog.likes).toBe(8)
      const foundBlog = blogsAtEnd.find((blog) => blog.likes === 13)
      expect(foundBlog.likes).toBe(13)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
