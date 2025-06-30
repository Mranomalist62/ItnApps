import { useNavigate } from "react-router-dom";

export const handleRegister = async (e, formData, setMessage) => {
  e.preventDefault();

  if (formData.password !== formData.confirm_password) {
    setMessage("❌ Passwords do not match");
    return false;
  }

  const payload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    password: formData.password,
  };

  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      return true;
    } else {
      setMessage(`❌ ${data.error}`);
      return false;
    }
  } catch (err) {
    setMessage("❌ Server error");
    return false;
  }
};

export const handleLogin = async (e, formData, setMessage) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage(data.message);
      return true;
    } else {
      setMessage(data.message || "Login failed.");
      return false;
    }
  } catch (err) {
    console.error("Error during login:", err);
    setMessage("Server error.");
    return false;
  }
};

export const handleLogout = async (setIsLoggedIn, navigate) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (res.ok) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      console.error("Logout failed:", data.error);
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export const sessionValidate = async (setIsLoggedIn) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/validate", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.error("Session check failed", err);
    setIsLoggedIn(false);
  }
};
