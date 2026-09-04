import mongoose from "mongoose";



const connection = {
    isConnected: false,
};


const dbConnection = async () => {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        connection.isConnected = db.connections[0].readyState === 1;
        return;
    } catch (error) {
        process.exit(1)
    }
}

export default dbConnection;