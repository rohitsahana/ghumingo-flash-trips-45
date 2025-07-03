import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Communities = () => {
  const [communities] = useState([
    {
      id: 1,
      name: "Himalayan Adventurers",
      members: 1250,
      description: "For those who live for mountain peaks and valley views",
      image: "/placeholder.svg",
      category: "Adventure",
      rating: 4.8,
      upcomingTrips: 12
    },
    {
      id: 2,
      name: "Beach Hoppers India",
      members: 890,
      description: "Coastal travels, beach parties, and sunset chasers",
      image: "/placeholder.svg",
      category: "Beach",
      rating: 4.6,
      upcomingTrips: 8
    },
    {
      id: 3,
      name: "Cultural Explorers",
      members: 2100,
      description: "Heritage sites, local cuisine, and authentic experiences",
      image: "/placeholder.svg",
      category: "Culture",
      rating: 4.9,
      upcomingTrips: 15
    }
  ]);

  const [travelPackages] = useState([
    {
      id: 1,
      title: "Golden Triangle Tour",
      agent: "Heritage Tours India",
      duration: "7 Days",
      places: ["Delhi", "Agra", "Jaipur"],
      price: "₹25,000",
      rating: 4.7,
      includes: ["Hotels", "Transport", "Guide", "Meals"],
      departure: "Every Monday"
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      agent: "South India Travels",
      duration: "5 Days",
      places: ["Kochi", "Alleppey", "Munnar"],
      price: "₹18,000",
      rating: 4.8,
      includes: ["Houseboat", "Hotels", "Transport", "Meals"],
      departure: "Daily"
    },
    {
      id: 3,
      title: "Rajasthan Royal Tour",
      agent: "Desert Kings Travel",
      duration: "10 Days",
      places: ["Jodhpur", "Udaipur", "Jaisalmer", "Bikaner"],
      price: "₹35,000",
      rating: 4.6,
      includes: ["Palace Hotels", "Camel Safari", "Transport", "Guide"],
      departure: "Twice Weekly"
    }
  ]);

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
            Travel Communities & Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join like-minded travelers or choose from curated travel packages
          </p>
        </div>

        {/* Communities Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Travel Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <Card key={community.id} className="p-6 bg-white/70 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    {community.category}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm font-semibold">{community.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-4">{community.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{community.upcomingTrips} upcoming trips</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Join Community
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Travel Packages Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Curated Travel Packages</h2>
          <div className="space-y-6">
            {travelPackages.map((pkg) => (
              <Card key={pkg.id} className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Package Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                        <p className="text-gray-600">by {pkg.agent}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">{pkg.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                        <span>{pkg.rating} rating</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Places Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.places.map((place) => (
                          <Badge key={place} variant="secondary">
                            <MapPin className="w-3 h-3 mr-1" />
                            {place}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.includes.map((item) => (
                          <Badge key={item} className="bg-green-100 text-green-800">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="flex flex-col justify-between">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Departure:</h4>
                      <p className="text-gray-600">{pkg.departure}</p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Book Package
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Agent Partnership CTA */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-orange-100 to-blue-100 border-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Travel Agent Partnership
          </h3>
          <p className="text-gray-600 mb-6">
            Are you a travel agent? Partner with us to showcase your packages to thousands of travelers.
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8">
            Become a Partner
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Communities;