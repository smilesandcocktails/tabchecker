var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var Event = require('./event')

var UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
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
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
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
