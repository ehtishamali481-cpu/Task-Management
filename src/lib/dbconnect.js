import mongoose from "mongoose";



const connection = {
    isConnected: false,
};


const dbConnection = async () => {
    if (connection.isConnected) {
        console.log("DataBase already connected")
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        connection.isConnected = db.connections[0].readyState === 1;
        console.log("data base connected successfully")
    } catch (error) {
        console.log("data base error", error)
        process.exit(1)
    }
}

export default dbConnection;