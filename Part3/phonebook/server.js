const config = require('./utils/config')
const logger = require('./utils/logger')

const Person = require('./models/personModel')

const app = require('./app')

app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Person.find({}).then((persons) => {
    response.send(
      `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
    )
  })
})

// app.get('/api/persons', (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons.map((person) => person.toJSON()))
//   })
// })

// let notes = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
//   {
//     id: 5,
//     name: 'Taiye Suleiman',
//     number: '081445875688',
//   },
// ]
// let date = new Date()
// let day = date.getDate()
// let month = date.getMonth() + 1
// let year = date.getFullYear()
// let week = date.getDay()
// // let time = date.toLocaleTimeString()
// let time = date.toLocaleTimeString('en-US', {
//   hour: 'numeric',
//   minute: 'numeric',
//   hour12: false,
//   timeZone: 'UTC',
// })

// let weekdays = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ]
// let monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ]

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

// // To fetch all note
// app.get('/api/persons', (req, res) => {
//   res.json(notes)
// })

// app.get('/api/persons', (req, res) => {
//   Person.find({}).then((persons) => {
//     res.json(persons.map((person) => person.toJSON()))
//   })
// })

// app.get('/info', (req, res) => {
//   res.json({
//     message: 'Phonebook has info for 2 people',
//     fullDate: `${weekdays[week]} ${monthNames[month]} ${day} ${year} ${time}`,
//   })
// })

// // To fetch a single resource that is note
// app.get('/api/persons/:id', (req, res) => {
//   const id = +req.params.id
//   //   const note = notes.find((note) => {
//   //     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//   //     return note.id === id
//   //   })
//   const note = notes.find((note) => note.id === id)
//   //   console.log(note)
//   if (note) {
//     res.json(note)
//   } else {
//     // res.status(404).end()
//     res.status(404).json({ message: 'Not Found' })
//   }
// })

// // To Delete a resource
// app.delete('/api/persons/:id', (req, res) => {
//   const id = +req.params.id
//   const note = notes.filter((note) => note.id !== id)

//   res.status(204).json()
// })

// const generateId = () => {
//   return Math.floor(Math.random() * 10)
// }

// // To Post a resource
// app.post('/api/persons', (req, res) => {
//   let name = ''
//   let number = ''
//   if (req.body.name !== undefined) {
//     name = req.body.name
//   }
//   if (req.body.number !== undefined) {
//     number = req.body.number
//   }

//   //   if (!req.body.name || !req.body.number) {
//   //     return res.status(400).json({ error: 'name and number are required' })
//   //   }

//   //Check if name already exists
//   for (let i = 0; i < notes.length; i++) {
//     if (notes[i].name === name) {
//       res.status(404).send('Name must be unique')
//       return
//     }
//   }

//   const newNote = {
//     name: name,
//     number: number,
//     id: generateId(),
//   }
//   notes.push(newNote)
//   res.status(201).json(newNote)
// })

// const port = process.env.PORT || 4000
app.listen(config.port, () => {
  // console.log(`App running on port ${config.port}...`)
  logger.info(`App running on port ${config.port}...`)
})
