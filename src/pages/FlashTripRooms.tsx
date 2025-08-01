import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Zap, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const FlashTripRooms = () => {
const [tripRooms, setTripRooms] = useState(null);
const [loading, setIsLoading] = useState(true);
const [joinedRooms, setJoinedRooms] = useState(new Set());
const [showChat, setShowChat] = useState(false);
const [chatMessage, setChatMessage] = useState('');
const [selectedRoom, setSelectedRoom] = useState(null);

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
      setTripRooms(data);
    } catch (error) {
      console.error("Error fetching trip rooms:", error);
      // Use mock data as fallback
      setTripRooms([
        {
          _id: '1',
          destination: 'Ladakh, India',
          expiresIn: 12,
          spotsLeft: 3,
          totalSpots: 8,
          budget: '₹25,000',
          vibe: ['Adventure', 'Mountains', 'Culture'],
          organizer: {
            name: 'Adventure Seeker',
            rating: 4.8
          },
          id: '1'
        },
        {
          _id: '2',
          destination: 'Goa, India',
          expiresIn: 8,
          spotsLeft: 2,
          totalSpots: 6,
          budget: '₹15,000',
          vibe: ['Beach', 'Party', 'Relaxation'],
          organizer: {
            name: 'Beach Lover',
            rating: 4.5
          },
          id: '2'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchRooms();
}, []);

if (loading) {
  return <div className="p-6 text-center">Loading trip rooms...</div>;
}


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
          {tripRooms.map((room) => {
            const isJoined = joinedRooms.has(room._id);
            const updatedSpotsLeft = isJoined ? room.spotsLeft - 1 : room.spotsLeft;
            
            return (
            <Card key={room._id} className="p-6 bg-white/70 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{room.destination}</h3>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  <Clock className="w-3 h-3 mr-1" />
                  {room.expiresIn} hours left
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-orange-600">{updatedSpotsLeft} spots left</span>
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
                    <p className="font-semibold">{room.organizer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold text-green-600">⭐ {room.organizer.rating}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isJoined ? (
                    <>
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowChat(true);
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Chat with Group
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => {
                        setJoinedRooms(prev => new Set([...prev, room._id]));
                      }}
                      disabled={updatedSpotsLeft === 0}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {updatedSpotsLeft === 0 ? 'Room Full' : 'Join Room'}
                    </Button>
                  )}
                </div>

                <p className="text-xs text-red-600 mt-2 text-center">
                  Expires: {room.expiresIn} hours
                </p>
              </div>
            </Card>
          );
        })}
        </div>

        {/* Create Room CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-orange-100 to-blue-100 border-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your Own Flash Trip Room
          </h3>
          <p className="text-gray-600 mb-6">
            Have a spontaneous trip idea? Create a room and find travel buddies instantly!
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8" onClick={() => window.location.href = "/flash-trip-rooms/new"}>
            Create Trip Room
          </Button>
        </Card>
      </div>

      {/* Chat Dialog */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRoom ? `Chat - ${selectedRoom.destination}` : 'Group Chat'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                    <p className="text-sm">Hi everyone! Excited to join this trip! 🎉</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                    <p className="text-sm">Welcome! We're glad to have you on board! 👋</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                    <p className="text-sm">Let's discuss the itinerary and meeting point.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && chatMessage.trim()) {
                    // Handle send message
                    setChatMessage('');
                  }
                }}
              />
              <Button 
                onClick={() => {
                  if (chatMessage.trim()) {
                    // Handle send message
                    setChatMessage('');
                  }
                }}
                disabled={!chatMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlashTripRooms;