import mongoose from 'mongoose'
import { config } from '../../config/config'

const { MONGO_URI } = config

export const connect = async (uri: string = MONGO_URI) => {
  await mongoose.connect(uri).catch((e: Error) => {
    throw e
  })
}
