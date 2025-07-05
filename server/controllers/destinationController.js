const prisma = require('../prisma/client');
const path = require('path');
const fs = require('fs');

const DestinationController = {
    // Create a new destination
    create: async (req, res) => {
        const { name, country, description } = req.body;
    
        // File validation
        if (!req.file) {
          return res.status(400).json({ error: 'Main image is required' });
        }
    
        const main_image_url = req.file.filename;
    
        if (!name || !country || !description) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        try {
          const destination = await prisma.destination.create({
            data: {
              name,
              country,
              description,
              main_image_url 
            }
          });
    
          res.status(201).json({
            message: 'Destination created',
            destination
          });
    
        } catch (err) {
          console.error('Create destination error:', err);
          res.status(500).json({ error: 'Failed to create destination' });
        }
      },
  
    // Get all destinations
    getAll: async (req, res) => {
      try {
        const destinations = await prisma.destination.findMany({
          include: { retreats: true }
        });
        res.json(destinations);
      } catch (err) {
        console.error('Get all destinations error:', err);
        res.status(500).json({ error: 'Failed to fetch destinations' });
      }
    },
  
    // Get one destination by ID
    getById: async (req, res) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid destination ID' });
  
      try {
        const destination = await prisma.destination.findUnique({
          where: { id },
          include: { retreats: true }
        });
        if (!destination) return res.status(404).json({ error: 'Destination not found' });
  
        res.json(destination);
      } catch (err) {
        console.error('Get destination by ID error:', err);
        res.status(500).json({ error: 'Failed to fetch destination' });
      }
    },
  
    // Update destination
    update: async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid destination ID' });
      
        const { name, country, description } = req.body;
        const new_image = req.file?.filename;
      
        try {
          const existing = await prisma.destination.findUnique({ where: { id } });
          if (!existing) {
            return res.status(404).json({ error: 'Destination not found' });
          }
      
          // Remove old image if a new one is uploaded (and the old one isn't a default)
          if (new_image && existing.main_image_url !== 'default.png') {
            const oldPath = path.join(__dirname, '..', 'uploads', 'destinations', existing.main_image_url);
            fs.unlink(oldPath, err => {
              if (err && err.code !== 'ENOENT') {
                console.warn('Failed to delete old image:', err.message);
              }
            });
          }
      
          const updated = await prisma.destination.update({
            where: { id },
            data: {
              ...(name && { name }),
              ...(country && { country }),
              ...(description && { description }),
              ...(new_image && { main_image_url: new_image })
            }
          });
      
          res.json({ message: 'Destination updated', updated });
        } catch (err) {
          console.error('Update destination error:', err);
          res.status(500).json({ error: 'Failed to update destination' });
        }
      },
  
    // Delete destination
    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid destination ID' });
      
        try {
          const existing = await prisma.destination.findUnique({ where: { id } });
          if (!existing) return res.status(404).json({ error: 'Destination not found' });
      
          if (existing.main_image_url && existing.main_image_url !== 'default.png') {
            const imagePath = path.join(__dirname, '..', 'uploads', 'destinations', existing.main_image_url);
            fs.unlink(imagePath, err => {
              if (err && err.code !== 'ENOENT') {
                console.warn('Failed to delete image file:', err.message);
              }
            });
          }
      
          await prisma.destination.delete({ where: { id } });
          res.json({ message: 'Destination deleted' });
        } catch (err) {
          console.error('Delete destination error:', err);
          res.status(500).json({ error: 'Failed to delete destination' });
        }
      }
  };
  
  module.exports = DestinationController;