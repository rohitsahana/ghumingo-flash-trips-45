
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Users, Star, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TripRoomProps {
  id: string;
  destination: string;
  dates: string;
  budget: string;
  spotsLeft: number;
  totalSpots: number;
  organizer: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  vibe: string[];
  expiresIn: number; // hours
  price: number;
}

const TripRoom = (room: TripRoomProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(room.expiresIn * 3600); // Convert hours to seconds
  const [showingInterest, setShowingInterest] = useState(false);
  const [hasShownInterest, setHasShownInterest] = useState(false);

  const handleShowInterest = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to show interest in trips",
        variant: "destructive",
      });
      return;
    }

    setShowingInterest(true);
    try {
      const response = await fetch('http://localhost:6080/api/user-trip-interests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          tripId: room.id || room._id,
          tripType: 'trip_room',
          organizerId: room.organizer?.id || 'unknown',
          message: `Interested in joining this trip to ${room.destination}`
        })
      });

      if (response.ok) {
        setHasShownInterest(true);
        toast({
          title: "Interest Shown!",
          description: "Your interest has been recorded. The organizer will be notified.",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to show interest",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to show interest:', error);
      toast({
        title: "Error",
        description: "Failed to show interest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowingInterest(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const urgencyColor = room.spotsLeft <= 2 ? "text-red-600" : room.spotsLeft <= 5 ? "text-orange-600" : "text-green-600";

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-white to-orange-50/30">
      {/* Header with urgency */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="animate-pulse">
            ⚡ {formatTime(timeLeft)} left
          </Badge>
          <Badge className={`${urgencyColor} bg-white border`}>
            {room.spotsLeft} spots left
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">₹{room.price}</div>
          <div className="text-sm text-gray-500">per person</div>
        </div>
      </div>

      {/* Destination */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <MapPin className="w-5 h-5 text-orange-500 mr-2" />
          {room.destination}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          {room.dates}
        </div>
        <div className="text-gray-600">Budget: {room.budget}</div>
      </div>

      {/* Organizer */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar>
          <AvatarImage src={room.organizer.avatar} />
          <AvatarFallback>{room.organizer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{room.organizer.name}</span>
            {room.organizer.verified && (
              <Badge className="bg-green-100 text-green-800 text-xs">✓ Verified</Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{room.organizer.rating}</span>
          </div>
        </div>
      </div>

      {/* Vibe tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {room.vibe.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Seats filled</span>
          <span>{room.totalSpots - room.spotsLeft}/{room.totalSpots}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((room.totalSpots - room.spotsLeft) / room.totalSpots) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Link to={`/trip-room/${room.id}`} className="flex-1">
          <Button 
            variant="outline"
            className="w-full font-semibold py-3"
            disabled={room.spotsLeft === 0}
          >
            {room.spotsLeft === 0 ? "Trip Full" : `View Details`}
          </Button>
        </Link>
        {hasShownInterest ? (
          <Button disabled className="bg-green-500 text-white">
            <UserPlus className="w-4 h-4 mr-1" />
            Interest Shown
          </Button>
        ) : (
          <Button 
            className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold py-3"
            onClick={handleShowInterest}
            disabled={showingInterest || room.spotsLeft === 0}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {showingInterest ? 'Showing Interest...' : 'Show Interest'}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TripRoom;
