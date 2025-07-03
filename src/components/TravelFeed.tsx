
import TravelPost from "./TravelPost";
import { Link } from "react-router-dom";

const TravelFeed = () => {
  const posts = [
    {
      author: {
        name: "Rohit Kumar",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        verified: true,
        location: "Mumbai"
      },
      content: "Just returned from an incredible solo trip to Ladakh! The landscapes were breathtaking and I met some amazing fellow travelers. Looking for companions for my next adventure to Rajasthan!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      destination: "Ladakh",
      travelDate: "Nov 15-25, 2024",
      likes: 24,
      comments: 8,
      tags: ["solo-travel", "mountains", "photography", "adventure"]
    },
    {
      author: {
        name: "Sneha Reddy",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        verified: true,
        location: "Bangalore"
      },
      content: "Beach vibes and sunset chasing in Gokarna! Perfect weekend getaway with new friends I met through the platform. Already planning our next coastal adventure.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
      destination: "Gokarna",
      travelDate: "Dec 1-3, 2024",
      likes: 31,
      comments: 12,
      tags: ["beach", "weekend-trip", "sunset", "coastal"]
    },
    {
      author: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        verified: true,
        location: "Delhi"
      },
      content: "Spiritual journey to Varanasi with an incredible group of like-minded travelers. The experience was transformative and the connections made were priceless.",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600",
      destination: "Varanasi",
      travelDate: "Nov 20-23, 2024",
      likes: 18,
      comments: 6,
      tags: ["spiritual", "culture", "heritage", "group-travel"]
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Travel Stories & Connections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel experiences shared by our community and connect with fellow adventurers
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {posts.map((post, index) => (
            <TravelPost key={index} {...post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Join our community to share your travel stories and discover new adventures
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelFeed;
