const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const Event = require('../../models/eventModel')
const User = require('../../models/userModel')

// Get all events
// Public
// GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    if (events.length === 0) {
      return res.status(404).send("Pas d'évenements créés")
    }
    return res.json(events)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

// Get event by id
// Public
// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

// Create an event
// Private
// POST /api/events
router.post(
  '/',
  [
    auth,
    [
      body('eventName', "Merci de préciser le nom de l'évenement").not().isEmpty(),
      body('type', "Merci de préciser le type d'évenement").not().isEmpty(),
      body('date', "Merci d'indiquer une date").not().isEmpty(),
      body('address', "Merci d'indiquer l'adresse").not().isEmpty(),
      body('description', 'Merci de donner une description avec au minimim 20 caractères').isLength({ min: 20 })
    ]
  ],
  async (req, res) => {
    const { eventName, type, date, address, lat, lng, description } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newEvent = await Event({
        user: req.user.id,
        userName: user.name,
        userAvatar: user.avatar,
        eventName,
        type,
        date,
        address,
        lat,
        lng,
        description,
        attendees: {
          user: req.user.id,
          name: user.name,
          avatar: user.avatar,
          host: true
        }
      }).save()

      return res.json(newEvent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Erreur serveur')
    }
  }
)

// Update an event
// Private
// POST /api/events/:id
router.post(
  '/:id',
  [
    auth,
    [
      body('eventName', "Merci de préciser le nom de l'évenement").not().isEmpty(),
      body('type', "Merci de préciser le type d'évenement").not().isEmpty(),
      body('date', "Merci d'indiquer une date").not().isEmpty(),
      body('address', "Merci d'indiquer l'adresse").not().isEmpty(),
      body('description', 'Merci de donner une description avec au minimim 20 caractères').isLength({ min: 20 })
    ]
  ],
  async (req, res) => {
    const { eventName, type, date, address, lat, lng, description } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      let currentEvent = await Event.findById(req.params.id)
      if (!currentEvent) {
        return res.status(403).send('Event non existant')
      }

      if (req.user.id !== currentEvent.user.toString()) {
        return res.status(404).send('Non autorisé')
      }

      const eventDetails = {
        eventName,
        type,
        date,
        address,
        lat,
        lng,
        description
      }

      currentEvent = await Event.findByIdAndUpdate(req.params.id, { $set: eventDetails }, { new: true })

      return res.json(currentEvent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Erreur serveur')
    }
  }
)

// Delete an event
// Private
// POST /api/events/:eventId
router.delete('/:eventId', [auth], async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).send('Evenement introuvable')
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(403).send('Non autorisé')
    }
    await Event.deleteOne(event)
    return res.json({ msg: 'Evenement supprimé' })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Erreur serveur')
    }
    return res.status(500).send('Erreur serveur')
  }
})

// Create a comment
// Private
// POST /api/events/:eventId/comment
router.post('/:eventId/comment', [auth, [body('text', 'Ton commentaire ?').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id)
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).send('Evenement introuvable')
    }

    const comment = {
      user: user.id,
      name: user.name,
      avatar: user.avatar,
      text: req.body.text
    }

    await event.comments.unshift(comment)
    await event.save()
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

// Delete a comment
// Private
// DELETE /api/events/:eventId/comment/:commentId
router.delete('/:eventId/comment/:commentId', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).send('Evenement introuvable')
    }

    const removeIndex = event.comments.filter(comment => comment.id === req.params.commentId)
    event.comments.splice(removeIndex, 1)
    await event.save()
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

// Subscribe to an event
// Private
// POST /api/events/:eventId/subscribe
router.post('/:eventId/subscribe', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).send('Evenement introuvable')
    }

    const existing = event.attendees.find(attendee => attendee.user.toString() === req.user.id)
    if (existing) {
      return res.status(403).send('Participes déjà')
    }

    event.attendees.push({
      user: user.id,
      name: user.name,
      avatar: user.avatar,
      host: false
    })

    await event.save()
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

// Unsubscribe to an event
// Private
// POST /api/events/:eventId/subscribe
router.post('/:eventId/unsubscribe', [auth], async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).send('Evenement introuvable')
    }

    event.attendees = event.attendees.filter(attendee => attendee.user.toString() !== req.user.id)

    await event.save()
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Erreur serveur')
  }
})

module.exports = router
