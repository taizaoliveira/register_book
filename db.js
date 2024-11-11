const mongoose =require('mongoose')

const dbUri = "mongodb://localhost:27017/book_register_db"

module.exports = () => mongoose.connect(dbUri)