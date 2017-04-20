var Event = require('../models/event')
var User = require('../models/user')
var formatDate = require('../config/formatDate')

function eventsHome (req, res) {
  console.log('<<<<<---eventsHome(eventsCont) function has started--->>>>>')

  console.log('REQ (eventsHome)' + req)
  console.log('REQ.USER (eventsHome)' + req.user)

  User.findById(req.user._id).populate('events').exec(function (err, events) {
    console.log('POPULATE FUNCTION STARTS')
    console.log(events)
    if (err) console.log(err)
    res.render('events/eventsHome', {events: events.events, formatDate: formatDate})
  })
}

function addEvent (req, res) {
  console.log('<<<<<---addEvent(eventsCont) function has started--->>>>>')
  res.render('events/addEvent')
}

function postEventToDatabase (req, res) {
  console.log('<<<<<---postEventToDatabase(eventsCont) function has started--->>>>>')
  var reqBody = req.body
  console.log('reqBody is : ' + reqBody)
  console.log('res is : ' + res)
  var newEvent = new Event({
    eventName: reqBody.eventName,
    date: reqBody.date,
    totalBill: reqBody.totalBill,
    payer: reqBody.payer
  })

  newEvent.save(function (err, foundEvent) {
    console.log(foundEvent)
    if (err) console.error(err)
    // foundEvent.events.push(newEvent.id)
    User.findByIdAndUpdate(req.user.id, {$push: {events: foundEvent._id}}, function (err, foundUser) {
      if (err) console.log(err)
      console.log('push event', foundUser.events)
      res.redirect('/events')
    })
  })
}

function listOneEvent (req, res) {
  console.log('<<<<<---listOneEvent(eventsCont) function has started--->>>>>')
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Find Event')
    res.render('events/singleEvent', {foundEvent: foundEvent, formatDate: formatDate})
  })
}

function deleteEvent (req, res) {
  console.log('<<<<<---deleteEvent(eventsCont) function has started--->>>>>')
  console.log('(before delete function) DELETE REQ PARAMS ID IS: ' + req.body.id)
  Event.findByIdAndRemove(req.body.id, function (err, eventToDelete) {
    console.log('(after delete function) DELETE REQ PARAMS ID IS: ' + req.body.id)
    if (err) console.error('Cannot Delete Event')
    res.redirect('/events')
  })
}

function editEventDetails (req, res) {
  console.log('<<<<<---editEventDetails(eventsCont) function has started--->>>>>')

  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Update Event')

    var date = foundEvent.date

    var day = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate()
    var month = date.getMonth() + 1
    month = (month > 9) ? month : '0' + month
    var year = date.getFullYear()
    // format your date as you expect
    var dateFormat = year + '-' + month + '-' + day

    res.render('events/edit', {foundEvent: foundEvent, dateFormat: dateFormat})
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
  console.log('req.params.id' + req.params.id)
  Event.findByIdAndUpdate({_id: req.params.id}, { $push: {attendees: attendeeObj}}, function (err, editedAttendees) {
    if (err) console.error('Cannot Add Attendees to Event')
    res.redirect('/events/' + req.params.id)
    // ('/events/'+ addedAttendees.id)
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
    console.log('SUCCESSFUL UPDATE')
    res.redirect('/events/' + editedEvent.id)
  })
}

function deleteAttendee (req, res) {
  console.log('<<<<<---deleteAttendee function has started--->>>>>')

  Event.findById(req.params.id, function (err, foundEvent) {
    console.log('foundEvent' + foundEvent)

    foundEvent.attendees.forEach(function (each, index) {
      if (each.id === req.body.id) {
        foundEvent.attendees.splice(index, 1)
      }
    })
    foundEvent.save()
    console.log('foundEvent after REMOVE is ' + foundEvent)
    res.redirect('/events/' + req.params.id)
  })
}

module.exports = {
  eventsHome,
  addEvent,
  postEventToDatabase,
  listOneEvent,
  deleteEvent,
  editEvent,
  addAttendees,
  deleteAttendee,
  editEventDetails
}
