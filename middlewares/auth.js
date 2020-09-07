const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('jwtSecretKey')

const auth = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(403).json({ errors: 'Non autorisé' })
  }

  try {
    jwt.verify(token, tokenKey, (err, decoded) => {
      if (err) {
        console.error(err.message)
        return res.status(401).json({ errors: 'Token invalide' })
      }
      return (req.user = decoded.user)
    })

    next()
  } catch (err) {
    console.error(err.message)
    return res.status(401).json({ errors: 'Token invalide' })
  }
}

module.exports = auth
