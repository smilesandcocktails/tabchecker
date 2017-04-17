var mongoose = require('mongoose')


var eventSchema = new mongoose.Schema ({
  eventName: String,
  date: Date,
  totalBill: String,
  payer: String,
  settled: Boolean,
  attendees: [{
    name: String,
    amountOwe: Number,
    paid: Boolean
  }]
})


var Event = mongoose.model('Event', eventSchema)

module.exports = Event
