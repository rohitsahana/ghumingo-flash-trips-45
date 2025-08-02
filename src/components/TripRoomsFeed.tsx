
import TripRoom from "./TripRoom";
import { useEffect, useState } from "react";

const TripRoomsFeed = () => {

const [tripRooms, setTripRooms] = useState<any[]>([]);
const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:6080/api/triprooms/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched trip rooms:", data);
        setTripRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching trip rooms:", error);
        // Use mock data as fallback
        setTripRooms([
        {
          id: '1',
          destination: 'Goa Beach Adventure',
          dates: 'Jan 15-20, 2025',
          budget: '₹25,000',
          spotsLeft: 3,
          totalSpots: 8,
          vibe: ['Beach', 'Party', 'Adventure'],
          expiresIn: 8,
          price: 25000,
          organizer: {
            name: 'Adventure Seeker',
            avatar: 'https://ui-avatars.com/api/?name=Adventure+Seeker',
            rating: 4.8,
            verified: true,
            completedTrips: 12
          }
        },
        {
          id: '2',
          destination: 'Rishikesh River Rafting',
          dates: 'Feb 1-5, 2025',
          budget: '₹18,000',
          spotsLeft: 2,
          totalSpots: 6,
          vibe: ['Adventure', 'Nature', 'Thrilling'],
          expiresIn: 12,
          price: 18000,
          organizer: {
            name: 'River Explorer',
            avatar: 'https://ui-avatars.com/api/?name=River+Explorer',
            rating: 4.9,
            verified: true,
            completedTrips: 8
          }
        },
        {
          id: '3',
          destination: 'Kerala Backwaters',
          dates: 'Mar 10-15, 2025',
          budget: '₹30,000',
          spotsLeft: 4,
          totalSpots: 10,
          vibe: ['Culture', 'Relaxation', 'Photography'],
          expiresIn: 24,
          price: 30000,
          organizer: {
            name: 'Culture Explorer',
            avatar: 'https://ui-avatars.com/api/?name=Culture+Explorer',
            rating: 4.7,
            verified: false,
            completedTrips: 5
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchRooms();
}, []);

if (loading) {
  return <div className="p-6 text-center">Loading flash trip rooms...</div>;
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
            <TripRoom key={room.id || room._id || index} {...room} />
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
