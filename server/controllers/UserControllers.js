const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const UserController = {
    register: async (req, res) => {
        const {
          first_name,
          last_name,
          email,
          password,
          phone_number,
          location
        } = req.body;
    
        if (!first_name || !last_name || !email || !password) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        UserModel.findByEmail(email, async (err, results) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          if (results.length > 0) return res.status(409).json({ error: 'Email already exists' });
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const userData = {
            first_name,
            last_name,
            email,
            phone_number,
            location,
            profile_picture: 'default.png',  // 👈 force use of default
            password_hash: hashedPassword
          };
    
          UserModel.create(userData, (err, result) => {
            if (err) return res.status(500).json({ error: 'Insert failed' });
    
            res.status(201).json({
              message: 'User registered successfully',
              userId: result.insertId,
              profile_picture_url: `http://localhost:5000/uploads/default.png`
            });
          });
        });
      },

  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    UserModel.findByEmail(email, async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        }
      });
    });
  }
};

module.exports = UserController;