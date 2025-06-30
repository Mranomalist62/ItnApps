import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../services/AuthService";
import { handleUpdateProfile } from "../services/UserService";

const Dashboard = ({ setIsLoggedIn }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
    member_since: "",
    profile_picture: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const date = new Date(parsedUser.member_since);
      const formatted = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      setUserData({
        first_name: parsedUser.first_name || "",
        last_name: parsedUser.last_name || "",
        email: parsedUser.email || "",
        phone_number: parsedUser.phone_number || "",
        location: parsedUser.location || "",
        profile_picture: parsedUser.profile_picture || "",
        member_since: formatted || "",
      });
    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Top Bar with Profile - Fixed to avoid navbar overlap */}
      <div className="flex flex-row align-middle md:flex-row items-center mb-4 mt-12 gap-4">
        {/* Compact Profile */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-full shadow-xs border border-gray-100">
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium">SJ</div>
          <div className="pr-2">
            <p className="text-sm font-medium text-gray-700">{userData.first_name + " " + userData.last_name}</p>
            <p className="text-xs text-gray-400">{userData.email}</p>
          </div>
        </div>
        <div>
          {/* <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1> */}
          <p className="text-black ">Welcome back, {userData.first_name}!</p>
        </div>
      </div>

      {/* Main Content Grid with top padding */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-10">
        {/* First Column - Navigation */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white p-5 rounded-xl shadow-sm sticky top-6">
            <h3 className="text-gray-700 font-medium mb-4">Menu</h3>
            <ul className="space-y-2 pb-2">
              <NavItem icon="📊" label="Dashboard" active={activeMenu === "Dashboard"} onClick={() => setActiveMenu("Dashboard")} />
              {/* <NavItem icon="📅" label="My Bookings" active={true} /> */}
              <NavItem icon="❤️" label="Saved Retreats" active={activeMenu === "Saved Retreats"} onClick={() => setActiveMenu("Saved Retreats")} />
              <NavItem icon="⚙️" label="Settings" active={activeMenu === "Settings"} onClick={() => setActiveMenu("Settings")} />
            </ul>
            <ul className="space-y-2 pt-2 border-t border-gray-500">
              <NavItem icon="🌋" label="Sign Out" active={activeMenu === "Sign Out"} onClick={() => handleLogout(setIsLoggedIn, navigate)} />
            </ul>
          </section>
        </div>
        {activeMenu == "Dashboard" && <DashboardMenu />}
        {activeMenu == "Saved Retreats" && <SavedMenu />}
        {activeMenu == "Settings" && <SettingMenu userData={userData} />}
      </div>
    </div>
  );
};

const SavedMenu = () => {
  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-xl shadow-soft p-6 animate-fadeIn shadow-sm ">
        <h2 className="text-2xl font-display font-bold mb-6">Saved Retreats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                alt="Mountain Serenity Escape"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                src="/placeholder.svg?height=400&amp;width=600"></img>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center text-emerald-700 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin mr-1">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">Yogyakarta</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Mountain Serenity Escape</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Adventure &amp; Wellness</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">$950</span>
                <a className="btn-outline text-sm py-1.5 px-4" href="/retreat/3">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                alt="Mountain Serenity Escape"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                src="/placeholder.svg?height=400&amp;width=600"></img>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center  justify-center text-red-500 hover:bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center text-emerald-700 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin mr-1">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">Yogyakarta</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Mountain Serenity Escape</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Adventure &amp; Wellness</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">$950</span>
                <a className="btn-outline text-sm py-1.5 px-4" href="/retreat/3">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                alt="Beachfront Yoga Haven"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                src="/placeholder.svg?height=400&amp;width=600"></img>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center text-emerald-700 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin mr-1">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">Canggu, Bali</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Beachfront Yoga Haven</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Yoga &amp; Surfing</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">$1100</span>
                <a className="btn-outline text-sm py-1.5 px-4" href="/retreat/4">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                alt="Mountain Serenity Escape"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                src="/placeholder.svg?height=400&amp;width=600"></img>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center text-emerald-700 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin mr-1">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm">Yogyakarta</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Mountain Serenity Escape</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Adventure &amp; Wellness</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">$950</span>
                <a className="btn-outline text-sm py-1.5 px-4" href="/retreat/3">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingMenu = ({ userData }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
  });
  useEffect(() => {
    setForm({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone_number: userData.phone_number,
      location: userData.location,
    });
  }, [userData]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const success = await handleUpdateProfile(e, form);
  };
  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-xl shadow-soft p-6 animate-fadeIn">
        <h2 className="text-2xl font-display font-bold mb-6">Account Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-blue-100">
                  <img alt={userData.first_name + " " + userData.last_name} loading="lazy" width="128" height="128" decoding="async" data-nimg="1" className="object-cover" style={{ color: "transparent" }} src={"http://localhost:5000/api/users/image/" + userData.profile_picture}></img>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-camera">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-lg">{userData.first_name + " " + userData.last_name}</h3>
              <p className="text-gray-600 text-sm">Member since {userData.member_since}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name {form.first_name}
                  </label>
                  <input
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={form.first_name}></input>
                </div>
                <div>
                  <label for="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={form.last_name}></input>
                </div>
              </div>
              <div>
                <label for="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}></input>
              </div>
              <div>
                <label for="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="tel"
                  name="phone_number"
                  onChange={handleChange}
                  value={form.phone_number}></input>
              </div>
              <div>
                <label for="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="text"
                  name="location"
                  onChange={handleChange}
                  value={form.location}></input>
              </div>
              <div className="pt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardMenu = () => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <section className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
        <h3 className="text-gray-700 font-medium mb-3">Upcoming Retreat</h3>
        <h4 className="font-medium text-gray-800 mb-2">Jungle Harmony Retreat</h4>
        <DetailItem icon="📍" text="Ubud, Bali" />
        <DetailItem icon="📅" text="Jun 15-22, 2023" />
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">View Details</button>
          <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">Add to Calendar</button>
        </div>
      </section>

      <section className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700 font-medium">Saved Retreats</h3>
          <button className="text-blue-500 text-sm hover:text-blue-700 flex items-center gap-1">
            View all <span>→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RetreatCard name="Mountain Serenity" location="Yogyakarta" price="$950" emoji="🏔️" />
          <RetreatCard name="Beachfront Yoga" location="Canggu" price="$1100" emoji="🏖️" />
          <RetreatCard name="Forest Meditation" location="Ubud" price="$850" emoji="🌲" />
          <RetreatCard name="Desert Wellness" location="Jaisalmer" price="$1200" emoji="🏜️" />
        </div>
      </section>
    </div>
  );
};

// Reusable Components
const NavItem = ({ icon, label, active, onClick }) => (
  <li onClick={onClick} className={`flex items-center p-2 rounded-lg cursor-pointer transition ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}>
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </li>
);

const DetailItem = ({ icon, text }) => (
  <p className="flex items-center text-gray-600 text-sm mb-1">
    <span className="mr-2">{icon}</span>
    {text}
  </p>
);

const RetreatCard = ({ emoji, name, location, price }) => (
  <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
    <div className="text-2xl mb-2">{emoji}</div>
    <h4 className="font-medium text-gray-800">{name}</h4>
    <p className="text-gray-500 text-sm">{location}</p>
    <p className="text-gray-700 font-medium mt-2">{price}</p>
  </div>
);

const BookingItem = ({ name, date, status }) => (
  <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
    <p className="font-medium text-gray-800">{name}</p>
    <p className="text-gray-500 text-sm">{date}</p>
    <div className="flex justify-between items-center mt-1">
      <span className={`text-xs px-2 py-1 rounded-full ${status === "Completed" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
        {status}
      </span>
      <button className="text-blue-500 text-xs hover:text-blue-700">Details</button>
    </div>
  </div>
);

export default Dashboard;
