const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

// Lấy thông tin kết nối cơ sở dữ liệu từ biến môi trường
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env
// Khởi tạo đối tượng Sequelize để kết nối đến cơ sở dữ liệu MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // Sử dụng MySQL làm cơ sở dữ liệu
  timezone: '+07:00', // Đặt múi giờ cho cơ sở dữ liệu, ở đây là UTC+7
  logging: false // Tắt logging SQL queries để giảm tiêu tốn tài nguyên
})

// Hàm kết nối đến cơ sở dữ liệu
const connectDatabase = async () => {
  try {
    // Kiểm tra kết nối đến cơ sở dữ liệu
    await sequelize.authenticate()
    console.log('Database connected.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}

module.exports = {
  sequelize,
  connectDatabase
}
