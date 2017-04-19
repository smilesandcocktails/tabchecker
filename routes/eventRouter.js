var express = require('express')
var router = express.Router()
var eventsController = require('../controllers/eventsController')

router.route('/')
.get(eventsController.eventsHome)
.delete(eventsController.deleteEvent)

router.route('/add')
.get(eventsController.addEvent)
.post(eventsController.postEventToDatabase)

router.route('/:id')
.get(eventsController.listOneEvent)
.post(eventsController.checkbox)
.post(eventsController.addAttendees)
.put(eventsController.editEvent)
.delete(eventsController.deleteAttendee)

router.route('/:id/edit')
.get(eventsController.editEventDetails)


module.exports = router
