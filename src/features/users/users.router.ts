import express from 'express'
import * as usersController from './users.controller'

const usersRouter = express.Router()

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 5f3a3b31eab45a5af4ab90f5
 *               email: user@example.com
 *       '400':
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               message: 'email: Invalid email format; password: Password is required.'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal server error.'
 *     tags:
 *       - Users
 */
usersRouter.post('/', usersController.createUser)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Endpoint to retrieve a list of users (excluding password).
 *     responses:
 *       '200':
 *         description: Successful response with a list of users
 *         content:
 *           application/json:
 *             example:
 *               - _id: 5f3a3b31eab45a5af4ab90f5
 *                 email: user1@example.com
 *               - _id: 5f3a3b31eab45a5af4ab90f6
 *                 email: user2@example.com
 *               - _id: 5f3a3b31eab45a5af4ab90f7
 *                 email: user3@example.com
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal server error.'
 *     tags:
 *       - Users
 */
usersRouter.get('/', usersController.getUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Endpoint to retrieve a user by ID (excluding password).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the user data
 *         content:
 *           application/json:
 *             example:
 *               _id: 5f3a3b31eab45a5af4ab90f5
 *               email: user1@example.com
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found.'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal server error.'
 *     tags:
 *       - Users
 */
usersRouter.get('/:id', usersController.getUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Endpoint to update a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address.
 *               password:
 *                 type: string
 *                 description: The updated password.
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 5f3a3b31eab45a5af4ab90f5
 *               email: updated_user@example.com
 *       '400':
 *         description: Bad request. Invalid input data, email or password required.
 *         content:
 *           application/json:
 *             example:
 *               message: 'At least one field must be provided'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found.'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal server error.'
 *     tags:
 *       - Users
 */
usersRouter.put('/:id', usersController.updateUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Endpoint to delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User deleted successfully.'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found.'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Internal server error.'
 *     tags:
 *       - Users
 */
usersRouter.delete('/:id', usersController.deleteUser)

export default usersRouter
