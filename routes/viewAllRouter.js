var express = require('express')
var router = express.Router()
var viewAllController = require('../controllers/viewAllController')

router.route('/')
.get(viewAllController.viewAllEvents)
.post(viewAllController.findEvent)


module.exports = router
