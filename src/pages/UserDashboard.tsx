import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, Calendar, MessageSquare, Eye, TrendingUp, Settings, HelpCircle, 
  Bell, Mail, Phone, Send, Plus, Edit, Trash2, Headphones, BookOpen, MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import CreateTripForm from "@/components/CreateTripForm";

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [showMessaging, setShowMessaging] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [interestedTrips, setInterestedTrips] = useState([]);
  const [loadingInterestedTrips, setLoadingInterestedTrips] = useState(false);

  // Mock data
  const userStats = {
    totalTrips: 8,
    totalViews: 1247,
    totalInterests: 89,
    totalMessages: 156,
    rating: 4.8,
    followers: 234
  };

  const tripPosts = [
    {
      id: '1',
      title: 'Ladakh Adventure Expedition',
      destination: 'Ladakh, India',
      date: '2024-12-15',
      status: 'active',
      views: 342,
      interests: 23,
      messages: 8
    },
    {
      id: '2',
      title: 'Goa Beach & Culture Retreat',
      destination: 'Goa, India',
      date: '2024-12-20',
      status: 'active',
      views: 289,
      interests: 18,
      messages: 5
    }
  ];

  const recentMessages = [
    {
      id: '1',
      from: 'Priya Patel',
      subject: 'Interested in Ladakh Trip',
      content: 'Hi! I saw your Ladakh adventure post and I\'m very interested. Can you share more details?',
      timestamp: '2 hours ago',
      read: false,
      type: 'inquiry'
    },
    {
      id: '2',
      from: 'Rahul Sharma',
      subject: 'Booking Confirmation',
      content: 'Thank you for the detailed information. I\'d like to confirm my booking for the Goa trip.',
      timestamp: '1 day ago',
      read: true,
      type: 'booking'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'trip_posted',
      title: 'Posted Ladakh Adventure Expedition',
      description: 'New trip posted with 23 interests and 8 messages',
      timestamp: '2 days ago',
      status: 'active',
      interactions: 31
    },
    {
      id: '2',
      type: 'message_received',
      title: 'New message from Priya Patel',
      description: 'Inquiry about Ladakh trip details',
      timestamp: '2 hours ago',
      status: 'pending',
      interactions: 1
    }
  ];

  // Mock data for interested trips
  const mockInterestedTrips = [
    {
      id: '1',
      tripId: 'trip1',
      tripType: 'travel_plan',
      status: 'accepted',
      appliedAt: '2024-12-10T10:00:00Z',
      respondedAt: '2024-12-11T15:30:00Z',
      message: 'I would love to join this trip!',
      tripDetails: {
        title: 'Rajasthan Royal Heritage Tour',
        destination: 'Rajasthan, India',
        duration: '7 Days / 6 Nights',
        cost: { amount: 46080, currency: 'INR' },
        organizer: {
          name: 'Royal Travel Agency',
          verified: true
        }
      }
    },
    {
      id: '2',
      tripId: 'trip2',
      tripType: 'trip_room',
      status: 'waiting_for_approval',
      appliedAt: '2024-12-12T14:20:00Z',
      message: 'Interested in joining this group trip',
      tripDetails: {
        destination: 'Kerala Backwaters',
        dates: 'Jan 15-20, 2025',
        budget: '₹25,000',
        organizer: {
          name: 'Adventure Seeker',
          verified: false
        }
      }
    },
    {
      id: '3',
      tripId: 'trip3',
      tripType: 'travel_post',
      status: 'pending',
      appliedAt: '2024-12-13T09:15:00Z',
      message: 'Looking forward to this adventure!',
      tripDetails: {
        destination: 'Ladakh, India',
        travelDate: 'March 2025',
        author: {
          name: 'Mountain Explorer',
          verified: true
        }
      }
    }
  ];

  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter your support message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you within 24 hours",
    });
    setShowSupportDialog(false);
    setSupportMessage('');
  };

  const handleMessageReply = () => {
    if (!replyMessage.trim()) return;
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    });
    setShowMessaging(false);
    setReplyMessage('');
  };

  const handleTripCreated = () => {
    toast({
      title: "Trip Created",
      description: "Your trip has been added to the list",
    });
  };

  // Function to fetch interested trips
  const fetchInterestedTrips = async () => {
    if (!user?.id) return;
    
    setLoadingInterestedTrips(true);
    try {
      const response = await fetch(`http://localhost:6080/api/user-trip-interests/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setInterestedTrips(data);
      } else {
        // For now, use mock data if API fails
        setInterestedTrips(mockInterestedTrips);
      }
    } catch (error) {
      console.error('Failed to fetch interested trips:', error);
      // Use mock data as fallback
      setInterestedTrips(mockInterestedTrips);
    } finally {
      setLoadingInterestedTrips(false);
    }
  };

  // Load interested trips when component mounts
  useEffect(() => {
    fetchInterestedTrips();
  }, [user?.id]);

  const handleViewTripDetails = (tripId: string) => {
    // Navigate to the trip detail page
    window.open(`/travel-plan-booking/${tripId}`, '_blank');
  };

  const handleEditTrip = (tripId: string) => {
    toast({
      title: "Edit Trip",
      description: `Editing trip ${tripId} - This would open an edit form`,
    });
  };

  const handleDeleteTrip = (tripId: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      toast({
        title: "Trip Deleted",
        description: "The trip has been successfully deleted",
      });
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <Link to="/auth">
            <Button>Login to Access Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">New message from Priya Patel</p>
                  <p className="text-sm text-gray-600">Interested in your Ladakh trip</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">Trip booking confirmed</p>
                  <p className="text-sm text-gray-600">Goa Beach & Culture Retreat</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="font-medium">New interest in your trip</p>
                  <p className="text-sm text-gray-600">5 people showed interest in Ladakh trip</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Profile Settings</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setShowEditProfile(true);
                        setShowSettings(false);
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setShowChangePassword(true);
                        setShowSettings(false);
                      }}
                    >
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setShowPrivacySettings(true);
                        setShowSettings(false);
                      }}
                    >
                      Privacy Settings
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notification Settings</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setShowNotificationSettings(true);
                        setShowSettings(false);
                      }}
                    >
                      Email Notifications
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setShowNotificationSettings(true);
                        setShowSettings(false);
                      }}
                    >
                      Push Notifications
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Customer Support</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Describe your issue..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSupportSubmit} className="flex-1">
                    Submit Ticket
                  </Button>
                  <Button variant="outline" onClick={() => setShowSupportDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Profile Header */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                {user.email?.split('@')[0].split('').slice(0, 2).join('').toUpperCase()}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user.email?.split('@')[0]}!
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Member since {new Date().getFullYear()}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{userStats.totalTrips}</div>
                  <div className="text-sm text-gray-600">Total Trips</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(userStats.totalViews)}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.totalInterests}</div>
                  <div className="text-sm text-gray-600">Interests</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userStats.totalMessages}</div>
                  <div className="text-sm text-gray-600">Messages</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-trips">My Trips</TabsTrigger>
            <TabsTrigger value="interested-trips">Interested Trips</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                        </div>
                        <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                          {activity.interactions} interactions
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold">{userStats.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Followers</span>
                      <span className="font-semibold">{userStats.followers}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Recent Messages
                  </h3>
                  <div className="space-y-3">
                    {recentMessages.slice(0, 3).map((message) => (
                      <div key={message.id} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.from}</p>
                          <p className="text-xs text-gray-600 truncate">{message.subject}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowMessaging(true)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* My Trips Tab */}
          <TabsContent value="my-trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">My Trip Posts</h3>
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowCreateTrip(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Trip
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripPosts.map((trip) => (
                <Card key={trip.id} className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{trip.title}</h4>
                      <p className="text-sm text-gray-600">{trip.destination}</p>
                      <p className="text-xs text-gray-500">{trip.date}</p>
                    </div>
                    <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                      {trip.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{trip.views}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{trip.interests}</div>
                      <div className="text-xs text-gray-600">Interests</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{trip.messages}</div>
                      <div className="text-xs text-gray-600">Messages</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewTripDetails(trip.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTrip(trip.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interested Trips Tab */}
          <TabsContent value="interested-trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Trips I've Shown Interest In</h3>
              <Badge className="bg-blue-500 text-white">
                {interestedTrips.length} total
              </Badge>
            </div>

            {loadingInterestedTrips ? (
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading your interested trips...</p>
                </div>
              </Card>
            ) : interestedTrips.length === 0 ? (
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Interested Trips Yet</h4>
                  <p className="text-gray-600 mb-4">
                    You haven't shown interest in any trips yet. Start exploring trips from travel agents and other users!
                  </p>
                  <Button onClick={() => navigate('/travel-plans')} className="bg-orange-500 hover:bg-orange-600">
                    Explore Trips
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interestedTrips.map((trip) => (
                  <Card key={trip.id} className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {trip.tripDetails?.title || trip.tripDetails?.destination || 'Trip'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {trip.tripDetails?.destination || trip.tripDetails?.travelDate || 'Destination'}
                        </p>
                        {trip.tripDetails?.duration && (
                          <p className="text-xs text-gray-500">{trip.tripDetails.duration}</p>
                        )}
                        {trip.tripDetails?.cost && (
                          <p className="text-xs text-gray-500">
                            ₹{trip.tripDetails.cost.amount?.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge 
                          variant={
                            trip.status === 'accepted' ? 'default' :
                            trip.status === 'waiting_for_approval' ? 'secondary' :
                            trip.status === 'rejected' ? 'destructive' : 'outline'
                          }
                          className={
                            trip.status === 'accepted' ? 'bg-green-500' :
                            trip.status === 'waiting_for_approval' ? 'bg-yellow-500' :
                            trip.status === 'rejected' ? 'bg-red-500' : ''
                          }
                        >
                          {trip.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {trip.tripDetails?.organizer?.verified || trip.tripDetails?.author?.verified ? (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700">
                              Unverified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Organizer:</strong> {trip.tripDetails?.organizer?.name || trip.tripDetails?.author?.name}
                      </p>
                      {trip.message && (
                        <p className="text-sm text-gray-600 italic">"{trip.message}"</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Applied: {new Date(trip.appliedAt).toLocaleDateString()}</span>
                      {trip.respondedAt && (
                        <span>Responded: {new Date(trip.respondedAt).toLocaleDateString()}</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewTripDetails(trip.tripId)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Trip
                      </Button>
                      {trip.status === 'accepted' && (
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Messages</h3>
              <Badge className="bg-red-500 text-white">
                {recentMessages.filter(m => !m.read).length} unread
              </Badge>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <div className="divide-y divide-gray-200">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
                    onClick={() => setShowMessaging(true)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{message.from}</h4>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                          <p className="text-xs text-gray-500">{message.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {message.type}
                        </Badge>
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Activity Timeline</h3>
            
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <div className="p-6">
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          activity.type === 'trip_posted' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`}></div>
                        {index < recentActivity.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {activity.interactions} interactions
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Customer Support</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="text-center">
                  <Headphones className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-gray-600 mb-4">
                    Our support team is here to help you with any questions or issues.
                  </p>
                  <Button onClick={() => setShowSupportDialog(true)} className="w-full">
                    Contact Support
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-100">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h4>
                  <p className="text-gray-600 mb-4">
                    Find answers to common questions in our help center.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowHelpCenter(true)}
                  >
                    Browse Help Articles
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@ghumingo.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Messaging Dialog */}
      <Dialog open={showMessaging} onOpenChange={setShowMessaging}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Sample Message</h4>
              <p className="text-gray-700">This is a sample message content that would show the actual message from the user.</p>
              <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Reply</label>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleMessageReply} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setShowMessaging(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Trip Form */}
      <CreateTripForm
        isOpen={showCreateTrip}
        onClose={() => setShowCreateTrip(false)}
        onTripCreated={handleTripCreated}
      />

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.email?.split('@')[0] || ''}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ''}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About Me</h3>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowEditProfile(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Profile Updated Successfully!",
                    description: "Your profile information has been saved.",
                  });
                  setShowEditProfile(false);
                }} 
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowChangePassword(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Password Changed Successfully!",
                    description: "Your password has been updated.",
                  });
                  setShowChangePassword(false);
                }} 
                className="bg-orange-500 hover:bg-orange-600"
              >
                Change Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Dialog */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Privacy Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show email address</Label>
                    <p className="text-sm text-gray-500">Allow others to see your email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show phone number</Label>
                    <p className="text-sm text-gray-500">Allow others to see your phone</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show location</Label>
                    <p className="text-sm text-gray-500">Show your general location</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow messages from others</Label>
                    <p className="text-sm text-gray-500">Let other users send you messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowPrivacySettings(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Privacy Settings Updated!",
                    description: "Your privacy preferences have been saved.",
                  });
                  setShowPrivacySettings(false);
                }} 
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Dialog */}
      <Dialog open={showNotificationSettings} onOpenChange={setShowNotificationSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Notification Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New messages</Label>
                    <p className="text-sm text-gray-500">When someone sends you a message</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trip updates</Label>
                    <p className="text-sm text-gray-500">Updates about trips you're interested in</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Booking confirmations</Label>
                    <p className="text-sm text-gray-500">When your trip booking is confirmed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing emails</Label>
                    <p className="text-sm text-gray-500">Promotional content and offers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New messages</Label>
                    <p className="text-sm text-gray-500">Instant notifications for new messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trip updates</Label>
                    <p className="text-sm text-gray-500">Real-time trip updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Nearby trips</Label>
                    <p className="text-sm text-gray-500">Trips happening near your location</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowNotificationSettings(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Notification Settings Updated!",
                    description: "Your notification preferences have been saved.",
                  });
                  setShowNotificationSettings(false);
                }} 
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Center Dialog */}
      <Dialog open={showHelpCenter} onOpenChange={setShowHelpCenter}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">How to create a trip?</h4>
                  <p className="text-sm text-gray-600">Click on "Create New Trip" in your dashboard and fill in all the required details.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">How to join a trip?</h4>
                  <p className="text-sm text-gray-600">Browse available trips and click "Join Group" to express your interest.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">How to message other travelers?</h4>
                  <p className="text-sm text-gray-600">Use the messaging feature in your dashboard to communicate with other users.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Safety & Security</h3>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">Is Ghumingo safe?</h4>
                  <p className="text-sm text-gray-600">Yes, we verify all users and provide safety features for secure travel experiences.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">What if I have a problem?</h4>
                  <p className="text-sm text-gray-600">Contact our support team immediately through the support section in your dashboard.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Payment & Booking</h3>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">How do payments work?</h4>
                  <p className="text-sm text-gray-600">Payments are processed securely through our platform with multiple payment options.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium">Can I cancel my booking?</h4>
                  <p className="text-sm text-gray-600">Cancellation policies vary by trip. Check the specific trip details for cancellation terms.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Account & Profile</h3>
              <div className="space-y-2">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium">How to update my profile?</h4>
                  <p className="text-sm text-gray-600">Go to Settings in your dashboard to update your profile information.</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium">How to change my password?</h4>
                  <p className="text-sm text-gray-600">Access password settings through the Settings menu in your dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
