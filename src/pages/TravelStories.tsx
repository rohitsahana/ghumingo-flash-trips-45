import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Eye, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import TravelPostForm from "@/components/ui/TravelPostForm";
const TravelStories = () => {
  // const [stories, setStories] = useState([
  //   {
  //     id: 1,
  //     author: "Sarah Chen",
  //     location: "Santorini, Greece",
  //     title: "Sunset Chasing in the Greek Islands",
  //     content: "Just spent the most magical week island hopping in Greece. The sunsets in Oia were absolutely breathtaking! Looking for travel buddies for my next adventure to Morocco...",
  //     image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-200115-618833.jpg&fm=jpg",
  //     likes: 24,
  //     comments: 8,
  //     isLiked: false,
  //     lookingFor: "Morocco Adventure Partner",
  //     travelStyle: ["Photography", "Culture", "Adventure"],
  //     rating: 4.9
  //   },
  //   {
  //     id: 2,
  //     author: "Raj Patel",
  //     location: "Manali, India",
  //     title: "Solo Trekking in the Himalayas",
  //     content: "Completed the Beas Kund trek solo and it was incredible! The mountain views and solitude were exactly what I needed. Anyone interested in joining me for the Valley of Flowers trek next month?",
  //     image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-200115-618833.jpg&fm=jpg",
  //     likes: 18,
  //     comments: 12,
  //     isLiked: true,
  //     lookingFor: "Valley of Flowers Trek Buddy",
  //     travelStyle: ["Trekking", "Nature", "Meditation"],
  //     rating: 4.8
  //   },
  //   {
  //     id: 3,
  //     author: "Emma Rodriguez",
  //     location: "Kyoto, Japan",
  //     title: "Cherry Blossom Magic",
  //     content: "Timing was perfect for sakura season! Spent days wandering through temples and traditional gardens. The culture here is so rich. Planning a food tour through Southeast Asia next - who's in?",
  //     image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-200115-618833.jpg&fm=jpg",
  //     likes: 42,
  //     comments: 15,
  //     isLiked: false,
  //     lookingFor: "Southeast Asia Food Tour",
  //     travelStyle: ["Food", "Culture", "Photography"],
  //     rating: 4.7
  //   }
  // ]);
  // const [stories, setStories] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:6080/api/stories") // Adjust based on your backend URL
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStories(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch stories:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p className="text-center mt-10">Loading stories...</p>;
  const [stories, setStories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:6080/api/travel-posts");
        console.log("Fetched travel posts:", res.data);
        setStories(res.data);
      } catch (error) {
        console.error("Error fetching travel posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleLike = (storyId: string) => {
    setStories(stories.map(story => 
      story._id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? (story.likes || 1) - 1 : (story.likes || 0) + 1
          }
        : story
    ));
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Stories & Connections
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your travel experiences and find your next adventure buddy
          </p>
        </div>

        {/* Stories Feed */}
        <div className="max-w-2xl mx-auto space-y-6">
          {loading ? (
            <p className="text-center mt-10">Loading stories...</p>
          ) : stories.length === 0 ? (
            <p className="text-center mt-10">No travel stories found yet. Be the first to share yours!</p>
          ) : (
            stories.map((story) => (
              <Card key={story._id} className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                {/* Author Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {story.author?.avatar ? (
                      <img 
                        src={story.author.avatar} 
                        alt={story.author.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                        {story.author?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.author?.name || 'Unknown User'}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {story.author?.location || story.destination || 'Unknown Location'}
                      </div>
                    </div>
                  </div>
                  <Link to={`/profile/${story.author?.name?.replace(' ', '-').toLowerCase() || 'unknown'}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>

                {/* Story Content */}
                <div className="mb-4">
                  {story.image && (
                    <div><img src={story.image} alt={story.destination} className="w-full h-auto rounded-lg mb-4" /></div>
                  )}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{story.destination || 'Travel Story'}</h4>
                  <p className="text-gray-700 mb-3">{story.content}</p>
                  
                  {/* Travel Style Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {story.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Travel Date */}
                  {story.travelDate && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                      <p className="text-sm font-semibold text-blue-800 mb-1">Travel Date:</p>
                      <p className="text-blue-700">{story.travelDate}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(story._id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        story.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${story.isLiked ? 'fill-current' : ''}`} />
                      <span>{story.likes || 0}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{story.comments || 0}</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rating: ⭐ {story.author?.rating || 4.5}</span>
                    <Link to={`/messaging/${story.author?.name?.replace(' ', '-').toLowerCase() || 'unknown'}`}>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Connect
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Share Your Story CTA */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-orange-100 to-blue-100 border-none max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Travel Story
          </h3>
          <p className="text-gray-600 mb-6">
            Inspire others with your adventures and find your next travel buddy!
          </p>
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Share Story"}
          </Button>
          
          {/* Conditionally Render the Form */}
          {showForm && (
            <div className="mt-6">
              <TravelPostForm onSuccess={() => setShowForm(false)} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TravelStories;