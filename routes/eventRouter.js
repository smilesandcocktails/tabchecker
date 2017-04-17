var express = require('express')
var router = express.Router()
var eventsController = require('../controllers/eventsController')

router.route('/events')
.get(eventsController.eventsHome)

router.route('/events/add')
.get(eventsController.addEvent)
.post(eventsController.postEventToDatabase)

router.route('/events/:id')
.get(eventsController.listOneEvent)
.put(eventsController.editEvent)
.delete(eventsController.deleteEvent)

router.route('/events/:id/edit')
.get(eventsController.editEventDetails)

router.route('/events/:id/addattendees')
.get(eventsController.addAttendeesPage)
// .post(eventsController.addAttendees)

module.exports = router
