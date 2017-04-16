var express = require('express')
var app = express()
var router = express.Router()
var Event = require('../models/event')
// var Attendee = require('../models/attendee')


function eventsHome (req, res) {
  console.log('<<<<<---eventsHome function has started--->>>>>')
  Event.find({}, function (err, events) {
    if (err) console.error('Cannot find events to list')
    res.render('events/eventsHome', {events})
  })
}

function addEvent (req, res) {
  console.log('<<<<<---addEvent function has started--->>>>>')
  res.render('events/addEvent')
}

function postEventToDatabase (req, res) {
  console.log('<<<<<---postEventToDatabase function has started--->>>>>')
  var reqBody = req.body
  console.log("reqBody is : " + reqBody);
  console.log("res is : " + res);
  var newEvent = new Event({
    eventName: reqBody.eventName,
    date: reqBody.date,
    totalBill: reqBody.totalBill,
    payer: reqBody.payer,
  })

  newEvent.save(function(err, savedEvent) {
    if (err) console.error(err)
    res.redirect('/events')
  })
}

function listOneEvent (req, res) {
  console.log('<<<<<---listOneEvent function has started--->>>>>')
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Find Event')
    res.render('events/singleEvent', {foundEvent})
  })

  Event.findById(req.params.id).populate('attendees').exec(function (err, output) {
    if (err) console.error('Cannot populate attendees for this event')

    console.log("OUTPUT IS " + output)
    console.log("OUTPUT.ATTENDEES IS " + output.attendees);

    // res.render('events/singleEvent', {allAttendees: output.attendees})
  })
}

function editEventDetails (req, res) {
console.log('<<<<<---editEventDetails function has started--->>>>>')
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Update Event')
    res.render('events/edit', {foundEvent})
  })
}

function editEvent (req, res) {
  console.log('<<<<<---editEvent function has started--->>>>>')
  var reqBody = req.body
  Event.findOneAndUpdate({_id: req.params.id}, {
    eventName: reqBody.eventName,
    date: reqBody.date,
    totalBill: reqBody.totalBill,
    payer: reqBody.payer,
    settled: reqBody.settled
  }, function (err, editedEvent) {
    if (err) console.error('Cannot Update Event')
    res.redirect('/events/'+ editedEvent.id)
  })
}

function deleteEvent (req, res) {
  console.log('<<<<<---deleteEvent function has started--->>>>>')
  Event.findByIdAndRemove(req.params.id, function (err, eventToDelete) {
    if (err) console.error('Cannot Delete Event')
    res.redirect('/events')
  })
}

function addAttendeesPage (req, res) {
console.log('<<<<<---addAttendeesPage function has started--->>>>>')
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Add Attendees')
    console.log(foundEvent);
    res.render('events/addAttendees', {foundEvent})
  })
}

function addAttendees (req, res) {
  console.log('<<<<<---addAttendees function has started--->>>>>')
  var reqBody = req.body



  Event.findOneAndUpdate({_id: req.params.id}, {
    // attendees:
  }, function (err, eventWithAddedAttendees) {
    if (err) console.error('Cannot Add Attendees to Event')
    res.redirect('/events/'+ eventWithAddedAttendees.id)
  })
}

module.exports = {
  eventsHome,
  addEvent,
  postEventToDatabase,
  listOneEvent,
  editEventDetails,
  editEvent,
  deleteEvent,
  addAttendeesPage,
  addAttendees,
}
