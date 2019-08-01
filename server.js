const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const { connectDB, disconnectDB } = require('./config/db')
// const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
require('./config/passport')(passport)

//Middleware for json reading hehe
app.use(express.json({extended:false}))

// Session Middleware
// @TODO Validate parameters
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//@ TODO Validate parameters
// Connect Flash
app.use(flash());

// Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success-_msg')
    res.locals.error_msg = req.flash('success-_msg')
    next();
})

//Setting the port
app.set("port",PORT)

var server = app.listen(app.get('port'), () => {
    console.log(`Server Started on ${PORT}`)
    connectDB()
    setTimeout(async () => {
        await disconnectDB()
        server.close(() => {
        console.log("Server Shutdown")
    })},240000)
})

//Adding Routes
app.use("/api/users",require('./routes/users'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/stocks",require('./routes/stocks'))
app.use("/api/news",require('./routes/news'))
app.use("/api/fundamentals",require('./routes/fundamentals'))
app.use("/api/prices",require('./routes/prices'))
app.use("/api/portfolios",require('./routes/portfolios'))

// Serve static assets in production
// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
// }

