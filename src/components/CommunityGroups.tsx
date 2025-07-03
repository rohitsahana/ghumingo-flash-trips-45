
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MapPin } from "lucide-react";

const CommunityGroups = () => {
  const groups = [
    {
      name: "Solo Female Travelers India",
      description: "A safe space for women to connect, share experiences, and plan group trips across India",
      members: 1247,
      location: "Pan India",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400",
      tags: ["Female Only", "Safety First", "Cultural Tours"],
      recentMembers: [
        "https://images.unsplash.com/photo-1494790108755-2616b1e5f0c7?w=40",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40"
      ]
    },
    {
      name: "Adventure Junkies",
      description: "For thrill-seekers who love trekking, mountaineering, river rafting, and extreme sports",
      members: 892,
      location: "Himalayas & Beyond",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400",
      tags: ["Extreme Sports", "Trekking", "High Altitude"],
      recentMembers: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40"
      ]
    },
    {
      name: "Budget Backpackers",
      description: "Travel more, spend less! Tips, tricks, and companions for budget-friendly adventures",
      members: 2156,
      location: "Worldwide",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400",
      tags: ["Budget Travel", "Backpacking", "Money Saving"],
      recentMembers: [
        "https://images.unsplash.com/photo-1494790108755-2616b1e5f0c7?w=40",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40"
      ]
    },
    {
      name: "Photography Wanderers",
      description: "Capture the world together! Perfect for photographers seeking travel companions",
      members: 734,
      location: "Scenic Destinations",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
      tags: ["Photography", "Scenic Routes", "Golden Hour"],
      recentMembers: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40"
      ]
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-orange-50/30 to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            Join Travel Communities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded travelers, share experiences, and discover your perfect travel tribe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <div className="relative h-48">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{group.name}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{group.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{group.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-orange-100 text-orange-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{group.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex -space-x-2">
                    {group.recentMembers.map((avatar, avatarIndex) => (
                      <Avatar key={avatarIndex} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600">+</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white">
                  Join Community
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            Explore All Communities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityGroups;
