const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false})
        console.log("MongoDB connected...")
    }

    catch(err){
        console.log(err)
        // Exit process if failure
        process.exit(1)

    }

}

module.exports = connectDB
