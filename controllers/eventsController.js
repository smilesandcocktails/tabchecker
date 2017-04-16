var express = require('express')
var app = express()
var router = express.Router()
var Event = require('../models/event')

function home (req, res) {
  res.send('HELLO HOME')
}

function eventsHome (req, res) {
  Event.find({}, function (err, events) {
    if (err) console.error('Cannot find events to list')
    res.render('events/eventsHome', {events})
  })
}

function addEvent (req, res) {
  res.render('events/addEvent')
}

function postEventToDatabase (req, res) {
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
  Event.findById(req.params.id, function (err, foundEvent) {
    console.log("foundEvent = " + req.params.id);

    console.log(foundEvent);
    if (err) console.error('Cannot Find Event')

    res.render('events/singleEvent', {foundEvent})
  })
}

function editEventPage (req, res) {
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Update Event')
    res.render('events/edit', {foundEvent})
  })
}

function editEvent (req, res) {
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
  Event.findByIdAndRemove(req.params.id, function (err, eventToDelete) {
    if (err) console.error('Cannot Delete Event')
    res.redirect('/events')
  })
}


module.exports = {
  home,
  eventsHome,
  addEvent,
  postEventToDatabase,
  listOneEvent,
  editEventPage,
  editEvent,
  deleteEvent,
}
