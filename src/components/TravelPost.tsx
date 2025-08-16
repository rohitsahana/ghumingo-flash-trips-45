
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, MapPin, Calendar, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";



const TravelPost = (posts: any) => {
  const { user } = useAuth();
  const { toast } = useToast();
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
          tripId: posts.id || posts._id,
          tripType: 'travel_post',
          organizerId: posts.author?.id || 'unknown',
          message: `Interested in joining this trip to ${posts.destination}`
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

  // console.log("TravelPost component received posts:", posts,posts.author);
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Author header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={posts.author.avatar} />
            <AvatarFallback>{posts.author.name}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{posts.author.name}</span>
              {posts.author.verified && (
                <Badge className="bg-green-100 text-green-800 text-xs">✓ Verified</Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {posts.author.location}
            </div>
          </div>
        </div>
        <Link to={`/messaging/${posts.author.name}`}>
          <Button variant="outline" size="sm" className="text-orange-600 border-orange-300 hover:bg-orange-50">
            Connect
          </Button>
        </Link>
      </div>

      {/* Travel image */}
      <div className="relative">
        <img 
          src={posts.image} 
          alt={posts.destination}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800">
            <MapPin className="w-3 h-3 mr-1" />
            {posts.destination}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-3">{posts.content}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          Travel Date: {posts.travelDate}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {posts.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
              <Heart className="w-4 h-4 mr-1" />
              {posts.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
              <MessageSquare className="w-4 h-4 mr-1" />
              {posts.comments}
            </Button>
          </div>
          {hasShownInterest ? (
            <Button size="sm" disabled className="bg-green-500 text-white">
              <UserPlus className="w-4 h-4 mr-1" />
              Interest Shown
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white"
              onClick={handleShowInterest}
              disabled={showingInterest}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              {showingInterest ? 'Showing Interest...' : 'Show Interest'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TravelPost;
