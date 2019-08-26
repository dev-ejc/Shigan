const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const { connectDB } = require('./config/db')
const path = require('path')
const helmet = require('helmet')
const dotenv = require('dotenv')

// Load env
dotenv.config({path:'./.env'})

// Helmet Middleware
app.use(helmet())

//Middleware for json reading hehe
app.use(express.json({extended:false}))

//Adding Routes
app.use("/api/users",require('./routes/users'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/stocks",require('./routes/stocks'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    app.use(express.static('client/build'))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}

app.listen(PORT, () => {
    console.log(`Server Started`)
    connectDB()
})