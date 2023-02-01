const mongoose = require('mongoose')

const numberValidators = [
  // {
  // Minimum length validator
  //   validator: (number) => {
  //     if ((number[2] === '-' || number[3] === '-') && number.length >= 8) {
  //       return false
  //     }
  //     return true
  //   },
  //   msg: 'must be at least 8 digits',
  // },
  {
    // Regex validator to allow only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number)
    },
    msg: (props) => `${props.value} is not a valid phone number!`,
  },
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    required: [true, 'User Name must be  provided'],
  },
  number: {
    type: String,
    validate: numberValidators,
    required: [true, 'User phone number required'],
    unique: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
