
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">
            Ghumingo
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
              Sign up
            </Button>
          </Link>
          <div className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md">
            EN
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-sm px-3 py-1">
              🚀 FLASH TRAVEL ROOMS - LIVE NOW!
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Travel Together,
                <br />
                <span className="text-orange-500">Adventure Forever</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Join like-minded travelers, discover instant trip opportunities, 
                and explore safely with verified companions. From spontaneous 
                adventures to planned expeditions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/travel-stories">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-md w-full sm:w-auto"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/flash-trip-rooms">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-md w-full sm:w-auto"
                >
                  Browse Trip Rooms
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/51c3853b-6180-4f9e-82b7-cc5d29fbc5d0.png" 
                alt="Happy traveler with backpack" 
                className="w-full h-auto max-w-lg mx-auto"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 text-blue-500 opacity-70">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0L22.4 17.6L40 20L22.4 22.4L20 40L17.6 22.4L0 20L17.6 17.6L20 0Z"/>
                </svg>
              </div>
              
              <div className="absolute bottom-20 left-10 text-orange-500 opacity-70">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                  <path d="M15 0L16.8 13.2L30 15L16.8 16.8L15 30L13.2 16.8L0 15L13.2 13.2L15 0Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
            <div className="text-gray-600">Active Travelers</div>
          </Card>
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Trip Rooms Live</div>
          </Card>
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Verified Profiles</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
