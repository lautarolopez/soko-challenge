import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import usersRouter from './features/users/users.router'
import { connect } from './services/database/connection'
import { swaggerOptions } from './config/swagger'

export const app = express()
const PORT = process.env.PORT || 3000

const specs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

if (process.env.NODE_ENV !== 'test') connect()

app.use(express.json())
app.use('/api/users/', usersRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
