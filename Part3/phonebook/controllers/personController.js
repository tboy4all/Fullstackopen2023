const Person = require('./../models/personModel')

exports.createPerson = async (req, res, next) => {
  try {
    // const newPerson = new Person({})
    // newPerson.save()

    const newPerson = await Person.create(req.body)

    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     person: newPerson,
    //   },
    // })
    res.status(201).json(newPerson)
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getAllPersons = async (req, res, next) => {
  try {
    const person = await Person.find()

    // res.status(200).json({
    //   status: 'success',
    //   result: person.length,
    //   // data: person,
    //   data: {
    //     person,
    //   },
    // })
    res.status(200).json(person)
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getPerson = async (req, res, next) => {
  'use strict'
  try {
    const person = await Person.findById(req.params.id)

    if (!person) {
      return next('No person found with that ID', 404)
    }
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     person,
    //   },
    // })

    res.status(200).json(person)
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.updatePerson = async (req, res, next) => {
  'use strict'
  try {
    // const body = request.body
    // const updatePerson = {
    //   name: body.name,
    //   number: body.number,
    // }
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     person,
    //   },
    // })
    res.status(200).json(person)
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.deletePerson = async (req, res, next) => {
  'use strict'
  try {
    await Person.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}
