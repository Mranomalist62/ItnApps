
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

      createRetreat: async (req, res) => {
        try {
          const {
            name,
            description,
            price_usd,
            destination_id,
            category 
          } = req.body;
      
          if (!name || !description || !price_usd || !destination_id || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
      
          // Check if category already exists
          let categoryRecord = await prisma.category.findUnique({
            where: { name: category }
          });
      
          // If not, create it with a default description
          if (!categoryRecord) {
            categoryRecord = await prisma.category.create({
              data: {
                name: category,
                desc: "No description yet"
              }
            });
          }
      
          // Process uploaded images (optional)
          const uploadedImages = req.files || [];
          const coverImage = uploadedImages.length > 0 ? uploadedImages[0].filename : 'default.jpg';
      
          // Create the retreat
          const newRetreat = await prisma.retreat.create({
            data: {
              name,
              description,
              price_usd: parseFloat(price_usd),
              cover_image_url: coverImage,
              destination: { connect: { id: parseInt(destination_id) } },
              category: { connect: { id: categoryRecord.id } }
            }
          });
      
          // Insert retreat images if available
          if (uploadedImages.length > 0) {
            const imageData = uploadedImages.map((file) => ({
              image_url: file.filename,
              retreat_id: newRetreat.id
            }));
      
            await prisma.retreatImage.createMany({
              data: imageData
            });
          }
      
          res.status(201).json({
            message: 'Retreat created successfully',
            retreat: newRetreat
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
      
          // Handle new images
          if (newImages.length > 0) {
            await prisma.retreatImage.deleteMany({ where: { retreat_id: retreatId } });
      
            existing.images.forEach(img => {
              if (img.image_url !== 'default.jpg') {
                const imgPath = path.join(__dirname, '..', 'uploads', 'retreats', img.image_url);
                fs.unlink(imgPath, err => {
                  if (err && err.code !== 'ENOENT') {
                    console.warn('Failed to delete image:', img.image_url);
                  }
                });
              }
            });
      
            const imageData = newImages.map(file => ({
              retreat_id: retreatId,
              image_url: file.filename
            }));
            await prisma.retreatImage.createMany({ data: imageData });
          }
      
          // Prepare update data
          const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price_usd && { price_usd: parseFloat(price_usd) }),
            ...(destination_id && { destination_id: parseInt(destination_id) })
          };
      
          // Handle category update if provided
          if (category) {
            let categoryRecord = await prisma.category.findUnique({ where: { name: category } });
            if (!categoryRecord) {
              categoryRecord = await prisma.category.create({
                data: {
                  name: category,
                  desc: 'No description yet'
                }
              });
            }
      
            // Replace categories connection (many-to-many)
            await prisma.retreat.update({
              where: { id: retreatId },
              data: {
                ...updateData,
                categories: {
                  set: [{ id: categoryRecord.id }]
                }
              }
            });
      
          } else {
            // No category change, just update retreat
            await prisma.retreat.update({
              where: { id: retreatId },
              data: updateData
            });
          }
      
          const refreshed = await prisma.retreat.findUnique({
            where: { id: retreatId },
            include: { categories: true, images: true }
          });
      
          res.json({
            message: 'Retreat updated successfully',
            retreat: refreshed
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
            images: true,
            categories: true,
            activities: true
          }
        });
    
        if (!retreat) return res.status(404).json({ error: 'Retreat not found' });
    
        // 1. Delete images from disk
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
    
        // 2. Disconnect categories 
        await prisma.retreat.update({
          where: { id: retreatId },
          data: {
            categories: {
              set: []
            }
          }
        });
    
        // 3. Delete related records
        await prisma.retreatImage.deleteMany({ where: { retreat_id: retreatId } });
        await prisma.activity.deleteMany({ where: { retreat_id: retreatId } });
    
        // 4. Delete the retreat itself
        await prisma.retreat.delete({ where: { id: retreatId } });
    
        res.json({ message: 'Retreat deleted successfully' });
    
      } catch (error) {
        console.error('Delete retreat error:', error);
        res.status(500).json({ error: 'Failed to delete retreat' });
      }
    }
}

module.exports = RetreatController;