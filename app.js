require('dotenv').config({silent:true})
var express = require('express')
var app = express()
var port = 4000
var mongoose = require('mongoose')
var dburi = process.env.MONGO_URI
mongoose.connect(dburi)
mongoose.Promise = global.Promise

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('REALLY CONNECTED THIS TIME');
});

var path = require('path')

var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.set('view engine', 'ejs')
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))


// START THE ROUTING
var eventRouter = require('./routes/eventRouter')
app.use('/', eventRouter)
app.use(express.static(path.join(__dirname, 'public')))


// END THE ROUTING

app.listen(port, function () {
  console.log('express is running on port ' + port)
})
