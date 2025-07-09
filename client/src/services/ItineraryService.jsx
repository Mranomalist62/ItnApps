export const handleCreateItinerary = async (dateRange) => {
  const adjustedStart = new Date(dateRange.startDate);
  adjustedStart.setDate(adjustedStart.getDate() + 1);

  const adjustedEnd = new Date(dateRange.endDate);
  adjustedEnd.setDate(adjustedEnd.getDate() + 1);
  try {
    const res = await fetch("http://localhost:5000/api/itinerary/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ start_date: adjustedStart, end_date: adjustedEnd }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Itinerary created:", data);
      return true;
    } else {
      alert(data.error || "Failed to create itinerary");
      return false;
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
    return false;
  }
};

export const handleCheckItinerary = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/itinerary/check", {
      credentials: "include", // if cookie-based auth
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Check itinerary failed:", err);
    return null;
  }
};

export const handleUpdateItineraryRetreat = async (item_id, new_retreat_id) => {
  try {
    const res = await fetch("http://localhost:5000/api/itinerary/updateId", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // for cookie auth
      body: JSON.stringify({ item_id, new_retreat_id }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Update itinerary item failed:", err);
    return null;
  }
};

export const handleDeleteItinerary = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/itinerary/${id}`, {
      method: "DELETE",
      credentials: "include", 
    });
    if (!res.ok) {
      throw new Error("Failed to delete");
    }
    return true;
  } catch (err) {
    console.error("Delete itinerary failed:", err);
    return false;
  }
};
