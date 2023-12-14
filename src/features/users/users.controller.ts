import { Request, Response } from 'express'
import { UserModel } from './users.model'
import { CreateUserSchema, UpdateUserSchema } from './users.schemas'
import { hashPassword, checkValidId } from '../../utils/utils'
import { handleError } from '../../utils/errors'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = CreateUserSchema.parse(req.body)
    const hashedPassword = await hashPassword(password)
    const user = new UserModel({ email, password: hashedPassword })
    await user.save()
    const { password: userPassword, ...rest } = user.toObject()
    res.status(200).json(rest)
  } catch (e) {
    const { message, status } = handleError(e)
    res.status(status).json({ message })
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, ['-password'])
    res.status(200).json(users)
  } catch (e) {
    const { message, status } = handleError(e)
    res.status(status).json({ message })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    if (!checkValidId(userId)) {
      res.status(400).send('Invalid user id.')
      return
    }
    const user = await UserModel.findById(userId).select('-password')
    if (!user) {
      res.status(404).send('User not found.')
      return
    }
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    const { message, status } = handleError(e)
    res.status(status).json({ message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    if (!checkValidId(userId)) {
      res.status(400).send('Invalid user id.')
      return
    }
    const user = await UserModel.findById(userId)
    if (!user) {
      res.status(404).send('User not found.')
      return
    }
    const { email, password } = UpdateUserSchema.parse(req.body)
    if (email) user.email = email
    if (password) user.password = await hashPassword(password)
    await user.save()
    const { password: userPassword, ...rest } = user.toObject()
    res.status(200).json(rest)
  } catch (e) {
    const { message, status } = handleError(e)
    res.status(status).json({ message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    if (!checkValidId(userId)) {
      res.status(400).send('Invalid user id.')
      return
    }
    const user = await UserModel.findByIdAndDelete(userId)
    if (!user) {
      res.status(404).send('User not found.')
      return
    }
    res.status(200).json({ message: 'User deleted successfully.' })
  } catch (e) {
    const { message, status } = handleError(e)
    res.status(status).json({ message })
  }
}
