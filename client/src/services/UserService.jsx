export const handleUpdateProfile = async (e, form) => {
  e.preventDefault();
  try {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const res = await fetch(`http://localhost:5000/api/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Profile updated successfully");

      // Optionally update localStorage
      const current = JSON.parse(localStorage.getItem("user"));
      const updated = { ...current, ...form };
      localStorage.setItem("user", JSON.stringify(updated));
    } else {
      alert("❌ " + data.error);
    }
  } catch (err) {
    console.error("Update failed", err);
    alert("❌ Server error during update");
  }
};

export const handleDashboardStats = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/users/totals');
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json(); 
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { totalUsers: 0, totalRetreats: 0 };
  }
};

