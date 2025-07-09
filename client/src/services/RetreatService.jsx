export const ShowUserRetreats = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/retreats/random", {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
};

export const ShowAllRetreats = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/retreats/all", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
};

export const ShowRetreatsById = async (retreat_id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/detail/${retreat_id}`, {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
};

export const ShowSearchedRetreats = async (searchData) => {
  const params = new URLSearchParams();
  if (searchData.name) params.append("name", searchData.name);
  if (searchData.location) params.append("location", searchData.location);
  if (searchData.category) params.append("category", searchData.category);
  if (searchData.minPrice) params.append("minPrice", searchData.minPrice);
  if (searchData.maxPrice) params.append("maxPrice", searchData.maxPrice);
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/search?${params.toString()}`, {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
};

export const handleAddRetreat = async (formData) => {
  try {
    const res = await fetch("http://localhost:5000/api/retreats/create", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    // const data = await res.json();
    if (res.ok) {
      //   setMessage(data.message);
      return true;
    } else {
      //   setMessage(`❌ ${data.error}`);
      return false;
    }
  } catch (err) {
    // setMessage("❌ Server error");
    return false;
  }
};

export const handleDeleteRetreat = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    // const data = await res.json();
    if (res.ok) {
      //   setMessage(data.message);
      return true;
    } else {
      //   setMessage(`❌ ${data.error}`);
      return false;
    }
  } catch (err) {
    // setMessage("❌ Server error");
    return false;
  }
};

export const handleEditRetreat = async (id, formData) => {
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    // const data = await res.json();
    if (res.ok) {
      //   setMessage(data.message);
      return true;
    } else {
      //   setMessage(`❌ ${data.error}`);
      return false;
    }
  } catch (err) {
    // setMessage("❌ Server error");
    return false;
  }
};

export const handleUnsaveRetreat = async (retreatId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/save/${retreatId}`, {
      method: "DELETE",
      credentials: "include",
    });
    
    return res.ok;
    
  } catch (err) {
    return false;
  }
};

export const handleSaveRetreat = async (retreatId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/retreats/save/${retreatId}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) return true;
    if (res.status === 409) return 'already_saved';
  } catch (err) {
    return false;
  }
};


export const getSavedRetreats = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/retreats/save", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return res.ok ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};


//FOR AI NEED
export const getAiActivities = async (searchData) => {
  const convertBudgetToIDR = (budget) => {
    switch (budget) {
      case "Low":
        return 16000000; // $1000
      case "Medium":
        return 15000000; // $1000-15000
      case "High":
        return 24000000; // $1500
      default:
        return 16000000;
    }
  };

  const requestBody = {
    "Umur": 20,
    "Jenis Kelamin": "Laki-laki",
    "Kota": searchData.location || "Jakarta",
    "Frekuensi": "Setiap tiga bulan",
    "Anggaran/Kunjungan (IDR)": convertBudgetToIDR(searchData.budget),
    "Kemauan Bepergian": "Domestik",
    "Metode Pemesanan": "Website",
    "Tujuan Utama": searchData.category || "Relaksasi",
    "Yang Dicari": searchData.category || "Relaksasi",
  };

  try {
    const res = await fetch("https://rifatmon-rfc-infinitelearning.hf.space/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();

    if (res.ok && data.prediction) {
      return data.prediction; // ✅ Just return the prediction string
    } else {
      console.error("AI response error:", data);
      return null;
    }
  } catch (err) {
    console.error("Network or server error:", err);
    return null;
  }
};

export const getRetreatsByActivity = async (activity) => {
  const params = new URLSearchParams();
  params.append("activity", activity);

  try {
    const res = await fetch(`http://localhost:5000/api/retreats/by-activity?${params.toString()}`, {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok) {
      return data.retreats || [];
    } else {
      console.error("Error fetching retreats by activity:", data);
      return [];
    }
  } catch (err) {
    console.error("Network error while fetching retreats by activity:", err);
    return [];
  }
};