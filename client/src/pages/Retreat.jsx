import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShowUserRetreats, ShowSearchedRetreats, handleDeleteRetreat, handleSaveRetreat, handleUnsaveRetreat } from "../services/RetreatService";

const Retreat = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Explore Our Retreats</h1>
        <p className="text-gray-600 mt-2">Discover a wide range of wellness experiences tailored to your needs and preferences.</p>
      </div>
      <FilterSearchRetreat />
    </div>
  );
};

const RetreatCard = ({ setActiveMenu, setSelectedRetreatId, data , getRetreats}) => {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaved = async () =>{
    const success = await handleSaveRetreat(data.retreat_id);
    if (success || success === 'already_saved') {
      console.log("Retreat saved or already saved");
      setIsSaved(true);
    } else {
      console.error("Failed to save retreat.");
    }
  }

  const handleEdit = () =>{
    setActiveMenu("Edit Form");
    setSelectedRetreatId(data.retreat_id);
  }

  const handleDelete = async () =>{
    const alert = confirm("Sangatkah yakin?");
    if(alert == true){
      const response = await handleDeleteRetreat(data.retreat_id);
      if(response){
        getRetreats();
      }
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  return(<div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl/30 transition-all duration-500 transform hover:-translate-y-1">
    <div className="relative h-56 md:h-64 overflow-hidden">
      <img
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
        src={"http://localhost:5000/api/retreats/image/" + data.retreat_cover}></img>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {/* <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">Featured</div> */}
      <div className="flex gap-1 absolute top-0 right-0">
      <button
        type="button"
        onClick={handleSaved}
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
      >
        {isSaved ? (
          // saved
          <svg
            className="w-6 h-6 text-pink-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
          </svg>
        ) : (
          //before saving
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
          </svg>
        )}
      </button>
        {isAdmin && (
          <button
            type="button"
            onClick={() => handleEdit()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm hover:text-accent-foreground rounded-md w-8 h-8 p-0 text-red-500 bg-red-50 hover:bg-red-300 m-1">
            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </button>
        )}

        {/* Delete Button - Only for Admins */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => handleDelete()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm hover:text-accent-foreground rounded-md w-8 h-8 p-0 text-red-500 bg-red-50 hover:bg-red-300 m-1">
            <svg className="w-6 h-6 text-red" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <a className="font-bold text-lg hover:underline" href="/retreat/1">
          View Details
        </a>
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center text-emerald-700 mb-2">
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
          className="lucide lucide-map-pin mr-1">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span className="text-sm">{data.retreat_location}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{data.retreat_name}</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-sm leading-5 bg-green-100 text-green-800 rounded-full p-2 font-semibold">{data.retreat_category}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-gray-900">${data.retreat_price}</span>
        </div>
        <a className="btn-outline text-sm py-1.5 px-4" href="/retreat/1">
          View Details
        </a>
      </div>
    </div>
  </div>);
};
export const FilterSearchRetreat = ({ setActiveMenu, setSelectedRetreatId, retreatFetch = ShowUserRetreats }) => {
  const url = useLocation();
  const params = new URLSearchParams(url.search);
  const initialLocation = params.get("location") || "";
  const [cardData, setCardData] = useState([]);
  const [searchData, setSearchData] = useState({
    name: "",
    location: initialLocation,
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const getRetreats = async () => {
    const response = await retreatFetch();
    console.log("Nemo");
    if (response && response.length > 0) {
      console.log(response);
      const formattedData = response.map((retreat) => ({
        retreat_id: retreat.id,
        retreat_location: retreat.location,
        retreat_name: retreat.name,
        retreat_category: retreat.category.name,
        retreat_price: retreat.price_usd,
        retreat_cover: retreat.images[0].image_url,
      }));
      setCardData(formattedData);
    }
  };
  useEffect(() => {
    if (initialLocation) {
      searchRetreats(); // run filtered
    } else {
        getRetreats(); // load all
    }
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const priceRanges = {
      Low: { minPrice: 0, maxPrice: 999 },
      Medium: { minPrice: 1000, maxPrice: 1500 },
      High: { minPrice: 1501, maxPrice: 99999 },
    };
    if (name === "price") {
      const range = priceRanges[value] || { minPrice: "", maxPrice: "" };
      setSearchData((prev) => ({
        ...prev,
        minPrice: range.minPrice,
        maxPrice: range.maxPrice,
      }));
    } else {
      setSearchData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const searchRetreats = async () => {
    const response = await ShowSearchedRetreats(searchData);
    if (response && response.length > 0) {
      console.log(response);
      const formattedData = response.map((retreat) => ({
        retreat_id: retreat.id,
        retreat_location: retreat.location,
        retreat_name: retreat.name,
        retreat_category: retreat.category.name,
        retreat_price: retreat.price_usd,
        retreat_cover: retreat.images[0].image_url,
      }));
      setCardData(formattedData);
    }
    else {
      console.log("nothing");
      setCardData([]);
    } 
  };
  return (
    <div>
      {/* Search */}
      <div className="mb-6 relative">
        <input
          type="text"
          name="name"
          id = "name"
          value = {searchData.name}
          onChange={handleChange}
          placeholder="Search retreats, activities, or locations..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            className="text-gray-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Location */}
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <select
              id="location"
              name="location"
              defaultValue={""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none">
              <option value="">All Locations</option>
              <option value="Bali">Bali</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bandung">Bandung</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">📍</div>
          </div>
        </div>

        {/* Category */}
        <div className="relative">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue={""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none">
                <option value="1">Relaxation</option>
                <option value="2">Health</option>
                <option value="3">Spiritual</option>
                <option value="4">Beauty</option>
                <option value="5">Detox</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">🧘</div>
          </div>
        </div>

        {/* Price Range */}
        <div className="relative">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="relative">
            <select
              id="price"
              name="price"
              defaultValue={""}
              onChange={handlePriceChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none">
              <option value="">All Prices</option>
              <option value="Low">Low (Under $1000)</option>
              <option value="Medium">Medium ($1000-$1500)</option>
              <option value="High">High (Above $1500)</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">💵</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="text-sm text-gray-500 hover:underline"
          onClick={() => {
            setSearchTerm("");
            setLocation("");
            setCategory("");
            setPriceRange("");
            setIsFilterApplied(false);
          }}>
          Clear all filters
        </button>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:from-blue-700 hover:to-teal-600 transition-all duration-300"
          onClick={searchRetreats}>
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.length > 0 ? (
          cardData.map((data) => (
            <div key={data.retreat_id}>
              <RetreatCard
                setActiveMenu={setActiveMenu}
                setSelectedRetreatId={setSelectedRetreatId}
                data={data}
                getRetreats={getRetreats}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            🐾 Nothing found.
          </div>
        )}
      </div>
    </div>
  );
};

const DeletePopup = () => {
  return (
    <div>
      <button
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Toggle modal
      </button>
      <div
        id="popup-modal"
        tabindex="-1"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Retreat;
