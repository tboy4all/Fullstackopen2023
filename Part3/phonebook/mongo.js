const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'A Name must be  provided'],
  },
  number: {
    type: String,
    required: [true, 'A Number must be provided'],
  },
})

const Person = mongoose.model('Person', personSchema)

const testPerson = new Person({
  name: 'Taiye',
  number: '070-458-78-545',
})

testPerson
  .save()
  .then((doc) => {
    console.log(doc)
  })
  .catch((err) => {
    console.log('ERROR..:', err)
  })
