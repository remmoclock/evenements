const express = require("express");
const connectDB = require("./config/database");
const path = require('path')

const app = express();

// Database
connectDB();

// Middlewares
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'client/build')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join((__dirname = 'client/build/index.html')))
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
