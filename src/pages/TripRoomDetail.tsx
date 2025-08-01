import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Calendar, Star, Shield } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getTripRoom, joinTripRoom, type TripRoom } from "@/data/tripRooms";

const TripRoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hasJoined, setHasJoined] = useState(false);
  // const [tripRoom, setTripRoom] = useState<TripRoom | null>(null);

 const [tripRoom, setTripRoom] = useState(null);
const [loading, setIsLoading] = useState(true);
// console.log("Trip Rooms:", tripRooms);
useEffect(() => {
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:6080/api/triprooms/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched trip room:", data);
      setTripRoom(data);
    } catch (error) {
      console.error("Error fetching trip room:", error);
      // Use mock data as fallback
      setTripRoom({
        id: id,
        destination: 'Goa Beach Adventure',
        dates: 'Jan 15-20, 2025',
        budget: '₹25,000',
        spotsLeft: 3,
        totalSpots: 8,
        vibe: ['Beach', 'Party', 'Adventure'],
        expiresIn: 8,
        price: 25000,
        itinerary: [
          'Day 1: Arrival and Beach Party',
          'Day 2: Water Sports',
          'Day 3: Old Goa Tour'
        ],
        safetyFeatures: ['Verified Organizer', 'Insurance Included', '24/7 Support'],
        organizer: {
          name: 'Adventure Seeker',
          avatar: 'https://ui-avatars.com/api/?name=Adventure+Seeker',
          rating: 4.8,
          verified: true,
          completedTrips: 12
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchRooms();
}, [id]);

if (loading) {
  return <div className="p-6 text-center">Loading trip room details...</div>;
}

  const handleJoinRoom = async () => {
    if (id && tripRoom && tripRoom.spotsLeft > 0) {
      try {
        // Update the local state immediately for better UX
        setTripRoom(prev => prev ? { ...prev, spotsLeft: prev.spotsLeft - 1 } : null);
        setHasJoined(true);
        
        // Call API to update the database
        const response = await fetch(`http://localhost:6080/api/triprooms/${id}/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'current-user-id', // This should come from auth context
            action: 'join'
          })
        });
        
        if (!response.ok) {
          // Revert the local state if API call fails
          setTripRoom(prev => prev ? { ...prev, spotsLeft: prev.spotsLeft + 1 } : null);
          setHasJoined(false);
          console.error('Failed to join room');
        }
      } catch (error) {
        console.error('Error joining room:', error);
        // Revert the local state if API call fails
        setTripRoom(prev => prev ? { ...prev, spotsLeft: prev.spotsLeft + 1 } : null);
        setHasJoined(false);
      }
    }
  };

  if (!tripRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Room Not Found</h1>
          <Link to="/flash-trip-rooms">
            <Button>← Back to Trip Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Generate mock members based on trip room data
  const members = [
    { name: tripRoom.organizer.name, role: "Organizer", rating: tripRoom.organizer.rating },
    ...Array.from({ length: tripRoom.totalSpots - tripRoom.spotsLeft - 1 }, (_, i) => ({
      name: `Member ${i + 1}`,
      role: "Member",
      rating: 4.5 + Math.random() * 0.5
    }))
  ];

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
                      <span>{tripRoom.dates}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Expires in {tripRoom.expiresIn} hours</span>
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
                  <div className="text-2xl font-bold text-blue-600">₹{tripRoom.price}</div>
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
                {tripRoom.itinerary?.map((day, index) => (
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
                {tripRoom.safetyFeatures?.map((feature, index) => (
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
                <div className="text-3xl font-bold text-orange-600 mb-2">₹{tripRoom.price}</div>
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
                  Join Room - ₹{tripRoom.price}
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
                      <span>{tripRoom.organizer.rating} • {tripRoom.organizer.completedTrips || 0} trips</span>
                    </div>
                  </div>
              </div>
              <Link to={`/profile/${tripRoom.organizer.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </Card>

            {/* Current Members */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Members</h3>
              <div className="space-y-3">
                {members.map((member, index) => (
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