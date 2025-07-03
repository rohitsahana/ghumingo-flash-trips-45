import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const FlashTripRooms = () => {
  const [tripRooms] = useState([
    {
      id: 1,
      destination: "Goa Beach Getaway",
      departsIn: "18 hours",
      spotsLeft: 2,
      totalSpots: 6,
      budget: "₹8,000",
      vibe: ["Beach", "Party", "Relaxing"],
      organizer: "Priya K.",
      rating: 4.8,
      expires: "Tomorrow 6 PM"
    },
    {
      id: 2,
      destination: "Himalayan Trek",
      departsIn: "6 hours",
      spotsLeft: 1,
      totalSpots: 4,
      budget: "₹12,000",
      vibe: ["Adventure", "Nature", "Photography"],
      organizer: "Arjun M.",
      rating: 4.9,
      expires: "Today 11 PM"
    },
    {
      id: 3,
      destination: "Rajasthan Cultural Tour",
      departsIn: "2 days",
      spotsLeft: 4,
      totalSpots: 8,
      budget: "₹15,000",
      vibe: ["Culture", "History", "Food"],
      organizer: "Kavya S.",
      rating: 4.7,
      expires: "Friday 8 AM"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-sm px-3 py-1 mb-4">
            ⚡ FLASH TRIP ROOMS - LIVE NOW!
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flash Trip Rooms
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join spontaneous adventures that expire in 12-24 hours. Limited seats, verified travelers, instant connections.
          </p>
        </div>

        {/* Trip Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tripRooms.map((room) => (
            <Card key={room.id} className="p-6 bg-white/70 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{room.destination}</h3>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  <Clock className="w-3 h-3 mr-1" />
                  {room.departsIn}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-orange-600">{room.spotsLeft} spots left</span>
                  <span className="ml-1">of {room.totalSpots}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Budget: {room.budget} per person</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {room.vibe.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Organized by</p>
                    <p className="font-semibold">{room.organizer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-green-600">⭐ {room.rating}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/trip-room/${room.id}`} className="flex-1">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Join Room
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-red-600 mt-2 text-center">
                  Expires: {room.expires}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Room CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-orange-100 to-blue-100 border-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your Own Flash Trip Room
          </h3>
          <p className="text-gray-600 mb-6">
            Have a spontaneous trip idea? Create a room and find travel buddies instantly!
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
            Create Trip Room
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FlashTripRooms;