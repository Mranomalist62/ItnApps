const prisma = require("../prisma/client");

const ItineraryController = {
  create: async (req, res) => {
    try {
      const { start_date, end_date } = req.body;
      const userId = req.user.id;

      if (!start_date || !end_date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const parsedStart = new Date(start_date);
      const parsedEnd = new Date(end_date);

      if (parsedEnd < parsedStart) {
        return res.status(400).json({ error: "End date must be after start date" });
      }

      // Step 1: Create the itinerary
      const newItinerary = await prisma.itinerary.create({
        data: {
          userId,
          start_date: parsedStart,
          end_date: parsedEnd,
        },
      });

      // Step 2: Generate date range
      const dateItems = [];
      for (let d = new Date(parsedStart); d <= parsedEnd; d.setDate(d.getDate() + 1)) {
        dateItems.push(new Date(d)); // Clone the date object
      }

      // Step 3: Create ItineraryItems for each date
      const itemsData = dateItems.map((date) => ({
        itinerary_Id: newItinerary.id,
        planned_date: date,
        retreat_id: null,
      }));

      await prisma.itineraryItem.createMany({ data: itemsData });

      res.status(201).json({
        message: "Itinerary and items created",
        itineraryId: newItinerary.id,
        totalDays: dateItems.length,
      });
    } catch (error) {
      console.error("Itinerary creation error:", error);
      res.status(500).json({ error: "Failed to create itinerary" });
    }
  },
  checkUserItinerary: async (req, res) => {
    try {
      const userId = req.user.id;
      const itinerary = await prisma.itinerary.findFirst({
        where: { userId },
        include: {
          itineraries: {
            include: {
              retreat: {
                select: {
                  id: true,
                  name: true,
                  activities: {
                    select: {
                      id: true,
                      title: true,
                      description: true,
                      time: true,
                      location: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!itinerary) {
        return res.status(200).json({ hasItinerary: false, items: [] });
      }

      res.status(200).json({ hasItinerary: true, items: itinerary.itineraries });
    } catch (error) {
      console.error("Itinerary check error:", error);
      res.status(500).json({ error: "Server error checking itinerary" });
    }
  },
  updateRetreatId: async (req, res) => {
    try {
      const { item_id, new_retreat_id } = req.body;

      if (!item_id || !new_retreat_id) {
        return res.status(400).json({ error: "Missing item_id or new_retreat_id" });
      }

      const updatedItem = await prisma.itineraryItem.update({
        where: { id: item_id },
        data: { retreat_id: parseInt(new_retreat_id) },
      });

      res.status(200).json({ message: "Itinerary item updated", item: updatedItem });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Failed to update itinerary item" });
    }
  },
  delete: async (req, res) => {
    try {
      const itineraryId = parseInt(req.params.id);
      const userId = req.user.id;
      const itinerary = await prisma.itinerary.findUnique({
        where: { id: itineraryId },
      });

      if (!itinerary || itinerary.userId !== userId) {
        return res.status(403).json({ error: "Not authorized or itinerary not found" });
      }

      await prisma.itineraryItem.deleteMany({
        where: { itinerary_Id: itineraryId },
      });
      await prisma.itinerary.delete({
        where: { id: itineraryId },
      });

      res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
      console.error("Delete itinerary error:", error);
      res.status(500).json({ error: "Failed to delete itinerary" });
    }
  },
};
module.exports = ItineraryController;
