
import TripRoom from "./TripRoom";
import { Link } from "react-router-dom";

const TripRoomsFeed = () => {
  const tripRooms = [
    {
      destination: "Goa Beach Getaway",
      dates: "Dec 28-30, 2024",
      budget: "₹8,000-12,000",
      spotsLeft: 2,
      totalSpots: 6,
      organizer: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b1e5f0c7?w=150",
        rating: 4.8,
        verified: true
      },
      vibe: ["Beach", "Photography", "Nightlife", "Chill"],
      expiresIn: 8,
      price: 9500
    },
    {
      destination: "Manali Snow Adventure",
      dates: "Jan 5-8, 2025",
      budget: "₹15,000-20,000",
      spotsLeft: 1,
      totalSpots: 4,
      organizer: {
        name: "Arjun Patel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        rating: 4.9,
        verified: true
      },
      vibe: ["Adventure", "Snow", "Trekking", "Photography"],
      expiresIn: 4,
      price: 17000
    },
    {
      destination: "Rishikesh River Rafting",
      dates: "Jan 2-4, 2025",
      budget: "₹6,000-9,000",
      spotsLeft: 5,
      totalSpots: 8,
      organizer: {
        name: "Kavya Joshi",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        rating: 4.7,
        verified: true
      },
      vibe: ["Adventure", "Spiritual", "River Sports", "Yoga"],
      expiresIn: 12,
      price: 7500
    }
  ];

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
          {tripRooms.map((room, index) => (
            <TripRoom key={index} {...room} />
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
