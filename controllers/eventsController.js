var express = require('express')
var app = express()
var router = express.Router()
var Event = require('../models/event')
var User = require('../models/user')


function eventsHome (req, res) {
  console.log('<<<<<---eventsHome(eventsCont) function has started--->>>>>')



  Event.find({}, function (err, events) {
    if (err) console.error('Cannot find events to list')
    res.render('events/eventsHome', {events})
  })
}

function addEvent (req, res) {
  console.log('<<<<<---addEvent(eventsCont) function has started--->>>>>')
  res.render('events/addEvent')
}

function postEventToDatabase (req, res) {
  console.log('<<<<<---postEventToDatabase(eventsCont) function has started--->>>>>')
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
  console.log('<<<<<---listOneEvent(eventsCont) function has started--->>>>>')
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Find Event')
    res.render('events/singleEvent', {foundEvent})
  })
}

function editEventDetails (req, res) {
console.log('<<<<<---editEventDetails(eventsCont) function has started--->>>>>')

  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Update Event')
    res.render('events/edit', {foundEvent})
  })
}

function editEvent (req, res) {
  console.log('<<<<<---editEvent(eventsCont) function has started--->>>>>')
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
  console.log('<<<<<---deleteEvent(eventsCont) function has started--->>>>>')
  Event.findByIdAndRemove(req.params.id, function (err, eventToDelete) {
    if (err) console.error('Cannot Delete Event')
    res.redirect('/events')
  })
}

function addAttendees (req, res) {
  console.log('<<<<<---addAttendees function has started--->>>>>')

  var reqBody = req.body
  console.log('reqBody =' + reqBody)
  console.log('reqBody.name =' + reqBody.name)
  console.log('reqBody.amountOwe =' + reqBody.amountOwe)
  var attendeeObj = {
    name: reqBody.name,
    amountOwe: reqBody.amountOwe
  }
  console.log('req.params.id'+req.params.id)
  Event.findByIdAndUpdate({_id: req.params.id}, { $push: {attendees: attendeeObj}}, function (err, editedAttendees) {
    console.log('editedAttendees'+editedAttendees);
    if (err) console.error('Cannot Add Attendees to Event')
    res.render('/events/'+ req.params.id + '/editattendee', {editedAttendees})
    // ('/events/'+ addedAttendees.id)
  })
}

function attendeePage (req, res) {
  console.log('<<<<<---attendeePage(eventsCont) function has started--->>>>>')
    var specificAttendee = Event.attendees
    specificAttendee.findById(req.params.id, function (err, foundAttendee) {
      if (err) console.error('Cannot Update Attendee')
      res.render('events/editAttendee', {foundAttendee})
    })
}

function editAttendee (req, res) {
  console.log('<<<<<---editAttendee function has started--->>>>>')

  var reqBody = req.body
  var attendeeObj = {
    name: reqBody.name,
    amountOwe: reqBody.amountOwe
  }

  Event.findByIdAndUpdate({_id: req.params.id}, { $push: {attendees: attendeeObj}}, function (err, addedAttendees) {
    console.log('editedAttendees'+addedAttendees);
    if (err) console.error('Cannot Add Attendees to Event')
    res.redirect('/events/'+ req.params.id)
    // ('/events/'+ addedAttendees.id)
  })


}

function deleteAttendee (req, res) {
console.log('<<<<<---deleteAttendee function has started--->>>>>')
console.log('req = ' + req)
console.log('req.params.id = ' + req.params.id)
console.log('Event.attendees = ' + Event.attendees )
  // Event.attendees.findByIdAndRemove(req.params.id, function (err, found) {
  //   if (err) console.error('Cannot Delete Attendee')
  //   res.redirect('/events')
  // })
}

module.exports = {
  eventsHome,
  addEvent,
  postEventToDatabase,
  listOneEvent,
  editEventDetails,
  editEvent,
  deleteEvent,
  addAttendees,
  attendeePage,
  editAttendee,
  deleteAttendee,
}
