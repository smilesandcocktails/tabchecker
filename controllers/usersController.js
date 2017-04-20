var User = require('../models/user')
var passport = require('../config/ppConfig')

function homepage (req, res) {
  console.log('<<<<<---homepage(usersCont) function has started--->>>>>')
  res.render('homepage')
}

function logout (req, res) {
  console.log('<<<<<---logout(usersCont) function has started--->>>>>')
  req.logout()
  req.flash('success', 'You have logged out')
  res.redirect('/')
}

function signupPage (req, res) {
  console.log('<<<<<---signupPage(usersCont) function has started--->>>>>')
  res.render('user/signup')
}

function createSignup (req, res) {
  console.log('<<<<<---createSignup(usersCont) function has started--->>>>>')

  var reqBody = req.body
  console.log('req.body', reqBody)
  var newUser = new User()

  newUser.name = reqBody.name
  newUser.email = reqBody.email
  newUser.password = reqBody.password
  newUser.save(function (err, createdUser) {
    console.log('Created User', createdUser)
    if (err) {
      console.log('err', err)
      req.flash('error', 'Could not create user account')
      res.redirect('/signup')
    } else {
      passport.authenticate('local', {
        successRedirect: '/events',
        successFlash: 'Account created and logged in'
      })(req, res)
    }
  })
}

function showLogin (req, res) {
  res.render('user/login')
}

function authenticateLogin (req, res) {
  passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
  })(req, res)
}

module.exports = {
  homepage,
  logout,
  signupPage,
  createSignup,
  showLogin,
  authenticateLogin
}
