import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Eye, Edit, Trash2, MapPin, Calendar, Users, DollarSign, Loader2, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TravelAgentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    travelAgent: null,
    stats: {
      totalPackages: 0,
      activePackages: 0,
      totalBookings: 0,
      totalRevenue: 0
    },
    travelPlans: [],
    recentBookings: []
  });

  // Mock user email - in real app, get from auth context
  const userEmail = 'rohit.sahana2@gmail.com';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/travel-agents/dashboard/${userEmail}`);
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else if (response.status === 403) {
        // Travel agent not approved yet
        toast({
          title: "Application Pending",
          description: "Your travel agent application is under review. We'll notify you once approved.",
          variant: "destructive",
        });
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this travel plan?')) {
      return;
    }

    try {
      const response = await fetch(`/api/travel-agents/travel-plans/${planId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Travel plan deleted successfully",
        });
        fetchDashboardData(); // Refresh data
      } else {
        throw new Error('Failed to delete travel plan');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete travel plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/travel-agents/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingStatus: status }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Booking status updated successfully",
        });
        fetchDashboardData(); // Refresh data
      } else {
        throw new Error('Failed to update booking status');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData.travelAgent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Travel Agent Not Found</h2>
          <p className="text-gray-600 mb-4">Please register as a travel agent first.</p>
          <Button onClick={() => navigate('/travel-agent/onboarding')}>
            Register as Travel Agent
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Travel Agent Dashboard</h1>
              <p className="text-gray-600">Welcome back, {dashboardData.travelAgent.agencyName}</p>
            </div>
            <Button 
              onClick={() => navigate('/travel-agent/create-package')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Package
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Packages</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalPackages}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Packages</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardData.stats.activePackages}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardData.stats.totalBookings}</p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">₹{dashboardData.stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="packages">My Packages</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Travel Packages</CardTitle>
                    <CardDescription>Manage your travel packages and offerings</CardDescription>
                  </div>
                  <Button 
                    onClick={() => navigate('/travel-agent/create-package')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {dashboardData.travelPlans.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No travel packages yet</p>
                    <Button onClick={() => navigate('/travel-agent/create-package')}>
                      Create Your First Package
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.travelPlans.map((pkg) => (
                      <div key={pkg._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{pkg.title}</h3>
                              <Badge variant={pkg.isActive ? 'default' : 'secondary'}>
                                {pkg.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {pkg.destination}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {pkg.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                ₹{pkg.cost.amount.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <span className="text-green-600">{pkg.currentBookings} bookings</span>
                              <span className="text-blue-600">{pkg.views} views</span>
                              <span className="text-yellow-600">⭐ {pkg.rating.toFixed(1)} ({pkg.totalReviews} reviews)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeletePlan(pkg._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage customer bookings and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.recentBookings.length === 0 ? (
                  <p className="text-gray-500">No recent bookings to display.</p>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentBookings.map((booking) => (
                      <div key={booking._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold">{booking.customerName}</h4>
                              <Badge variant={
                                booking.bookingStatus === 'confirmed' ? 'default' :
                                booking.bookingStatus === 'pending' ? 'secondary' :
                                booking.bookingStatus === 'cancelled' ? 'destructive' : 'outline'
                              }>
                                {booking.bookingStatus}
                              </Badge>
                              <Badge variant={
                                booking.paymentStatus === 'paid' ? 'default' :
                                booking.paymentStatus === 'pending' ? 'secondary' : 'destructive'
                              }>
                                {booking.paymentStatus}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              <p>Booking ID: {booking.bookingId}</p>
                              <p>Travelers: {booking.numberOfTravelers}</p>
                              <p>Amount: ₹{booking.totalAmount.toLocaleString()}</p>
                              <p>Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Chat
                              </Button>
                              <Button variant="outline" size="sm">
                                <Phone className="w-3 h-3 mr-1" />
                                Call
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {booking.bookingStatus === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleUpdateBookingStatus(booking.bookingId, 'confirmed')}
                                >
                                  Confirm
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateBookingStatus(booking.bookingId, 'cancelled')}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>View your performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Performance Overview</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-semibold">₹{dashboardData.stats.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Bookings:</span>
                        <span className="font-semibold">{dashboardData.stats.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Packages:</span>
                        <span className="font-semibold">{dashboardData.stats.activePackages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Rating:</span>
                        <span className="font-semibold">
                          {dashboardData.travelPlans.length > 0 
                            ? (dashboardData.travelPlans.reduce((sum, plan) => sum + plan.rating, 0) / dashboardData.travelPlans.length).toFixed(1)
                            : '0.0'
                          } ⭐
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recent Activity</h3>
                    <div className="space-y-2 text-sm">
                      {dashboardData.recentBookings.slice(0, 5).map((booking) => (
                        <div key={booking._id} className="flex justify-between items-center">
                          <span>{booking.customerName} booked {booking.numberOfTravelers} spots</span>
                          <span className="text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Agency Profile</CardTitle>
                <CardDescription>Update your agency information and settings</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.travelAgent && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Agency Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Agency Name</p>
                          <p className="font-medium">{dashboardData.travelAgent.agencyName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact Person</p>
                          <p className="font-medium">{dashboardData.travelAgent.contactPerson}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{dashboardData.travelAgent.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{dashboardData.travelAgent.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{dashboardData.travelAgent.address}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Status</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={dashboardData.travelAgent.isApproved ? 'default' : 'secondary'}>
                          {dashboardData.travelAgent.isApproved ? 'Approved' : 'Pending Approval'}
                        </Badge>
                        <Badge variant={dashboardData.travelAgent.isVerified ? 'default' : 'secondary'}>
                          {dashboardData.travelAgent.isVerified ? 'Verified' : 'Not Verified'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelAgentDashboard;