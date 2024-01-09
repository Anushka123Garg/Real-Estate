import mongoose from "mongoose";

//creating a schema
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

//creating a model
const User = mongoose.model('User',userschema);

export default User;
