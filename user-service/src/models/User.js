const mongoose=require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true 
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;