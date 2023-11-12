const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectDatabase } = require('./config/database')
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase()
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App server listening on port: ${process.env.PORT}`)
    })
  } catch (err) {
    console.error('App server error:', (err as Error).stack)
  }
}

startServer()
