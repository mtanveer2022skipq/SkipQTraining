const mongoose = require('mongoose');
const url = "mongodb+srv://tanveer:root@tanveercluster.dizkzwf.mongodb.net/sprint4?retryWrites=true&w=majority"

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;