import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Users, MapPin, Calendar, DollarSign, Hotel, Phone, Mail, Clock, Star, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  duration: string;
  cost: {
    total: number;
    breakdown: {
      accommodation: number;
      transportation: number;
      activities: number;
      meals: number;
      misc: number;
    };
  };
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string[];
  }>;
  hotels: Array<{
    name: string;
    rating: number;
    price: number;
    amenities: string[];
    contact: string;
    address: string;
  }>;
  contact: {
    organizer: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  groupSize: {
    current: number;
    max: number;
  };
  startDate: string;
  endDate: string;
  image: string;
  tags: string[];
  description: string;
  highlights: string[];
  requirements: string[];
  included: string[];
  notIncluded: string[];
}

const CommunityGroups = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);

  const travelPlans: TravelPlan[] = [
    {
      id: "ladakh-adventure",
      title: "Ladakh Adventure Expedition",
      destination: "Ladakh, Jammu & Kashmir",
      duration: "8 Days / 7 Nights",
      cost: {
        total: 45000,
        breakdown: {
          accommodation: 15000,
          transportation: 12000,
          activities: 8000,
          meals: 6000,
          misc: 4000
        }
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival in Leh",
          activities: ["Airport pickup", "Acclimatization", "Leh Palace visit", "Shanti Stupa"],
          accommodation: "Hotel Dragon Ladakh",
          meals: ["Dinner"]
        },
        {
          day: 2,
          title: "Leh Local Sightseeing",
          activities: ["Thiksey Monastery", "Hemis Monastery", "Shey Palace", "Local market"],
          accommodation: "Hotel Dragon Ladakh",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 3,
          title: "Nubra Valley",
          activities: ["Khardungla Pass", "Diskit Monastery", "Sand dunes", "Camel safari"],
          accommodation: "Nubra Valley Camp",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 4,
          title: "Pangong Lake",
          activities: ["Pangong Lake visit", "Photography", "Sunset viewing", "Camping"],
          accommodation: "Pangong Camp",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 5,
          title: "Tso Moriri Lake",
          activities: ["Tso Moriri Lake", "Wildlife spotting", "Village visit"],
          accommodation: "Tso Moriri Camp",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 6,
          title: "Return to Leh",
          activities: ["Return journey", "Rest", "Shopping"],
          accommodation: "Hotel Dragon Ladakh",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 7,
          title: "Magnetic Hill & Monasteries",
          activities: ["Magnetic Hill", "Alchi Monastery", "Lamayuru Monastery"],
          accommodation: "Hotel Dragon Ladakh",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 8,
          title: "Departure",
          activities: ["Airport drop", "Farewell"],
          accommodation: "N/A",
          meals: ["Breakfast"]
        }
      ],
      hotels: [
        {
          name: "Hotel Dragon Ladakh",
          rating: 4.2,
          price: 3500,
          amenities: ["WiFi", "Restaurant", "Room Service", "Mountain View"],
          contact: "+91-9419177777",
          address: "Fort Road, Leh, Ladakh"
        },
        {
          name: "Nubra Valley Camp",
          rating: 4.0,
          price: 2500,
          amenities: ["Camping", "Bonfire", "Local Food", "Stargazing"],
          contact: "+91-9419188888",
          address: "Diskit, Nubra Valley"
        },
        {
          name: "Pangong Camp",
          rating: 3.8,
          price: 2000,
          amenities: ["Lake View", "Camping", "Basic Amenities"],
          contact: "+91-9419199999",
          address: "Pangong Lake, Ladakh"
        }
      ],
      contact: {
        organizer: "Rahul Sharma",
        phone: "+91-9876543210",
        email: "rahul@ghumingo.com",
        whatsapp: "+91-9876543210"
      },
      groupSize: {
        current: 8,
        max: 15
      },
      startDate: "2024-12-15",
      endDate: "2024-12-22",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      tags: ["Adventure", "Mountains", "Monasteries", "High Altitude"],
      description: "Experience the mystical land of Ladakh with our carefully curated 8-day adventure. From ancient monasteries to pristine lakes, this journey will take you through the most breathtaking landscapes of the Himalayas.",
      highlights: [
        "Visit the highest motorable pass - Khardungla",
        "Experience the magical Pangong Lake",
        "Explore ancient Buddhist monasteries",
        "Camel safari in Nubra Valley",
        "Stargazing in the clear mountain sky"
      ],
      requirements: [
        "Valid ID proof",
        "Medical fitness certificate",
        "Warm clothing",
        "Altitude sickness medication",
        "Travel insurance"
      ],
      included: [
        "All accommodation",
        "Transportation",
        "Meals as specified",
        "Guide services",
        "Permits and entry fees",
        "First aid kit"
      ],
      notIncluded: [
        "Airfare to/from Leh",
        "Personal expenses",
        "Tips and gratuities",
        "Additional meals",
        "Travel insurance"
      ]
    },
    {
      id: "goa-beach-retreat",
      title: "Goa Beach & Culture Retreat",
      destination: "Goa",
      duration: "6 Days / 5 Nights",
      cost: {
        total: 28000,
        breakdown: {
          accommodation: 12000,
          transportation: 6000,
          activities: 5000,
          meals: 4000,
          misc: 2000
        }
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival in Goa",
          activities: ["Airport pickup", "Check-in", "Beach walk", "Welcome dinner"],
          accommodation: "Taj Holiday Village Resort",
          meals: ["Dinner"]
        },
        {
          day: 2,
          title: "Old Goa Heritage",
          activities: ["Basilica of Bom Jesus", "Se Cathedral", "Church of St. Francis", "Archaeological Museum"],
          accommodation: "Taj Holiday Village Resort",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 3,
          title: "Beach Hopping",
          activities: ["Calangute Beach", "Baga Beach", "Anjuna Beach", "Water sports"],
          accommodation: "Taj Holiday Village Resort",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 4,
          title: "Spice Plantation & Dudhsagar",
          activities: ["Spice plantation tour", "Dudhsagar Falls", "Elephant bath", "Traditional lunch"],
          accommodation: "Taj Holiday Village Resort",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 5,
          title: "Panjim & Fontainhas",
          activities: ["Panjim city tour", "Fontainhas heritage walk", "Shopping", "Farewell party"],
          accommodation: "Taj Holiday Village Resort",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 6,
          title: "Departure",
          activities: ["Beach morning", "Airport drop"],
          accommodation: "N/A",
          meals: ["Breakfast"]
        }
      ],
      hotels: [
        {
          name: "Taj Holiday Village Resort",
          rating: 4.5,
          price: 8000,
          amenities: ["Beach Access", "Pool", "Spa", "Restaurant", "Water Sports"],
          contact: "+91-832-6645858",
          address: "Sinquerim Beach, Goa"
        }
      ],
      contact: {
        organizer: "Priya Patel",
        phone: "+91-9876543211",
        email: "priya@ghumingo.com",
        whatsapp: "+91-9876543211"
      },
      groupSize: {
        current: 12,
        max: 20
      },
      startDate: "2024-12-20",
      endDate: "2024-12-25",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
      tags: ["Beach", "Culture", "Heritage", "Relaxation"],
      description: "Discover the perfect blend of sun, sand, and culture in Goa. From pristine beaches to Portuguese heritage, this retreat offers the best of both worlds.",
      highlights: [
        "Visit UNESCO World Heritage churches",
        "Explore pristine beaches",
        "Experience Dudhsagar Falls",
        "Spice plantation tour",
        "Heritage walk in Fontainhas"
      ],
      requirements: [
        "Valid ID proof",
        "Beach wear",
        "Comfortable walking shoes",
        "Camera",
        "Travel insurance"
      ],
      included: [
        "Luxury beach resort accommodation",
        "All transportation",
        "Meals as specified",
        "Professional guide",
        "Entry fees",
        "Water sports activities"
      ],
      notIncluded: [
        "Airfare to/from Goa",
        "Personal expenses",
        "Tips and gratuities",
        "Additional activities",
        "Travel insurance"
      ]
    },
    {
      id: "kerala-backwaters",
      title: "Kerala Backwaters & Ayurveda",
      destination: "Kerala",
      duration: "7 Days / 6 Nights",
      cost: {
        total: 35000,
        breakdown: {
          accommodation: 18000,
          transportation: 8000,
          activities: 6000,
          meals: 5000,
          misc: 2000
        }
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kochi",
          activities: ["Airport pickup", "Fort Kochi walk", "Chinese fishing nets", "Kathakali performance"],
          accommodation: "Brunton Boatyard",
          meals: ["Dinner"]
        },
        {
          day: 2,
          title: "Munnar Hill Station",
          activities: ["Tea plantation", "Eravikulam National Park", "Mattupetty Dam", "Sunset point"],
          accommodation: "Windermere Estate",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 3,
          title: "Thekkady Wildlife",
          activities: ["Periyar Wildlife Sanctuary", "Boat safari", "Spice plantation", "Traditional dance"],
          accommodation: "Spice Village",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 4,
          title: "Alleppey Backwaters",
          activities: ["Houseboat check-in", "Backwater cruise", "Village visit", "Sunset viewing"],
          accommodation: "Luxury Houseboat",
          meals: ["Breakfast", "Lunch", "Dinner"]
        },
        {
          day: 5,
          title: "Kumarakom",
          activities: ["Bird sanctuary", "Ayurvedic massage", "Cooking class", "Cultural show"],
          accommodation: "Kumarakom Lake Resort",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 6,
          title: "Kovalam Beach",
          activities: ["Beach relaxation", "Ayurvedic treatments", "Lighthouse visit", "Shopping"],
          accommodation: "Leela Kovalam",
          meals: ["Breakfast", "Dinner"]
        },
        {
          day: 7,
          title: "Departure",
          activities: ["Morning beach walk", "Airport drop"],
          accommodation: "N/A",
          meals: ["Breakfast"]
        }
      ],
      hotels: [
        {
          name: "Brunton Boatyard",
          rating: 4.8,
          price: 12000,
          amenities: ["Sea View", "Spa", "Restaurant", "Heritage Building"],
          contact: "+91-484-2215465",
          address: "Fort Kochi, Kerala"
        },
        {
          name: "Luxury Houseboat",
          rating: 4.3,
          price: 8000,
          amenities: ["Private Deck", "AC Rooms", "Traditional Food", "Backwater Views"],
          contact: "+91-477-2234567",
          address: "Alleppey Backwaters"
        },
        {
          name: "Kumarakom Lake Resort",
          rating: 4.6,
          price: 15000,
          amenities: ["Lake View", "Ayurvedic Spa", "Infinity Pool", "Fine Dining"],
          contact: "+91-481-2524500",
          address: "Kumarakom, Kerala"
        }
      ],
      contact: {
        organizer: "Anjali Menon",
        phone: "+91-9876543212",
        email: "anjali@ghumingo.com",
        whatsapp: "+91-9876543212"
      },
      groupSize: {
        current: 6,
        max: 12
      },
      startDate: "2024-12-28",
      endDate: "2025-01-03",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600",
      tags: ["Backwaters", "Ayurveda", "Wildlife", "Culture"],
      description: "Experience the serene beauty of Kerala's backwaters, rejuvenate with authentic Ayurvedic treatments, and immerse yourself in the rich culture of God's Own Country.",
      highlights: [
        "Luxury houseboat experience",
        "Ayurvedic wellness treatments",
        "Wildlife safari in Thekkady",
        "Tea plantation visit",
        "Traditional Kathakali performance"
      ],
      requirements: [
        "Valid ID proof",
        "Comfortable clothing",
        "Swimming gear",
        "Medication if any",
        "Travel insurance"
      ],
      included: [
        "Premium accommodation",
        "All transportation",
        "Meals as specified",
        "Ayurvedic treatments",
        "Professional guide",
        "Entry fees"
      ],
      notIncluded: [
        "Airfare to/from Kerala",
        "Personal expenses",
        "Tips and gratuities",
        "Additional treatments",
        "Travel insurance"
      ]
    }
  ];

  const handleJoinGroup = (planId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to join travel communities",
        variant: "destructive",
      });
      return;
    }

    if (joinedGroups.includes(planId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== planId));
      toast({
        title: "Left Community",
        description: "You have left the travel community",
      });
    } else {
      setJoinedGroups([...joinedGroups, planId]);
      toast({
        title: "Joined Community",
        description: "Welcome to the travel community! Check your email for details.",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-orange-50/30 to-blue-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            Join Travel Communities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover curated travel plans with detailed itineraries, costs, and accommodation. 
            Join communities of like-minded travelers and embark on unforgettable journeys together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {travelPlans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <div className="relative h-48">
                <img 
                  src={plan.image} 
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500 text-white">
                    {formatCurrency(plan.cost.total)}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{plan.destination}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{plan.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {plan.groupSize.current}/{plan.groupSize.max}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{plan.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {plan.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-orange-100 text-orange-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Accommodation:</span>
                    <span className="font-medium">{formatCurrency(plan.cost.breakdown.accommodation)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Transportation:</span>
                    <span className="font-medium">{formatCurrency(plan.cost.breakdown.transportation)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Activities:</span>
                    <span className="font-medium">{formatCurrency(plan.cost.breakdown.activities)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{plan.title}</DialogTitle>
                        <DialogDescription className="text-lg">
                          {plan.destination} • {plan.duration}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                          <TabsTrigger value="accommodation">Hotels</TabsTrigger>
                          <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                              <ul className="space-y-2">
                                {plan.highlights.map((highlight, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                              <ul className="space-y-2">
                                {plan.included.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="flex justify-between">
                                <span>Accommodation:</span>
                                <span className="font-medium">{formatCurrency(plan.cost.breakdown.accommodation)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Transportation:</span>
                                <span className="font-medium">{formatCurrency(plan.cost.breakdown.transportation)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Activities:</span>
                                <span className="font-medium">{formatCurrency(plan.cost.breakdown.activities)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Meals:</span>
                                <span className="font-medium">{formatCurrency(plan.cost.breakdown.meals)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Miscellaneous:</span>
                                <span className="font-medium">{formatCurrency(plan.cost.breakdown.misc)}</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>{formatCurrency(plan.cost.total)}</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="itinerary" className="space-y-4">
                          {plan.itinerary.map((day) => (
                            <Card key={day.day}>
                              <CardHeader>
                                <CardTitle className="text-lg">Day {day.day}: {day.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Activities:</h4>
                                  <ul className="space-y-1">
                                    {day.activities.map((activity, index) => (
                                      <li key={index} className="flex items-start">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                        <span className="text-sm">{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Accommodation:</h4>
                                    <p className="text-sm text-gray-600">{day.accommodation}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Meals:</h4>
                                    <p className="text-sm text-gray-600">{day.meals.join(", ")}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="accommodation" className="space-y-4">
                          {plan.hotels.map((hotel, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                        />
                                      ))}
                                    </div>
                                    <Badge variant="secondary">{formatCurrency(hotel.price)}/night</Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Amenities:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.map((amenity, amenityIndex) => (
                                      <Badge key={amenityIndex} variant="outline" className="text-xs">
                                        {amenity}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Contact:</h4>
                                    <p className="text-sm text-gray-600">{hotel.contact}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Address:</h4>
                                    <p className="text-sm text-gray-600">{hotel.address}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="contact" className="space-y-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Trip Organizer</h3>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="font-medium">{plan.contact.organizer}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                                <span>{plan.contact.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                                <span>{plan.contact.email}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 text-blue-600">📱</span>
                                <span>WhatsApp: {plan.contact.whatsapp}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Group Status</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Current Members:</span>
                                <span className="font-medium">{plan.groupSize.current}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Maximum Capacity:</span>
                                <span className="font-medium">{plan.groupSize.max}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Available Spots:</span>
                                <span className="font-medium text-green-600">
                                  {plan.groupSize.max - plan.groupSize.current}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Travel Dates</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Start Date:</span>
                                <span className="font-medium">{new Date(plan.startDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>End Date:</span>
                                <span className="font-medium">{new Date(plan.endDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    className={`flex-1 ${
                      joinedGroups.includes(plan.id)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600'
                    }`}
                    onClick={() => handleJoinGroup(plan.id)}
                  >
                    {joinedGroups.includes(plan.id) ? 'Leave Group' : 'Join Group'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            View All Travel Plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityGroups;

