// var express = require('express')
// var app = express()
// var router = express.Router()
// var Attendee = require('../models/attendee')
//
// function addAttendee (req, res) {
//   var reqBody = req.body
//   var newAttendee = new Attendee({
//     attendeeName: reqBody.attendeeName,
//     amountOwe: reqBody.amountOwe,
//     paid: reqBody.paid,
//   })
//
//   newAttendee.save(function(err, savedAttendee) {
//     if (err) console.error(err)
//     res.redirect('/events')
//   })
// }
//
// function listAttendees (req, res) {
//   Attendee.find({}, function (err, attendeeList) {
//     if (err) console.error('Attendees cannot be listed')
//     res.render('events/eventsHome', {attendeeList})
//   })
// }
//
// module.exports = {
//   addAttendee,
//   listAttendees,
// }
