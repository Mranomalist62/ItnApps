
// Required Prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Optional for logging errors or enhanced debug
const path = require('path');       // (only needed if you're manipulating paths)
const fs = require('fs');           // (only needed if you manage files/images manually)

const RetreatController = {
    getRandomRetreats: async (req, res) => {
        try {
          const retreats = await prisma.retreat.findMany({
            take: 6, // Number of random items to return
            orderBy: { id: 'desc' }, // Optionally change to random sort
            include: {
              destination: true,
              categories: true,
              images: true
            }
          });
      
          res.json(retreats);
        } catch (error) {
          console.error('Error fetching random retreats:', error);
          res.status(500).json({ error: 'Failed to fetch retreats' });
        }
      },

      getAllRetreats: async (req, res) => {
        try {
          const retreats = await prisma.retreat.findMany({
            include: {
              destination: true,
              categories: true,
              images: true
            }
          });
      
          res.json(retreats);
        } catch (error) {
          console.error('Error fetching all retreats:', error);
          res.status(500).json({ error: 'Failed to fetch all retreats' });
        }
      },

      searchRetreats: async (req, res) => {
        const { location, category, minPrice, maxPrice } = req.query;
      
        try {
          const retreats = await prisma.retreat.findMany({
            where: {
              AND: [
                location
                  ? {
                      destination: {
                        name: { contains: location, mode: 'insensitive' }
                      }
                    }
                  : {},
                category
                  ? {
                      categories: {
                        some: {
                          name: { equals: category, mode: 'insensitive' }
                        }
                      }
                    }
                  : {},
                minPrice || maxPrice
                  ? {
                      price_usd: {
                        gte: parseFloat(minPrice) || 0,
                        lte: parseFloat(maxPrice) || 99999
                      }
                    }
                  : {}
              ]
            },
            include: {
              destination: true,
              categories: true,
              images: true
            }
          });
      
          res.json(retreats);
        } catch (error) {
          console.error('Search error:', error);
          res.status(500).json({ error: 'Failed to search retreats' });
        }
      },

      createRetreat : async (req, res) => {
        try {
          const {
            name,
            description,
            category, // fallback if categories[] is not used
            price_usd,
            destination_id,
            categories, // optional array of category IDs
          } = req.body;
      
          if (!name || !description || !price_usd || !destination_id) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
      
          // Process uploaded images (optional)
          const uploadedImages = req.files || [];
          const coverImage = uploadedImages.length > 0 ? uploadedImages[0].filename : 'default.jpg';
      
          // Create the retreat
          const newRetreat = await prisma.retreat.create({
            data: {
              name,
              description,
              category: category || 'Uncategorized',
              price_usd: parseFloat(price_usd),
              destination: { connect: { id: parseInt(destination_id) } },
              cover_image_url: coverImage,
              categories: categories
                ? {
                    connect: categories.map((id) => ({ id: parseInt(id) })),
                  }
                : undefined,
            },
          });
      
          // Insert retreat images if available
          if (uploadedImages.length > 0) {
            const imageData = uploadedImages.map((file) => ({
              image_url: file.filename,
              retreat_id: newRetreat.id,
            }));
      
            await prisma.retreatImage.createMany({
              data: imageData,
            });
          }
      
          res.status(201).json({
            message: 'Retreat created successfully',
            retreat: newRetreat,
          });
        } catch (error) {
          console.error('Create Retreat Error:', error);
          res.status(500).json({ error: 'Failed to create retreat' });
        }
      },

      updateRetreat: async (req, res) => {
        const retreatId = parseInt(req.params.id);
        if (isNaN(retreatId)) return res.status(400).json({ error: 'Invalid retreat ID' });
      
        const {
          name,
          description,
          category,
          price_usd,
          destination_id
        } = req.body;
      
        const newImages = req.files || [];
      
        try {
          const existing = await prisma.retreat.findUnique({
            where: { id: retreatId },
            include: { images: true }
          });
      
          if (!existing) return res.status(404).json({ error: 'Retreat not found' });
      
          // If new images are uploaded, delete old ones
          if (newImages.length > 0) {
            // Remove DB entries
            await prisma.retreatImage.deleteMany({
              where: { retreat_id: retreatId }
            });
      
            // Remove old files (except default)
            existing.images.forEach(img => {
              if (img.image_url !== 'default.jpg') {
                const imgPath = path.join(__dirname, '..', 'uploads', 'retreats', img.image_url);
                fs.unlink(imgPath, err => {
                  if (err && err.code !== 'ENOENT') {
                    console.warn('Failed to delete old image:', img.image_url);
                  }
                });
              }
            });
      
            // Insert new images
            const imageData = newImages.map(file => ({
              retreat_id: retreatId,
              image_url: file.filename
            }));
      
            await prisma.retreatImage.createMany({ data: imageData });
          }
      
          // Update retreat fields
          const updated = await prisma.retreat.update({
            where: { id: retreatId },
            data: {
              ...(name && { name }),
              ...(description && { description }),
              ...(category && { category }),
              ...(price_usd && { price_usd: parseFloat(price_usd) }),
              ...(destination_id && { destination_id: parseInt(destination_id) })
            }
          });
      
          res.json({
            message: 'Retreat updated successfully',
            retreat: updated
          });
      
        } catch (error) {
          console.error('Update retreat error:', error);
          res.status(500).json({ error: 'Failed to update retreat' });
        }
      },

    
    deleteRetreat: async (req, res) => {
        const retreatId = parseInt(req.params.id);
        if (isNaN(retreatId)) return res.status(400).json({ error: 'Invalid retreat ID' });

        try {
            const retreat = await prisma.retreat.findUnique({
            where: { id: retreatId },
            include: {
                images: true
            }
            });

            if (!retreat) return res.status(404).json({ error: 'Retreat not found' });

            // Delete image files from disk (except default)
            retreat.images.forEach(img => {
            if (img.image_url !== 'default.jpg') {
                const imgPath = path.join(__dirname, '..', 'uploads', 'retreats', img.image_url);
                fs.unlink(imgPath, err => {
                if (err && err.code !== 'ENOENT') {
                    console.warn(`Failed to delete image ${img.image_url}:`, err.message);
                }
                });
            }
            });

            // Delete retreat (images are CASCADED if Prisma schema uses `onDelete: Cascade`)
            await prisma.retreat.delete({
            where: { id: retreatId }
            });

            res.json({ message: 'Retreat deleted successfully' });

        } catch (error) {
            console.error('Delete retreat error:', error);
            res.status(500).json({ error: 'Failed to delete retreat' });
        }
    }
}

module.exports = RetreatController;