
import TripRoom from "./TripRoom";
import { useEffect, useState } from "react";

const TripRoomsFeed = () => {

const [tripRooms, setTripRooms] = useState(null);
const [loading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchRooms = async () => {
    const res = await fetch("http://localhost:6080/api/triprooms/");
    const data = await res.json();
    console.log("Fetched trip rooms:", data,res);
    setTripRooms(data);
  };
  setIsLoading(false);
  fetchRooms();
}, []);
if (loading || !tripRooms) {
  return <div className="p-6 text-center">Loading profile... Profile</div>;
}

  return (
    <div className="py-16 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            ⚡ Flash Trip Rooms
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join spontaneous adventures with verified travelers. Limited spots, limited time!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tripRooms.slice(0, 3).map((room, index) => (
            // <div>{room.price}</div>
            // <div>Hi</div>
            <TripRoom {...room} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">More trip rooms available every hour</p>
          <div className="text-sm text-gray-500">
            🔔 Turn on notifications to never miss flash deals
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripRoomsFeed;
