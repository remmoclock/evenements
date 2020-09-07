const express = require('express')
const connectDB = require('./config/database')

const app = express()

// Database
connectDB()

// Middlewares
app.use(express.json({ extended: false }))

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/events', require('./routes/api/events'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
