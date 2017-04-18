var express = require ('express')
var router = express.Router()
var usersController = require('../controllers/usersController')
var passport = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')

router.route('/')
.get(usersController.homepage)

router.route('/signup')
.get(usersController.signupPage)
.post(usersController.createSignup)

router.route('/login')
.get(usersController.showLogin)
.post(usersController.authenticateLogin)

router.use(isLoggedIn)

router.route('/logout')
.get(usersController.logout)

module.exports = router
