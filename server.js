const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const { connectDB, disconnectDB } = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const helmet = require('helmet')
require('./config/passport')(passport)

//@TODO rate limiter research to prevent bruteforce https://github.com/animir/node-rate-limiter-flexible
//@TODO set up compatible session store
//@TODO set up Cross Site Forgery Attack Protection
var sess = {
    secret:'dud3rin0',
    saveUninitialized: true,
    resave:true,
    name:'sessionsBruh',
    cookie: {
        secure: true
    }
}

// Session Middleware
// @TODO Validate parameters
app.use(session(sess))

// Helmet Middleware
app.use(helmet())

//Middleware for json reading hehe
app.use(express.json({extended:false}))
 
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

//Adding Routes
app.use("/api/users",require('./routes/users'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/stocks",require('./routes/stocks'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
    app.use(express.static('client/build'))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`)
    connectDB()
    setTimeout(() => {
        disconnectDB().then(() => {
            console.log('DC DB')
        })
    },60000)
})