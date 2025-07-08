import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../services/AuthService";
import { handleUpdateProfile } from "../services/UserService";
import { getSavedRetreats, handleUnsaveRetreat} from "../services/RetreatService";


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
  const [savedRetreats, setSavedRetreats] = useState([]);
  // const [isSaved, setIsSaved] = useState(true); // Default: already saved

  useEffect(() => {
    const fetchData = async () => {
      const retreats = await getSavedRetreats();
      setSavedRetreats(retreats);
    };
    fetchData();
  }, []);

  const handleUnsave = async (retreatId) => {
    const success = await handleUnsaveRetreat(retreatId);
    if (success) {
      // Remove unsaved retreat from state
      setSavedRetreats((prev) => prev.filter((r) => r.id !== retreatId));
    } else {
      console.error("Failed to unsave retreat");
    }
  };


  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-xl shadow-soft p-6 animate-fadeIn shadow-sm">
        <h2 className="text-2xl font-display font-bold mb-6">Saved Retreats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRetreats.length > 0 ? (
            savedRetreats.map((retreat) => (
              <div
                key={retreat.id}
                className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    alt={retreat.name}
                    src={`http://localhost:5000/api/retreats/image/${retreat.images[0]?.image_url || "placeholder.svg"}`}
                    className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                  />
                  <button
                    onClick={() => handleUnsave(retreat.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                    title="Unsave"
                  >
                    {/* Filled Heart Emoji or Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 
                        4 4 6.5 4c1.74 0 3.41 1.01 4.5 2.09C12.09 5.01 
                        13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 
                        6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-emerald-700 mb-1">
                    📍 <span className="text-sm ml-1">{retreat.location}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{retreat.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                      {retreat.category.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${retreat.price_usd}</span>
                    <a className="btn-outline text-sm py-1.5 px-4" href={`/retreat/${retreat.id}`}>
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">You haven't saved any retreats yet.</p>
          )}
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
    // eslint-disable-next-line no-unused-vars
    const response = await handleUpdateProfile(e, form);
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    First Name
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-200"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  disabled></input>
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

export default Dashboard;
