// const { v4: uuidv4 } = require('uuid'); 
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UserController = {
  show : async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error', detail: err.message });
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