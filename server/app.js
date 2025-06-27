const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());             // allow cross-origin from frontend
app.use(express.json());     // parse JSON bodies

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});