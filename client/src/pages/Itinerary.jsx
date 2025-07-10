import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState, useEffect } from "react";
import { handleCheckItinerary } from "../services/ItineraryService";

const ItineraryMenu = () => {
  const [hasItinerary, setHasItinerary] = useState(false);
  const [itineraryItem, setItineraryItem] = useState([]);
  const formatted = (planned_date) => {
    const date = new Date(planned_date);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };
  const checkUserItinerary = async () => {
    const response = await handleCheckItinerary();
    console.log(response);
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
          activities: item.retreat != null ? item.retreat?.activities : null,
        }))
      );
    }
  };
  useEffect(() => {
    checkUserItinerary();
  }, []);
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmed) {
      const success = await handleDeleteItinerary(id);
      if (success) {
        checkUserItinerary();
        alert("Itinerary deleted!");
      }
    }
  };
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-wellness-forest">My Itinerary</h2>
        </div>
        {/* {!hasItinerary && (
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-wellness-sage hover:bg-wellness-forest text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus h-4 w-4 mr-2">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Add Itinerary
          </button>
        )} */}
      </div>
      <div className="space-y-6">
        <Accordion>
          {itineraryItem.map((item, index) => {
            const isFilled = item.retreat_id !== null && item.retreat_id !== "";
            return (
              <AccordionPanel key={item.id}>
                <AccordionTitle className="text-black">
                  {`Day ${index + 1} - ${formatted(item.planned_date)}${isFilled && item.retreat_name ? ` (${item.retreat_name})` : ""}`}
                </AccordionTitle>
                <AccordionContent>
                  {item.activities !== null ? (
                    item.activities.map((activity) => (
                      <div key={activity.id}>
                        <ActivityItem
                          activity={{
                            activity_time: activity.time,
                            activity_name: activity.title,
                            activity_desc: activity.description,
                            activity_location: activity.location,
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-black">Theres nothing here :|</p>
                  )}
                </AccordionContent>
              </AccordionPanel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  return (
    <div className="flex items-start gap-4 p-4 my-2 rounded-lg border border-wellness-sage/10 bg-white">
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
        <span className="text-sm font-medium">{activity.activity_time}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-medium text-wellness-forest">{activity.activity_name}</h4>
            <p className="text-sm text-wellness-sage mt-1">{activity.activity_desc}</p>
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
              <span className="text-xs text-wellness-sage">{activity.activity_location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryMenu;
