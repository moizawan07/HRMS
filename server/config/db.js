const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.MONGO_URI

console.log('uri==>', URI);


const dbConnect =  async () => {
   try {
     await mongoose.connect(URI)
     console.log('✔ Database connected');
   } catch (error) {
     console.log('❌ Database not Connected', error);
    //  process.exit(1)
   }
}

module.exports = dbConnect;