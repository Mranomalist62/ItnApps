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
  },

  update: (id, newData, callback) => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      location,
      profile_picture,
      is_active,
    } = newData;

    // Use SQL's COALESCE to keep existing values if null/undefined
    const sql = `
      UPDATE users SET
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        email = COALESCE(?, email),
        phone_number = COALESCE(?, phone_number),
        location = COALESCE(?, location),
        profile_picture = COALESCE(?, profile_picture),
        is_active = COALESCE(?, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      first_name ?? null,
      last_name ?? null,
      email ?? null,
      phone_number ?? null,
      location ?? null,
      profile_picture ?? null,
      is_active ?? null,
      id
    ];

    db.query(sql, values, callback);
  }

  




};

module.exports = UserModel;


