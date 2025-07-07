// Required Prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Optional for logging errors or enhanced debug
const path = require("path"); // (only needed if you're manipulating paths)
const fs = require("fs"); // (only needed if you manage files/images manually)

const RetreatController = {
  getRandomRetreats: async (req, res) => {
    try {
      const retreats = await prisma.retreat.findMany({
        take: 6, // Number of random items to return
        orderBy: { id: "desc" }, // Optionally change to random sort
        include: {
          // destination: true,
          category: true,
          images: true,
        },
      });

      res.json(retreats);
    } catch (error) {
      console.error("Error fetching random retreats:", error);
      res.status(500).json({ error: "Failed to fetch retreats" });
    }
  },

  getAllRetreats: async (req, res) => {
    try {
      const retreats = await prisma.retreat.findMany({
        include: {
          // destination: true,
          category: true,
          images: true,
        },
      });

      res.json(retreats);
    } catch (error) {
      console.error("Error fetching all retreats:", error);
      res.status(500).json({ error: "Failed to fetch all retreats" });
    }
  },

  getRetreatsById: async (req, res) => {
    const retreatId = parseInt(req.params.id);
    try {
      const retreats = await prisma.retreat.findUnique({
        where: { id: retreatId },
        include: {
          category: true,
          images: true,
          activities: true,
        },
      });

      res.json(retreats);
    } catch (error) {
      console.error("Error fetching all retreats:", error);
      res.status(500).json({ error: "Failed to fetch all retreats" });
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
                  location: { equals: location },
                }
              : {},
            category
              ? {
                  category: {
                    id: { equals: parseInt(category) },
                  },
                }
              : {},
            minPrice || maxPrice
              ? {
                  price_usd: {
                    gte: parseFloat(minPrice) || 0,
                    lte: parseFloat(maxPrice) || 99999,
                  },
                }
              : {},
          ],
        },
        include: {
          // destination: true,
          category: true,
          images: true,
        },
      });

      res.json(retreats);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Failed to search retreats" });
    }
  },

  createRetreat: async (req, res) => {
    try {
      const { retreatsData, activitiesData } = req.body;
      const parsedRetreat = JSON.parse(retreatsData);
      const parsedActivities = JSON.parse(activitiesData);
      const uploadedImages = req.files || [];
      // Create Retreat
      const newRetreat = await prisma.retreat.create({
        data: {
          name: parsedRetreat.retreat_name,
          location: parsedRetreat.retreat_location,
          price_usd: parseFloat(parsedRetreat.retreat_price),
          description: parsedRetreat.retreat_desc,
          category: {
            connect: { id: parseInt(parsedRetreat.retreat_category) },
          },
        },
      });

      // Create Activities
      const activityPromises = parsedActivities.map((activity) =>
        prisma.activity.create({
          data: {
            title: activity.activity_name,
            time: activity.activity_time,
            location: activity.activity_location,
            description: activity.activity_desc,
            retreat: { connect: { id: newRetreat.id } },
          },
        })
      );

      await Promise.all(activityPromises);

      // Save Images
      const imagePromises = uploadedImages.map((file) =>
        prisma.retreatImage.create({
          data: {
            image_url: file.filename,
            retreat: { connect: { id: newRetreat.id } },
          },
        })
      );

      await Promise.all(imagePromises);

      res.status(201).json({ message: "Retreat successfully created!" });
    } catch (error) {
      console.error("Error creating retreat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateRetreat: async (req, res) => {
    const retreatId = parseInt(req.params.id);
    if (isNaN(retreatId)) return res.status(400).json({ error: "Invalid retreat ID" });

    try {
      const { retreatsData, activitiesData } = req.body;
      const parsedRetreat = JSON.parse(retreatsData);
      const parsedActivities = JSON.parse(activitiesData);
      const uploadedImages = req.files || [];

      // Find existing retreat
      const existing = await prisma.retreat.findUnique({
        where: { id: retreatId },
        include: {
          images: true,
          activities: true,
        },
      });

      if (!existing) return res.status(404).json({ error: "Retreat not found" });

      // Update retreat main fields
      const updatedRetreat = await prisma.retreat.update({
        where: { id: retreatId },
        data: {
          name: parsedRetreat.retreat_name,
          location: parsedRetreat.retreat_location,
          price_usd: parseFloat(parsedRetreat.retreat_price),
          description: parsedRetreat.retreat_desc,
          category: {
            connect: { id: parseInt(parsedRetreat.retreat_category) },
          },
        },
      });

      // Replace old images if new ones are uploaded
      if (uploadedImages.length > 0) {
        // Delete old images from DB
        await prisma.retreatImage.deleteMany({ where: { retreat_id: retreatId } });

        // Delete old image files
        existing.images.forEach((img) => {
          if (img.image_url !== "default.jpg") {
            const imgPath = path.join(__dirname, "..", "uploads", "retreats", img.image_url);
            fs.unlink(imgPath, (err) => {
              if (err && err.code !== "ENOENT") {
                console.warn("Failed to delete image:", img.image_url);
              }
            });
          }
        });

        // Save new images
        const imageData = uploadedImages.map((file) => ({
          retreat_id: retreatId,
          image_url: file.filename,
        }));
        await prisma.retreatImage.createMany({ data: imageData });
      }

      // Replace all old activities
      await prisma.activity.deleteMany({ where: { retreat_id: retreatId } });

      const activityPromises = parsedActivities.map((activity) =>
        prisma.activity.create({
          data: {
            title: activity.activity_name,
            time: activity.activity_time,
            location: activity.activity_location,
            description: activity.activity_desc,
            retreat: { connect: { id: retreatId } },
          },
        })
      );
      await Promise.all(activityPromises);

      const refreshed = await prisma.retreat.findUnique({
        where: { id: retreatId },
        include: { category: true, images: true, activities: true },
      });

      res.json({
        message: "Retreat updated successfully",
        retreat: refreshed,
      });
    } catch (error) {
      console.error("Update retreat error:", error);
      res.status(500).json({ error: "Failed to update retreat" });
    }
  },

  deleteRetreat: async (req, res) => {
    const retreatId = parseInt(req.params.id);
    if (isNaN(retreatId)) return res.status(400).json({ error: "Invalid retreat ID" });

    try {
      const retreat = await prisma.retreat.findUnique({
        where: { id: retreatId },
        include: {
          images: true,
          category: true,
          activities: true,
        },
      });

      if (!retreat) return res.status(404).json({ error: "Retreat not found" });

      // 1. Delete images from disk
      retreat.images.forEach((img) => {
        if (img.image_url !== "default.jpg") {
          const imgPath = path.join(__dirname, "..", "uploads", "retreats", img.image_url);
          fs.unlink(imgPath, (err) => {
            if (err && err.code !== "ENOENT") {
              console.warn(`Failed to delete image ${img.image_url}:`, err.message);
            }
          });
        }
      });

      // 2. Disconnect category
      // await prisma.retreat.update({
      //   where: { id: retreatId },
      //   data: {
      //     category_id: null,
      //   },
      // });

      // 3. Delete related records
      await prisma.retreatImage.deleteMany({ where: { retreat_id: retreatId } });
      await prisma.activity.deleteMany({ where: { retreat_id: retreatId } });

      // 4. Delete the retreat itself
      await prisma.retreat.delete({ where: { id: retreatId } });

      res.json({ message: "Retreat deleted successfully" });
    } catch (error) {
      console.error("Delete retreat error:", error);
      res.status(500).json({ error: "Failed to delete retreat" });
    }
  },
};

module.exports = RetreatController;
