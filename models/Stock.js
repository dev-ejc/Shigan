const mongoose = require('mongoose')

const StockSchema = mongoose.Schema( {
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'portfolio',
        require: true
    },
    ticker: {
        type: String,
        require: true
    },
    shares: {
        type: Number,
        require: true
    },
    purchaseDate: {
        type: Date,
        require:true,
        default: Date.now
    }
})

module.exports = mongoose.model('stock', StockSchema)