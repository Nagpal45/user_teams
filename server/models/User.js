const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,
})

const User = new mongoose.model("User", userSchema);
module.exports = User;