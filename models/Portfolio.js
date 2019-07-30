const mongoose = require('mongoose')

const PortfolioSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    openDate: {
        type: Date,
        require:true,
        default: Date.now
    }
})

module.exports = mongoose.model('portfolio', PortfolioSchema)