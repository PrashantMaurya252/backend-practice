const mongoose = require('mongoose')

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb is connected successfully')
    } catch (error) {
        console.log(error,'MongoDb conecttion failed')
        process.exit()
    }
}

module.exports = connectToDB