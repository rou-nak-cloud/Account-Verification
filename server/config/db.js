import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectedInstances = await mongoose.connect(`${process.env.MONGODB_URI}/auth-rock`)
        console.log(`\n Connected to MongoDb database successfully at HOST: ${connectedInstances.connection.host}`);
    } catch (error) {
        console.log("ERROR:", error)
        process.exit(1);
    }
}
export default connectDB;