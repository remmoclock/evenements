const express = require('express')
const router = express.Router()
const User = require('../../models/userModel')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('jwtSecretKey')

// Login user
// Public
// /api/auth
router.post(
  '/',
  [body('email', 'Adresse email invalide').isEmail(), body('password', 'Minimum 6 caractères').isLength({ min: 6 })],
  async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'Email / Mot de passe invalide' }] })
      }

      const checkedPasswords = await bcrypt.compare(password, user.password)
      if (!checkedPasswords) {
        return res.status(404).json({ errors: [{ msg: 'Email / Mot de passe invalide' }] })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, tokenKey, { expiresIn: 60 * 60 * 24 }, (err, token) => {
        return res.json({ token })
      })
    } catch (err) {
      return res.status(500).json({ errors: 'Erreur serveur' })
    }
  }
)

module.exports = router
