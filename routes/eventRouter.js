var express = require('express')
var router = express.Router()
var eventsController = require('../controllers/eventsController')

router.route('/')
.get(eventsController.home)

router.route('/events')
.get(eventsController.eventsHome)

router.route('/events/add')
.get(eventsController.addEvent)
.post(eventsController.postEventToDatabase)

router.route('/events/:id')
.get(eventsController.listOneEvent)

router.route('/events/:id/edit')
.get(eventsController.editEvent)

module.exports = router
