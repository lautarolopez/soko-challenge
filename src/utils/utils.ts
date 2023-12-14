import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const checkValidId = (id: string) => {
  return Types.ObjectId.isValid(id)
}
