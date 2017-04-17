var mongoose = require('mongoose')

var eventSchema = new mongoose.Schema ({
  eventName: String,
  date: Date,
  totalBill: String,
  payer: String,
  settled: Boolean,
  // attendees: {
    // attended: [{
      // userId: mongoose.Schema.ObjectId,
      // ref: 'User'
    // }]
  // }
})


var Event = mongoose.model('Event', eventSchema)

module.exports = Event
