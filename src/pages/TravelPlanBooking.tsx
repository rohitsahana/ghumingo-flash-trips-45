import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, Users, MapPin, Calendar, Star, Shield, Phone, Mail, MessageSquare,
  CreditCard, CheckCircle, ArrowLeft, Hotel, Utensils, Car, Activity, Info, AlertCircle
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { travelPlans, type TravelPlan } from "@/data/travelPlans";
import PaymentGateway from "@/components/PaymentGateway";

const TravelPlanBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState<'details' | 'chat' | 'payment'>('details');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const plan = travelPlans.find(p => p.id === id);
    if (plan) {
      setTravelPlan(plan);
    }
    setLoading(false);
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: user?.email?.split('@')[0] || 'You',
      message: chatMessage,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
    
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        sender: travelPlan?.contact.organizer || 'Travel Agent',
        message: 'Thank you for your message! I\'ll get back to you shortly.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const handlePaymentSuccess = (paymentId: string, transactionId: string) => {
    setBookingConfirmed(true);
    toast({
      title: "Booking Confirmed!",
      description: "Your travel plan has been successfully booked.",
    });
  };

  const handlePaymentFailure = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const handlePaymentCancel = () => {
    setShowPaymentGateway(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading travel plan details...</p>
        </div>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Travel Plan Not Found</h1>
          <Link to="/">
            <Button>← Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your booking for {travelPlan.title} has been successfully confirmed.
          </p>
          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <p><strong>Booking ID:</strong> TP-{Date.now()}</p>
            <p><strong>Travel Date:</strong> {travelPlan.startDate}</p>
            <p><strong>Total Amount:</strong> {formatCurrency(travelPlan.cost.total)}</p>
          </div>
          <div className="space-y-2">
            <Link to="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full">View My Bookings</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{travelPlan.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{travelPlan.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{travelPlan.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{travelPlan.groupSize.current}/{travelPlan.groupSize.max} spots filled</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  {formatCurrency(travelPlan.cost.total)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Hotel className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                  <div className="text-sm font-semibold text-orange-600">{formatCurrency(travelPlan.cost.breakdown.accommodation)}</div>
                  <div className="text-xs text-gray-600">Accommodation</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Car className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-semibold text-blue-600">{formatCurrency(travelPlan.cost.breakdown.transportation)}</div>
                  <div className="text-xs text-gray-600">Transport</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm font-semibold text-green-600">{formatCurrency(travelPlan.cost.breakdown.activities)}</div>
                  <div className="text-xs text-gray-600">Activities</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Utensils className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-semibold text-purple-600">{formatCurrency(travelPlan.cost.breakdown.meals)}</div>
                  <div className="text-xs text-gray-600">Meals</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {travelPlan.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
              <Tabs value={bookingStep} onValueChange={(value) => setBookingStep(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Trip Details</TabsTrigger>
                  <TabsTrigger value="chat">Chat with Agent</TabsTrigger>
                  <TabsTrigger value="payment">Book & Pay</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
                    <p className="text-gray-700 mb-4">{travelPlan.description}</p>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                      {travelPlan.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Itinerary</h3>
                    <div className="space-y-4">
                      {travelPlan.itinerary.map((day) => (
                        <div key={day.day} className="border-l-4 border-orange-500 pl-4">
                          <h4 className="font-semibold text-gray-900">Day {day.day}: {day.title}</h4>
                          <div className="text-sm text-gray-600 mt-1">
                            <p><strong>Accommodation:</strong> {day.accommodation}</p>
                            <p><strong>Meals:</strong> {day.meals.join(', ')}</p>
                            <p><strong>Activities:</strong></p>
                            <ul className="list-disc list-inside ml-4">
                              {day.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Accommodation</h3>
                    <div className="space-y-4">
                      {travelPlan.hotels.map((hotel, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-sm">{hotel.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                          <p className="text-sm text-gray-600 mb-2">Contact: {hotel.contact}</p>
                          <div className="flex flex-wrap gap-1">
                            {hotel.amenities.map((amenity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {travelPlan.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {travelPlan.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {travelPlan.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 mt-20">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Start a conversation with {travelPlan.contact.organizer}</p>
                        <p className="text-sm">Ask about trip details, customization, or any questions you have!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.sender === (user?.email?.split('@')[0] || 'You') ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.sender === (user?.email?.split('@')[0] || 'You') 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-white border border-gray-200'
                            }`}>
                              <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {msg.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Textarea
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      Send
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="space-y-6">
                  {!showPaymentGateway ? (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Travel Plan:</span>
                            <span className="font-semibold">{travelPlan.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{travelPlan.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Travel Date:</span>
                            <span>{new Date(travelPlan.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-semibold text-lg">{formatCurrency(travelPlan.cost.total)}</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setShowPaymentGateway(true)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3"
                      >
                        Proceed to Payment
                      </Button>
                    </>
                  ) : (
                    <PaymentGateway
                      amount={travelPlan.cost.total}
                      currency="INR"
                      onSuccess={handlePaymentSuccess}
                      onFailure={handlePaymentFailure}
                      onCancel={handlePaymentCancel}
                      bookingDetails={{
                        title: travelPlan.title,
                        bookingId: `TP-${Date.now()}`,
                        customerName: user?.email?.split('@')[0] || 'Guest',
                        customerEmail: user?.email || ''
                      }}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Travel Agent</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    {travelPlan.contact.organizer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{travelPlan.contact.organizer}</div>
                    <div className="text-sm text-gray-600">Travel Agent</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${travelPlan.contact.phone}`} className="hover:text-blue-600">
                      {travelPlan.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${travelPlan.contact.email}`} className="hover:text-blue-600">
                      {travelPlan.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <a href={`https://wa.me/${travelPlan.contact.whatsapp.replace('+', '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="hover:text-green-600">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setBookingStep('chat')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Agent
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setBookingStep('payment');
                    setShowPaymentGateway(true);
                  }}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Info className="w-4 h-4 mr-2" />
                      View Terms
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Terms & Conditions</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p>• 50% advance payment required to confirm booking</p>
                      <p>• Remaining amount to be paid 7 days before travel</p>
                      <p>• Cancellation policy: 50% refund if cancelled 15+ days before travel</p>
                      <p>• No refund for cancellations within 7 days of travel</p>
                      <p>• Travel insurance recommended</p>
                      <p>• All prices include GST</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Safety & Security
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Verified travel agents</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Secure payment gateway</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Travel insurance options</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanBooking; 