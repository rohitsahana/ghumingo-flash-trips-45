
import Hero from "@/components/Hero";
import TripRoomsFeed from "@/components/TripRoomsFeed";
import TravelFeed from "@/components/TravelFeed";
import CommunityGroups from "@/components/CommunityGroups";
import TrustSafety from "@/components/TrustSafety";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TripRoomsFeed />
      <TravelFeed />
      <CommunityGroups />
      <TrustSafety />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
              <span className="text-2xl font-bold">Ghumingo</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting travelers, creating memories, building trust.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 Ghumingo. Built for adventurous souls who believe in the magic of shared journeys.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
