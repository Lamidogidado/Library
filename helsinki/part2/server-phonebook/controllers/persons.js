const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (req, res) => {
  const people = await Person.find({})
  res.json(people)
})

personsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    const saved = await person.save()
    res.json(saved)
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter
