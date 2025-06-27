const db = require('../config/db');

const UserModel = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  create: (userData, callback) => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      location,
      profile_picture,
      password_hash,
    } = userData;

    const sql = `
      INSERT INTO users (
        first_name, last_name, email, phone_number, location,
        profile_picture, password_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      first_name, last_name, email, phone_number || null,
      location || null, profile_picture || null, password_hash,
    ];

    db.query(sql, values, callback);
  }
};

module.exports = UserModel;