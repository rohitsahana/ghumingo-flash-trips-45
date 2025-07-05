import { travelPlans } from '@/data/travelPlans';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MapPin, Calendar, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TravelAgentPartnership from '@/components/TravelAgentPartnership';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const TravelPlans = () => (
  <div className="py-16 bg-gradient-to-b from-orange-50/30 to-blue-50/30 min-h-screen">
    <div className="container mx-auto px-6">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full group-hover:scale-110 transition-transform"></div>
          <span className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">Ghumingo</span>
        </Link>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
          All Travel Plans
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore all our curated travel plans with full details, itineraries, costs, and accommodation.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {travelPlans.map(plan => (
          <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <div className="relative h-48">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-500 text-white">{formatCurrency(plan.cost.total)}</Badge>
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
                  <span className="text-sm text-gray-600">{plan.groupSize.current}/{plan.groupSize.max}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {plan.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-orange-100 text-orange-800">{tag}</Badge>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="underline text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{plan.title}</DialogTitle>
                    <DialogDescription className="text-lg">{plan.destination} • {plan.duration}</DialogDescription>
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
                      {plan.itinerary.map(day => (
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
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
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
                                  <Badge key={amenityIndex} variant="outline" className="text-xs">{amenity}</Badge>
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
                            <span className="font-medium">{plan.contact.organizer}</span>
                          </div>
                          <div className="flex items-center">
                            <span>{plan.contact.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <span>{plan.contact.email}</span>
                          </div>
                          <div className="flex items-center">
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
                            <span className="font-medium text-green-600">{plan.groupSize.max - plan.groupSize.current}</span>
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
            </CardContent>
          </Card>
        ))}
      </div>
      <TravelAgentPartnership />
    </div>
  </div>
);

export default TravelPlans; 