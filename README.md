# **TABChecker**

>_Are you usually the one who settles the bill first when you are out with your friends?_

>_And it's quite hard to keep track of the $ received over time when the group gets too big right?_

Inspired by events that occurred after our 1st WDI-SG9 class outing, the TABChecker helps you keep track of your I.O.U.'s!

[CLICK HERE TO USE TABChecker TODAY!](https://tabchecker.herokuapp.com/)

## Getting Started

[TABChecker](https://tabchecker.herokuapp.com/) can

1. Add events that you have settled the bill for first.
2. View, Update & Delete your events.
3. Add the names of your friends & amount owed in each event for you to track.
4. Remove your friend from the list once they have paid you.

_It's fuss-free, easy-to-use!_

**_So why not?_**

### Oh there's more!

You can direct your friends to the website to view your events without signing in. All they have to do is to

1. Search for the event by the event name that you have assigned to it.
2. View the event to see how much they owe you.

## ERD
![TABChecker ERD](https://github.com/smilesandcocktails/tabchecker/blob/master/ERD.jpg)

## Models, Routes, Controllers

#### Models

| Model #1: User       | Model #2: Event               |
| -------------------- |:-----------------------------:|
| name                 | eventName                     |
| email                | date                          |
| password             | totalBill                     |
| events {ref 'Event'} | payer                         |
| --                   | attendees [{name, amountOwe}] |

### Routes
| userRouter  | eventRouter     | viewAllRouter    |
| ----------- |:---------------:| ----------------:|
| **('/') **  | **('/events')** | **('/viewall')** |
| ('/signup') | ('/add')        |   ('/:id')       |
| ('/login')  | ('/:id')        |  --              |
| ('/login')  | ('/:id/edit')   |  --              |

### Controllers
| userController           | eventController            | viewAllController   |
| ------------------------ |:--------------------------:| -------------------:|
| homepage (.get)          | eventsHome (.get)          | viewAllEvents (.get)|
| logout (.get)            | postEventToDatabase (.post)| addEvent (.post)    |
| signupPage (.get)        | listOneEvent (.get)        | viewOneEvent (.get) |
| createSignup (.post)     | deleteEvent (.delete)      | --                  |
| showLogin (.get)         | editEvent (.put)           | --                  |
| authenticateLogin (.post)| addAttendees (.post)       | --                  |
| --                       | deleteAttendee (.delete)   | --                  |
| --                       | editEventDetails (.get)    | --                  |

## Credit
* [Jonathan](https://github.com/noll-fyra) (Creator of the search bar & date formatter in my program)
* [Dennis](http://ai-labs.co/)
* [Sharona](https://github.com/sharona1610)
* [Yisheng](https://github.com/yisheng90)
* [Prima](https://github.com/primaulia)

## Resources
1. https://material.io/icons/
2. https://giphy.com/
3. https://fonts.google.com
