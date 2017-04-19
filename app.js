require('dotenv').config({silent:true})
var express = require('express')
var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('./config/ppConfig')
var flash = require('connect-flash')
var methodOverride = require('method-override')
var app = express()
var isLoggedIn = require('./middleware/isLoggedIn')
var path = require('path')
var MongoStore = require('connect-mongo')(session)

var port = process.env.PORT || 4000
var dburi = process.env.MONGO_URI
mongoose.connect(dburi)
mongoose.Promise = global.Promise

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('REALLY CONNECTED THIS TIME');
});

app.set('view engine', 'ejs')

app.use(session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({url: process.env.MONGO_URI})
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

// START THE ROUTING

var viewAllRouter = require('./routes/viewAllRouter')
app.use('/viewall', viewAllRouter)

var eventRouter = require('./routes/eventRouter')
app.use('/events', eventRouter)

var userRouter = require('./routes/userRouter')
app.use('/', userRouter)




// END THE ROUTING

app.listen(port, function () {
  console.log('express is running on port ' + port)
})
