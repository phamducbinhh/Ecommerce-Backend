const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectDatabase } = require('./utils/database')
dotenv.config()

const app = express()
app.use(cors()) // Sử dụng middleware Cors để xử lý CORS
app.use(bodyParser.json()) // Sử dụng middleware body-parser để xử lý dữ liệu JSON
app.use(bodyParser.urlencoded({ extended: true })) // Sử dụng middleware body-parser để xử lý dữ liệu từ form

// Hàm bắt đầu server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase() // Kết nối đến cơ sở dữ liệu trước khi bắt đầu server
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App server listening on port: ${process.env.PORT || 8080}`)
    })
  } catch (err) {
    console.error('App server error:', (err as Error).stack)
  }
}

// Gọi hàm startServer để bắt đầu server khi ứng dụng được chạy
startServer()
