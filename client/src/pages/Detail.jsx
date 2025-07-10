import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShowRetreatsById } from "../services/RetreatService";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Datepicker } from "flowbite-react";
import { handleCheckItinerary, handleCreateItinerary, handleUpdateItineraryRetreat } from "../services/ItineraryService";

const DetailPage = () => {
  const navigate = useNavigate();
  const retreat_id = useParams().id;
  const [hasItinerary, setHasItinerary] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [itineraryItem, setItineraryItem] = useState([]);
  const [retreatsData, setRetreatsData] = useState({
    retreat_name: "",
    retreat_location: "",
    retreat_price: "",
    retreat_category: "",
    retreat_desc: "",
  });
  const [activitiesData, setActivitiesData] = useState([]);
  const checkUserItinerary = async () => {
    const response = await handleCheckItinerary();
    if (response?.hasItinerary && response?.items) {
      setHasItinerary(true);
      const items = Array.isArray(response.items) ? response.items : [response.items];
      console.log(items);
      setItineraryItem(
        items.map((item) => ({
          id: item.id,
          retreat_name: item.retreat != null ? item.retreat.name : "",
          itinerary_Id: item.itinerary_Id,
          retreat_id: item.retreat_id,
          planned_date: item.planned_date,
        }))
      );
    }
  };
  const fetchRetreatDetails = async () => {
    try {
      const response = await ShowRetreatsById(retreat_id);
      if (response) {
        setRetreatsData({
          retreat_name: response.name || "",
          retreat_location: response.location || "",
          retreat_price: response.price_idr || "",
          retreat_category: response.category?.name || "",
          retreat_desc: response.description || "",
        });
        document.title = response.name;
        setCurrentIndex(0);

        if (Array.isArray(response.images)) {
          const loadedImages = response.images.map((img) => ({
            imageName: img.image_url,
            imageFile: null,
            preview: `http://localhost:5000/api/retreats/image/${img.image_url}`,
          }));
          setImageData(loadedImages);
        }

        if (Array.isArray(response.activities)) {
          const formattedActivities = response.activities.map((a) => ({
            activity_name: a.title || "",
          }));
          setActivitiesData(formattedActivities);
        }
      }
    } catch (err) {
      console.error("Error loading retreat:", err);
    }
  };
  useEffect(() => {
    checkUserItinerary();
    fetchRetreatDetails();
  }, []);

  useEffect(() => {
    return () => {
      imageData.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [imageData]);
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageData.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageData.length - 1 ? 0 : prev + 1));
  };
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <a className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8" onClick={() => navigate("/retreats")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-left">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>Back to Retreats</span>
      </a>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <div className="relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <img
              alt="Ocean Bliss Wellness Center"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover"
              style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
              src={imageData.length > 0 && imageData[currentIndex].preview}></img>
            {/* This is the preview image. use img.preview */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-all"
              aria-label="Previous image">
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
                className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              {/* to go to previous image */}
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-all"
              aria-label="Next image">
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
                className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              {/* to go to next image */}
            </button>
          </div>
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {imageData.map((img, index) => (
              <button onClick={() => handleThumbnailClick(index)} key={index} className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  alt={img.imageName}
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className={`object-cover ${currentIndex == index ? `border-2 border-sky-700` : ``}`}
                  style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                  src={img.preview}></img>
              </button>
              // If clicked, it will change the preview image
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{retreatsData.retreat_name}</h1>
          <div className="flex items-center text-blue-700 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin mr-2">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-lg">{retreatsData.retreat_location}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 shadow-sm p-3 rounded-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tag mx-auto mb-1 text-blue-600">
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              <span className="block text-sm text-gray-500">Category</span>
              <span className="font-medium">{retreatsData.retreat_category}</span>
            </div>
            <div className="bg-blue-50 shadow-sm p-3 rounded-lg text-center">
              <svg
                className="w-6 h-6 lucide lucide-clock mx-auto mb-1 text-blue-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                />
              </svg>

              <span className="block text-sm text-gray-500">Price</span>
              <span className="font-medium">{formatToIDR(retreatsData.retreat_price)}</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">About This Retreat</h2>
            <p className="text-gray-700">{retreatsData.retreat_desc}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Daily Activities</h2>
            <ul className="space-y-2">
              {activitiesData.map((activity, index) => (
                <li className="flex items-start" key={index}>
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full mr-3 flex-shrink-0 text-sm font-medium">
                    {index + 1}
                  </span>
                  <span>{activity.activity_name}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => {
              hasItinerary ? setOpenModal2(true) : setOpenModal(true);
            }}
            type="button"
            className="rounded-md font-semibold bg-sky-400 hover:bg-sky-500 w-full py-3 text-center text-lg flex items-center justify-center">
            Add to Itinerary
          </button>
          <MakeItineraryMenu
            openModal={openModal}
            setOpenModal={setOpenModal}
            setOpenModal2={setOpenModal2}
            setHasItinerary={setHasItinerary}
            checkUserItinerary={checkUserItinerary}
          />
          <InsertItineraryMenu openModal2={openModal2} setOpenModal2={setOpenModal2} itineraryItem={itineraryItem} retreat_id={retreat_id} checkUserItinerary={checkUserItinerary}/>
        </div>
      </div>
    </div>
  );
};

export const MakeItineraryMenu = ({ openModal, setOpenModal, setOpenModal2 = null, setHasItinerary = false, checkUserItinerary = null }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleSubmit = async () => {
    const response = await handleCreateItinerary(dateRange);
    if (response === true) {
      setHasItinerary(true);
      checkUserItinerary()
      setTimeout(() => {
        setOpenModal(false);
        if (setOpenModal2) {
          setOpenModal2(true);
        }
      }, 1000);
    }
  };
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>Set My Itinerary</ModalHeader>
      <ModalBody className="overflow-visible">
        <div className="md:flex md:items-center">
          <Datepicker
            className="sm:mb-4 md:mb-0"
            value={dateRange.startDate}
            onChange={(date) => {
              const { endDate } = dateRange;
              setDateRange({
                startDate: date,
                endDate: endDate < date ? date : endDate,
              });
            }}
          />
          <span className="mx-4 text-gray-500">until</span>
          <Datepicker
            className="sm:mt-4 md:mt-0"
            value={dateRange.endDate}
            onChange={(date) =>
              setDateRange((prev) => ({
                ...prev,
                endDate: date,
              }))
            }
          />
        </div>
        <button type="button" className="mt-4" onClick={() => setDateRange({ startDate: new Date(), endDate: new Date() })}>
          Reset Date
        </button>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Accept</Button>
        <Button color="alternative" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const InsertItineraryMenu = ({ openModal2, setOpenModal2, itineraryItem, retreat_id, checkUserItinerary }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const formatted = (planned_date) => {
    const date = new Date(planned_date);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };
  const handleUpdate = async () => {
    if (!selectedItemId) return;
    const result = await handleUpdateItineraryRetreat(selectedItemId, retreat_id);
    if (result?.item) {
      checkUserItinerary();
      setOpenModal2(false);
    }
  };
  return (
    <Modal dismissible show={openModal2} onClose={() => setOpenModal2(false)}>
      <ModalHeader>Choose Itinerary Date</ModalHeader>
      <ModalBody className="overflow-visible p-4">
        {itineraryItem.map((item, index) => {
          const isSame = item.retreat_id == retreat_id;
          return (
            <div key={item.id} className="flex my-1 items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
              <input
                id={`radio-${item.id}`}
                type="radio"
                value={item.id}
                name="bordered-radio"
                disabled={isSame}
                onChange={() => setSelectedItemId(item.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`radio-${item.id}`} className={`w-full py-3 ms-2 text-sm font-medium ${isSame ? "text-gray-500 line-through" : "text-black"}`}>
                {`Day ${index + 1} - ${formatted(item.planned_date)} ${item.retreat_name && ` (${item.retreat_name})`}`}
              </label>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter className=" p-4">
        <Button disabled={!selectedItemId} onClick={handleUpdate}>
          Accept
        </Button>
        <Button color="alternative" onClick={() => setOpenModal2(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetailPage;
