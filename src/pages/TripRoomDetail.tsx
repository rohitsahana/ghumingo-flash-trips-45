import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Calendar, Star, Shield } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const TripRoomDetail = () => {
  const { id } = useParams();
  const [hasJoined, setHasJoined] = useState(false);

  const tripRoom = {
    id: 1,
    destination: "Goa Beach Getaway",
    departsIn: "18 hours",
    spotsLeft: 2,
    totalSpots: 6,
    budget: "₹8,000",
    vibe: ["Beach", "Party", "Relaxing"],
    organizer: {
      name: "Priya K.",
      rating: 4.8,
      completedTrips: 12,
      verified: true
    },
    expires: "Tomorrow 6 PM",
    itinerary: [
      "Day 1: Arrive in Goa, Check into beachside resort",
      "Day 2: North Goa beaches - Baga, Calangute, Anjuna",
      "Day 3: South Goa exploration - Palolem, Agonda beaches",
      "Day 4: Adventure activities - Parasailing, Jet ski",
      "Day 5: Departure"
    ],
    members: [
      { name: "Priya K.", role: "Organizer", rating: 4.8 },
      { name: "Amit S.", role: "Member", rating: 4.6 },
      { name: "Neha R.", role: "Member", rating: 4.9 },
      { name: "Rohan P.", role: "Member", rating: 4.7 }
    ],
    safetyFeatures: [
      "All members verified with government ID",
      "GPS tracking enabled during trip",
      "Emergency contact system",
      "24/7 support hotline"
    ]
  };

  const handleJoinRoom = () => {
    setHasJoined(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
        <Link to="/flash-trip-rooms">
          <Button variant="ghost">← Back to Rooms</Button>
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Header */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tripRoom.destination}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Departs in {tripRoom.departsIn}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Expires: {tripRoom.expires}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  <Clock className="w-3 h-3 mr-1" />
                  Flash Sale
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{tripRoom.spotsLeft}</div>
                  <div className="text-sm text-gray-600">Spots Left</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{tripRoom.budget}</div>
                  <div className="text-sm text-gray-600">Per Person</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tripRoom.vibe.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Itinerary */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Itinerary</h2>
              <div className="space-y-3">
                {tripRoom.itinerary.map((day, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{day}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Safety Features */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                Safety & Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tripRoom.safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">{tripRoom.budget}</div>
                <div className="text-gray-600">per person</div>
              </div>

              {hasJoined ? (
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    ✅ You've joined this room!
                  </Badge>
                  <p className="text-sm text-gray-600 mb-4">
                    Check your messages for group chat details
                  </p>
                  <Link to="/messaging/trip-room-1">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Open Group Chat
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  onClick={handleJoinRoom}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3"
                >
                  Join Room - {tripRoom.budget}
                </Button>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Spots remaining:</span>
                  <span className="font-semibold text-orange-600">{tripRoom.spotsLeft}/{tripRoom.totalSpots}</span>
                </div>
              </div>
            </Card>

            {/* Organizer Info */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Organizer</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  {tripRoom.organizer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">{tripRoom.organizer.name}</span>
                    {tripRoom.organizer.verified && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                    <span>{tripRoom.organizer.rating} • {tripRoom.organizer.completedTrips} trips</span>
                  </div>
                </div>
              </div>
              <Link to={`/profile/${tripRoom.organizer.name.replace(' ', '-').toLowerCase()}`}>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </Card>

            {/* Current Members */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Members</h3>
              <div className="space-y-3">
                {tripRoom.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{member.name}</div>
                        <div className="text-xs text-gray-600">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                      {member.rating}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripRoomDetail;