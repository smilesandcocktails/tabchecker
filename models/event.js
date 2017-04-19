var mongoose = require('mongoose')


var eventSchema = new mongoose.Schema ({
  eventName: String,
  date: Date,
  totalBill: Number,
  payer: String,
  attendees: [{
    name: String,
    amountOwe: Number,
  }]
})


var Event = mongoose.model('Event', eventSchema)

module.exports = Event
