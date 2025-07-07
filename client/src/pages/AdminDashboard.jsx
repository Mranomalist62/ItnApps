import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../services/AuthService";
import { handleUpdateProfile } from "../services/UserService";
import { handleAddRetreat, handleEditRetreat, ShowRetreatsById } from "../services/RetreatService";
import { FilterSearchRetreat } from "./Retreat";
import { ShowAllRetreats } from "../services/RetreatService";

const AdminDashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedRetreatId, setSelectedRetreatId] = useState(null);
  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "",
    member_since: "",
    profile_picture: "",
  });
  useEffect(() => {
    if (storedUser) {
      if (parsedUser.role !== "admin") {
        navigate("/profile");
      }
    }
  }, []);
  useEffect(() => {
    if (storedUser) {
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
              <NavItem
                icon="❤️"
                label="Manage Retreats"
                active={activeMenu === "Manage Retreats" || activeMenu === "Retreat Form"}
                onClick={() => setActiveMenu("Manage Retreats")}
              />
              <NavItem icon="⚙️" label="Settings" active={activeMenu === "Settings"} onClick={() => setActiveMenu("Settings")} />
            </ul>
            <ul className="space-y-2 pt-2 border-t border-gray-500">
              <NavItem icon="🌋" label="Nemo Out" active={activeMenu === "Sign Out"} onClick={() => handleLogout(setIsLoggedIn, navigate)} />
            </ul>
          </section>
        </div>
        {activeMenu == "Dashboard" && <DashboardMenu />}
        {activeMenu == "Manage Retreats" && <ManageMenu setActiveMenu={setActiveMenu} setSelectedRetreatId={setSelectedRetreatId} />}
        {activeMenu == "Settings" && <SettingMenu userData={userData} />}
        {activeMenu == "Retreat Form" && <RetreatForm setActiveMenu={setActiveMenu} />}
        {activeMenu == "Edit Form" && <EditRetreatForm setActiveMenu={setActiveMenu} selectedRetreatId={selectedRetreatId} />}
      </div>
    </div>
  );
};

const ManageMenu = ({ setActiveMenu, setSelectedRetreatId }) => {
  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-xl shadow-soft p-6 animate-fadeIn shadow-sm ">
        <h2 className="text-2xl font-display font-bold mb-3">Manage Retreats</h2>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-3"
          onClick={() => setActiveMenu("Retreat Form")}>
          Add Retreat
        </button>
        <FilterSearchRetreat setActiveMenu={setActiveMenu} setSelectedRetreatId={setSelectedRetreatId} retreatFetch={ShowAllRetreats} />
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
                  <img
                    alt={userData.first_name + " " + userData.last_name}
                    loading="lazy"
                    width="128"
                    height="128"
                    decoding="async"
                    data-nimg="1"
                    className="object-cover"
                    style={{ color: "transparent" }}
                    src={"http://localhost:5000/api/users/image/" + userData.profile_picture}></img>
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
    <div className="md:col-span-3">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-wellness-sage/20">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="tracking-tight text-sm font-medium text-wellness-sage">Total Retreats</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin h-4 w-4 text-wellness-sage">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-wellness-forest">247</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-wellness-sage/20">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="tracking-tight text-sm font-medium text-wellness-sage">Total Users</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users h-4 w-4 text-wellness-ocean">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-wellness-forest">1,429</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-wellness-sage/20">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="tracking-tight text-sm font-medium text-wellness-sage">Itinerary Ever Added</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar h-4 w-4 text-wellness-forest">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-wellness-forest">89</div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-wellness-sage/20">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-wellness-forest">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-activity h-5 w-5">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                </svg>
                Recent Activity
              </div>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="flex items-center gap-3 m-0 p-3 rounded-lg bg-wellness-sage/5">
                <div className="h-2 w-2 rounded-full bg-wellness-ocean"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-wellness-forest">New retreat added</p>
                  <p className="text-xs text-wellness-sage">Himalayan Mindfulness Retreat</p>
                </div>
                <span className="text-xs text-wellness-sage">2h ago</span>
              </div>
              <div className="flex items-center gap-3 m-0 p-3 rounded-lg bg-wellness-sage/5">
                <div className="h-2 w-2 rounded-full bg-wellness-sage"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-wellness-forest">User registered</p>
                  <p className="text-xs text-wellness-sage">sarah.wellness@email.com</p>
                </div>
                <span className="text-xs text-wellness-sage">4h ago</span>
              </div>
              <div className="flex items-center gap-3 m-0 p-3 rounded-lg bg-wellness-sage/5">
                <div className="h-2 w-2 rounded-full bg-wellness-forest"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-wellness-forest">Booking confirmed</p>
                  <p className="text-xs text-wellness-sage">Bali Wellness Retreat</p>
                </div>
                <span className="text-xs text-wellness-sage">6h ago</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-wellness-sage/20">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-wellness-forest">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up h-5 w-5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                Top Destinations
              </div>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-wellness-sage/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-ocean text-white text-sm font-medium">1</div>
                  <div>
                    <p className="text-sm font-medium text-wellness-forest">Bali Wellness Retreat</p>
                    <p className="text-xs text-wellness-sage">45 bookings</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-sm font-medium text-wellness-forest">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-wellness-sage/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-ocean text-white text-sm font-medium">2</div>
                  <div>
                    <p className="text-sm font-medium text-wellness-forest">Costa Rica Yoga Haven</p>
                    <p className="text-xs text-wellness-sage">38 bookings</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-sm font-medium text-wellness-forest">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-wellness-sage/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-ocean text-white text-sm font-medium">3</div>
                  <div>
                    <p className="text-sm font-medium text-wellness-forest">Swiss Alps Detox</p>
                    <p className="text-xs text-wellness-sage">32 bookings</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-sm font-medium text-wellness-forest">4.7</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-wellness-sage/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-ocean text-white text-sm font-medium">4</div>
                  <div>
                    <p className="text-sm font-medium text-wellness-forest">Thailand Meditation Center</p>
                    <p className="text-xs text-wellness-sage">28 bookings</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-yellow-400 text-yellow-400">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-sm font-medium text-wellness-forest">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RetreatForm = ({ setActiveMenu, selectedRetreatId = null }) => {
  const [imageData, setImageData] = useState([]);
  const [retreatsData, setRetreatsData] = useState({
    retreat_name: "",
    retreat_location: "",
    retreat_price: "",
    retreat_category: "",
    retreat_desc: "",
  });
  const [activitiesData, setActivitiesData] = useState([]);
  const [currentActivity, setCurrentActivity] = useState({
    id: "",
    activity_time: "",
    activity_name: "",
    activity_location: "",
    activity_desc: "",
  });
  useEffect(() => {
    const fetchRetreatDetails = async () => {
      try {
        const response = await ShowRetreatsById(selectedRetreatId);
        console.log(response);
        if (response) {
          // 1. Fill form fields
          setRetreatsData({
            retreat_name: response.name || "",
            retreat_location: response.location || "",
            retreat_price: response.price_usd || "",
            retreat_category: response.category?.id || "", // assuming category is an object
            retreat_desc: response.description || "",
          });

          // 2. Convert images to preview objects
          if (Array.isArray(response.images)) {
            const loadedImages = response.images.map((img) => ({
              imageName: img.image_url,
              imageFile: null, // no file object because it came from backend
              preview: `http://localhost:5000/api/retreats/image/${img.image_url}`,
            }));
            setImageData(loadedImages);
          }

          // 3. Activities (assuming activities array is available)
          if (Array.isArray(response.activities)) {
            const formattedActivities = response.activities.map((a) => ({
              id: Date.now() + Math.random(), // or a.uuid if exists
              activity_time: a.time || "",
              activity_name: a.title || "",
              activity_location: a.location || "",
              activity_desc: a.description || "",
            }));
            setActivitiesData(formattedActivities);
          }
        }
      } catch (err) {
        console.error("Error loading retreat for editing:", err);
      }
    };

    if (selectedRetreatId) {
      fetchRetreatDetails();
    }
  }, [selectedRetreatId]);

  useEffect(() => {
    return () => {
      imageData.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [imageData]);
  const isActivityEmpty =
    currentActivity.activity_time === "" ||
    currentActivity.activity_name === "" ||
    currentActivity.activity_location === "" ||
    currentActivity.activity_desc === "";
  const addActivity = () => {
    const updatedActivity = {
      ...currentActivity,
      id: Date.now(),
    };
    setActivitiesData([...activitiesData, updatedActivity]);
    setCurrentActivity({
      id: "",
      activity_time: "",
      activity_name: "",
      activity_location: "",
      activity_desc: "",
    });
  };
  const deleteActivity = (id) => {
    setActivitiesData(activitiesData.filter((activity) => activity.id !== id));
  };
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      imageName: file.name,
      imageFile: file,
      preview: URL.createObjectURL(file),
    }));
    setImageData([...imageData, ...newImages]);
  };
  const handleActivityChange = (e) => {
    setCurrentActivity({ ...currentActivity, [e.target.name]: e.target.value });
  };
  const handleRetreatChange = (e) => {
    setRetreatsData({ ...retreatsData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "retreatsData",
      JSON.stringify({
        retreat_name: retreatsData.retreat_name,
        retreat_location: retreatsData.retreat_location,
        retreat_price: retreatsData.retreat_price,
        retreat_category: retreatsData.retreat_category,
        retreat_desc: retreatsData.retreat_desc,
      })
    );
    formData.append(
      "activitiesData",
      JSON.stringify(
        activitiesData.map((activity) => ({
          activity_name: activity.activity_name,
          activity_time: activity.activity_time,
          activity_location: activity.activity_location,
          activity_desc: activity.activity_desc,
        }))
      )
    );
    imageData.forEach((img) => {
      formData.append("images", img.imageFile);
    });
    const response = selectedRetreatId ? handleEditRetreat(selectedRetreatId, formData) : handleAddRetreat(formData);
    if (response) {
      setActiveMenu("Manage Retreats");
    }
  };

  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-xl shadow-soft p-6 animate-fadeIn">
        <h2 className="text-2xl font-display font-bold mb-4">Retreats Form</h2>
        <button
          onClick={() => setActiveMenu("Manage Retreats")}
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-8 mb-4 text-black"
          type="button">
          <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
          </svg>
          Back to Manage
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <div className="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple accept="image/*" onChange={handleFilesChange} />
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {imageData.map((img, index) => (
                      <div key={index} style={{ margin: "10px" }}>
                        <img src={img.preview} alt={img.imageName} style={{ width: "100px", height: "auto" }} />
                        <p>{img.imageName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label for="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Retreat Title
                </label>
                <input
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="text"
                  name="retreat_name"
                  value={retreatsData.retreat_name}
                  onChange={handleRetreatChange}
                  required></input>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    type="text"
                    name="retreat_location"
                    value={retreatsData.retreat_location}
                    onChange={handleRetreatChange}
                    required></input>
                </div>
                <div>
                  <label for="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-lg text-white border rounded-e-0 border-e-0 rounded-s-md bg-gray-600 border-gray-600">
                      $
                    </span>
                    <input
                      type="text"
                      name="retreat_price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={retreatsData.retreat_price}
                      onChange={handleRetreatChange}
                      required></input>
                  </div>
                </div>
              </div>
              <div>
                <label for="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  onChange={handleRetreatChange}
                  required
                  defaultValue={"1"}
                  name="retreat_category"
                  value={retreatsData.retreat_category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="1">Yoga</option>
                  <option value="2">Spa</option>
                  <option value="3">Luxury</option>
                  <option value="4">Adventure</option>
                  <option value="5">Surfing</option>
                  <option value="6">Cultural</option>
                  <option value="7">Meditation</option>
                  <option value="8">Wellness</option>
                  <option value="9">Detox</option>
                </select>
              </div>
              <div>
                <label for="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Retreat Description
                </label>
                <textarea
                  id="location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  type="text"
                  name="retreat_desc"
                  value={retreatsData.retreat_desc}
                  onChange={handleRetreatChange}></textarea>
              </div>

              {/* Add Activity */}

              <div>
                <h4 className="font-medium text-wellness-forest mb-3">Add New Activity</h4>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-wellness-sage/20"
                    type="time"
                    name="activity_time"
                    onChange={handleActivityChange}
                    value={currentActivity.activity_time}></input>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-wellness-sage/20"
                    placeholder="Activity title"
                    type="text"
                    name="activity_name"
                    onChange={handleActivityChange}
                    value={currentActivity.activity_name}></input>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-wellness-sage/20"
                    placeholder="Location"
                    type="text"
                    name="activity_location"
                    onChange={handleActivityChange}
                    value={currentActivity.activity_location}></input>
                </div>
                <div className="mt-3">
                  <textarea
                    onChange={handleActivityChange}
                    className="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-wellness-sage/20"
                    placeholder="Activity description"
                    name="activity_desc"
                    value={currentActivity.activity_desc}></textarea>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 mt-3 bg-wellness-sage hover:bg-blue bg-black text-white"
                  type="button"
                  onClick={() => addActivity()}
                  disabled={isActivityEmpty}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus h-4 w-4 mr-2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  Add Activity
                </button>
                <div className="space-y-3 pt-4">
                  {activitiesData.map((activity) => (
                    <div key={activity.id}>
                      <ActivityItem data={activity} function1={() => deleteActivity(activity.id)} />
                    </div>
                  ))}
                </div>
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

const EditRetreatForm = ({ setActiveMenu, selectedRetreatId }) => {
  return <RetreatForm setActiveMenu={setActiveMenu} selectedRetreatId={selectedRetreatId} />;
};

// Reusable Components
const NavItem = ({ icon, label, active, onClick }) => (
  <li onClick={onClick} className={`flex items-center p-2 rounded-lg cursor-pointer transition ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}>
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </li>
);

const ActivityItem = ({ data, function1 }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg border border-wellness-sage/10 bg-white">
    <div className="flex items-center gap-2 text-wellness-sage min-w-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-clock h-5 w-5">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span className="text-sm font-medium">{data.activity_time}</span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-medium text-wellness-forest">{data.activity_name}</h4>
          <p className="text-sm text-wellness-sage mt-1">{data.activity_desc}</p>
          <div className="flex items-center gap-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin h-5 w-5 text-wellness-sage">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs text-wellness-sage">{data.activity_location}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => function1()}
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground rounded-md h-8 w-8 p-0 text-red-500 hover:bg-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash2 h-5 w-5">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
