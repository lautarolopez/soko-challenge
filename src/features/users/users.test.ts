import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import { app } from '../../index'
import { connect } from '../../services/database/connection'
import { UserModel } from './users.model'
import { UserType } from './users.types'

let mongod: MongoMemoryServer

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  connect(uri)
})

afterAll(async () => {
  await mongod.stop()
})

beforeEach(async () => {
  await UserModel.deleteMany({})
})

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.co',
      password: 'password123',
    }

    const response = await request(app).post('/api/users').send(userData).set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('email', userData.email)
  })

  it('should respond with a 400 status for incorrect request', async () => {
    const response = await request(app).post('/api/users').set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('email: Required; password: Required.')
  })

  it('should return 400 for duplicated user', async () => {
    const duplicateUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    await request(app).post('/api/users').send(duplicateUser)

    const response = await request(app).post('/api/users').send(duplicateUser)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Duplicated key.')
  })
})

describe('GET /api/users', () => {
  it('should return a list of users without passwords', async () => {
    const testUsers = [
      { email: 'user1@example.com', password: 'password123' },
      { email: 'user2@example.com', password: 'password456' },
    ]
    await UserModel.insertMany(testUsers)

    const response = await request(app).get('/api/users')

    expect(response.status).toBe(200)

    expect(Array.isArray(response.body)).toBe(true)

    expect(response.body.length).toBe(testUsers.length)

    response.body.forEach((user: UserType & { password?: string }) => {
      expect(user.password).toBeUndefined()
    })
  })

  it('should return an empty array when there are no users', async () => {
    const response = await request(app).get('/api/users')

    expect(response.status).toBe(200)

    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBe(0)
  })
})

describe('GET /api/users/:id', () => {
  it('should return a user by ID without password', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    const savedUser = await UserModel.create(testUser)

    const response = await request(app).get(`/api/users/${savedUser._id}`)

    expect(response.status).toBe(200)

    expect(response.body._id).toBe(String(savedUser._id))
    expect(response.body.email).toBe(testUser.email)
    expect(response.body.password).toBeUndefined()
  })

  it('should return 404 for non-existing user ID', async () => {
    const nonExistentId = '5f7b1f5f782d0b1d9c9c0a5a'
    const response = await request(app).get(`/api/users/${nonExistentId}`)

    expect(response.status).toBe(404)
    expect(response.text).toBe('User not found.')
  })

  it('should return 400 for invalid user ID', async () => {
    const invalidId = 'ThisIsAnInvalidId'
    const response = await request(app).get(`/api/users/${invalidId}`)

    expect(response.status).toBe(400)
    expect(response.text).toBe('Invalid user id.')
  })
})

describe('PUT /api/users/:id', () => {
  it('should update user with valid data', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    const savedUser = await UserModel.create(testUser)

    const updatedUserData = {
      email: 'updated@example.com',
      password: 'newpassword123',
    }

    const response = await request(app).put(`/api/users/${savedUser._id}`).send(updatedUserData)

    expect(response.status).toBe(200)

    expect(response.body.email).toBe(updatedUserData.email)
    expect(response.body.password).toBeUndefined()
  })

  it('should return 404 for non-existing user ID', async () => {
    const nonExistentId = '5f7b1f5f782d0b1d9c9c0a5a'
    const response = await request(app).put(`/api/users/${nonExistentId}`).send({ email: 'updated@example.com' })

    expect(response.status).toBe(404)
    expect(response.text).toBe('User not found.')
  })

  it('should return 400 for invalid user ID format', async () => {
    const invalidId = 'ThisIsAnInvalidId'
    const response = await request(app).put(`/api/users/${invalidId}`).send({ email: 'updated@example.com' })

    expect(response.status).toBe(400)
    expect(response.text).toBe('Invalid user id.')
  })

  it('should handle validation errors and return 400', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    const savedUser = await UserModel.create(testUser)

    const invalidUserData = {
      email: 'invalidemail',
    }

    const response = await request(app).put(`/api/users/${savedUser._id}`).send(invalidUserData)

    expect(response.status).toBe(400)
    expect(response.body.message).toContain('email: Invalid email.')
  })
})

describe('DELETE /api/users/:id', () => {
  it('should delete user with valid ID', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    const savedUser = await UserModel.create(testUser)

    const response = await request(app).delete(`/api/users/${savedUser._id}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User deleted successfully.')
    const deletedUser = await UserModel.findById(savedUser._id)
    expect(deletedUser).toBeNull()
  })

  it('should return 404 for non-existing user ID', async () => {
    const nonExistentId = '5f7b1f5f782d0b1d9c9c0a5a'
    const response = await request(app).delete(`/api/users/${nonExistentId}`)

    expect(response.status).toBe(404)
    expect(response.text).toBe('User not found.')
  })

  it('should return 400 for invalid user ID format', async () => {
    const invalidId = 'ThisIsAnInvalidId'
    const response = await request(app).delete(`/api/users/${invalidId}`)

    expect(response.status).toBe(400)
    expect(response.text).toBe('Invalid user id.')
  })
})
