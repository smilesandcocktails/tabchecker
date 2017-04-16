var mongoose = require('mongoose')

var eventSchema = new mongoose.Schema ({
  eventName: String,
  date: Date,
  totalBill: String,
  payer: String,
  settled: Boolean,
  attendees: {
    eachAttendee: [
    // type: mongoose.Schema.ObjectId,
    // ref: 'Attendee'
    {
      attendeeName: String,
      amountOwe: Number,
      paid: Boolean
    }
    ]
  }
})


var Event = mongoose.model('Event', eventSchema)

module.exports = Event
