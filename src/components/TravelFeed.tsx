
import TravelPost from "./TravelPost";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import TravelPostForm from "./ui/TravelPostForm";

const TravelFeed = () => {
   const [posts, setPosts] = useState<any[]>([]);
 const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:6080/api/travelposts/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched travel posts:", data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching travel posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div id="travel-stories" className="py-16 bg-white">
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
            <TravelPost key={post.id || post._id || index} {...post} />
          ))}
        </div>
<div className="p-6 text-center">
      {/* Toggle Button */}
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Travel Post"}
      </button>

      {/* Conditionally Render the Form */}
      {showForm && (
        <div className="mt-6">
          <TravelPostForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
    </div>
        <div className="text-center mt-12">
          <Link to="/travel-stories">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-md">
              Show More Stories
            </Button>
          </Link>
          <p className="text-gray-600 mt-4">
            Join our community to share your travel stories and discover new adventures
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelFeed;
