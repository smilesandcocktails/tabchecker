var Event = require('../models/event')
var formatDate = require('../config/formatDate')

function viewAllEvents (req, res) {
  console.log('<<<<<---viewAllEvents(viewAllCont) function has started--->>>>>')
  Event.find({}, function (err, foundEvents) {
    if (err) console.error('Cannot Find Events to List')
    console.log(foundEvents)
    res.render('viewAll/viewAll', {foundEvents: foundEvents, formatDate: formatDate})
  })
}

function findEvent (req, res) {
  console.log('<<<<<---findEvent(viewAllCont) function has started--->>>>>')
  var search = new RegExp('^(.*(' + req.body.search + ').*)$', 'i')

  console.log('SEARCH ENTRY IS: ' + search)
  console.log('REQ.BODY IS: ' + req.body)
  console.log('REQ.BODY.SEARCH IS:' + req.body.search)

  Event.find().or([{eventName: { $regex: search }}]).exec((err, foundEvents) => {
    if (err) {
      req.flash('search error', 'There was an error fetching your search. Please try again.')
      return res.redirect('/viewall')
    }
    res.render('viewAll/viewAll', {foundEvents: foundEvents, formatDate: formatDate})
  })
}

function viewOneEvent (req, res) {
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) console.error('Cannot Find Event')
    res.render('viewAll/viewOne', {foundEvent, formatDate: formatDate})
  })
}

module.exports = {
  viewAllEvents,
  findEvent,
  viewOneEvent
}
