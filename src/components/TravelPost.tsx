
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface TravelPostProps {
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    location: string;
  };
  content: string;
  image: string;
  destination: string;
  travelDate: string;
  likes: number;
  comments: number;
  tags: string[];
}

const TravelPost = ({
  author,
  content,
  image,
  destination,
  travelDate,
  likes,
  comments,
  tags
}: TravelPostProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Author header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{author.name}</span>
              {author.verified && (
                <Badge className="bg-green-100 text-green-800 text-xs">✓ Verified</Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {author.location}
            </div>
          </div>
        </div>
        <Link to={`/messaging/${author.name.replace(' ', '-').toLowerCase()}`}>
          <Button variant="outline" size="sm" className="text-orange-600 border-orange-300 hover:bg-orange-50">
            Connect
          </Button>
        </Link>
      </div>

      {/* Travel image */}
      <div className="relative">
        <img 
          src={image} 
          alt={destination}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800">
            <MapPin className="w-3 h-3 mr-1" />
            {destination}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-3">{content}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          Travel Date: {travelDate}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
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
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
              <MessageSquare className="w-4 h-4 mr-1" />
              {comments}
            </Button>
          </div>
          <Link to="/communities">
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white">
              Join Trip
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TravelPost;
