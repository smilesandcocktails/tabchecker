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
  Event.create({
    eventName: reqBody.eventName,
    date: reqBody.date,
    totalBill: reqBody.totalBill,
    payer: reqBody.payer,
    settled: "false"
  }), function (err, newEvent) {
    if (err) console.error('Did not add new Event.')

    res.redirect('/events/eventsHome')
  }
}

function listOneEvent (req, res) {
  Event.findById(req.params.id, function (err, foundEvent) {
    console.log(req.params.id);

    console.log(foundEvent);
    if (err) console.error('Cannot Find Event')

    res.render('events/singleEvent', {foundEvent})
  })
}

function editEvent (req, res) {
  Event.findById(req.params.id, function (err, singleEvent) {
    if (err) console.error('Cannot Update Event')
    res.render('events/edit', singleEvent)
  })
}
module.exports = {
  home,
  eventsHome,
  addEvent,
  postEventToDatabase,
  listOneEvent,
  editEvent,
}
