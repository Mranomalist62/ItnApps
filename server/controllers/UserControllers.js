const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const fs = require('fs');
const path = require('path');
const prisma = require('../prisma/client');
const { v4: uuidv4 } = require('uuid'); 

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
        
          try {
            // Check for existing email
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
              return res.status(409).json({ error: 'Email already exists' });
            }
        
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create user
            const newUser = await prisma.user.create({
              data: {
                first_name,
                last_name,
                email,
                password_hash: hashedPassword,
                phone_number,
                location,
                profile_picture: 'default.png'
              }
            });
        
            res.status(201).json({
              message: 'User registered successfully',
              userId: newUser.id,
              profile_picture_url: `http://localhost:5000/uploads/default.png`
            });
        
          } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({ error: 'Server error during registration' });
          }
        },

      login: async (req, res) => {
        const { email, password } = req.body;
          if (!email || !password)
            return res.status(400).json({ error: 'Missing credentials' });
        
          try {
            const user = await prisma.user.findUnique({ where: { email } });
        
            if (!user)
              return res.status(401).json({ error: 'Invalid credentials' });
        
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match)
              return res.status(401).json({ error: 'Invalid credentials' });
        
            // Optional: Invalidate existing sessions
            await prisma.session.deleteMany({ where: { userId: user.id } });
        
            // Session setup
            const sessionToken = uuidv4();
            const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
        
            await prisma.session.create({
              data: {
                userId: user.id,
                sessionToken,
                expires
              }
            });
        
            await prisma.user.update({
              where: { id: user.id },
              data: { last_login: new Date() }
            });
        
            res.cookie('sessionToken', sessionToken, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
        
            res.json({
              message: 'Login successful',
              user: {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                profile_picture: user.profile_picture
              }
            });
        
          } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error during login' });
          }
        },

  update: async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const {
        first_name,
        last_name,
        email,
        phone_number,
        location,
    } = req.body;

    const profile_picture = req.file ? req.file.filename : undefined;

    try {
        // Fetch existing user for image cleanup
        const existingUser = await prisma.user.findUnique({
        where: { id: userId }
        });

        if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
        }

        // If a new image is uploaded, remove old one (unless default)
        if (profile_picture && existingUser.profile_picture !== 'default.png') {
        const oldPath = path.join(__dirname, '..', 'uploads', 'users', existingUser.profile_picture);
        fs.unlink(oldPath, (err) => {
            if (err && err.code !== 'ENOENT') {
            console.warn('Failed to delete old image:', err.message);
            } else {
            console.log('Old profile image deleted:', existingUser.profile_picture);
            }
        });
        }

        // Build update data: only fields that are defined
        const updateData = {
        ...(first_name !== undefined && { first_name }),
        ...(last_name !== undefined && { last_name }),
        ...(email !== undefined && { email }),
        ...(phone_number !== undefined && { phone_number }),
        ...(location !== undefined && { location }),
        ...(profile_picture !== undefined && { profile_picture }),
        };

        const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData
        });

        res.json({
        message: 'User updated successfully',
        updated_fields: updateData
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
  }


};

module.exports = UserController;