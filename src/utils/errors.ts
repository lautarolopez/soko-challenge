import { ZodError } from 'zod'
import { mongo } from 'mongoose'

export const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    const message = error.issues.reduce((acc, curr, index) => {
      return `${acc}${curr.path.join(', ')}: ${curr.message}${index === error.issues.length - 1 ? '.' : '; '}`
    }, '')
    return { message, status: 400 }
  }
  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    return { message: 'Duplicated key.', status: 400 }
  }
  return { message: 'Internal server error.', status: 500 }
}
