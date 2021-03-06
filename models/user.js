var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var Event = require('./event')

var UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 20 characters'],
    maxlength: [20, 'Name must be between 3 and 20 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
},
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be between 6 and 20 characters'],
    maxlength: [20, 'Password must be between 6 and 20 characters']
  },
  events: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Event'
  }]
})

UserSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified('password')) return next()

  var hash = bcrypt.hashSync(user.password,10)

  user.password = hash
  next()
})

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password
    return ret
  }
}

var User = mongoose.model('User', UserSchema)

module.exports = User
