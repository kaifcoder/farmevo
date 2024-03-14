import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectToDatabase = async () => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to the database" + instance.connection.host);
    } catch (error) {
        console.log("Error connecting to the database");
        throw new Error("Error connecting to the database");
    }
};

export default connectToDatabase;