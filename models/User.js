const mongoose = require('mongoose')

const UserSchema = mongoose.Schema( {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('user', UserSchema)