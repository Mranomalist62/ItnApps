const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

//External Package
app.use(cors());             // allow cross-origin from frontend
app.use(express.json());     // parse JSON bodies
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

//internal package
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});