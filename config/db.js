import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    try{
        const connec = await mongoose.connect(process.env.mongo_url)
        console.log(`Connected to MongoDB database ${connec.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgMagenta.white)
    }
}

export default connectDB;