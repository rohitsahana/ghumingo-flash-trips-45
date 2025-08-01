import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Eye, Edit, Trash2, MapPin, Calendar, Users, DollarSign } from 'lucide-react';

const TravelAgentDashboard = () => {
  const navigate = useNavigate();
  const [myPackages] = useState([
    {
      id: 1,
      title: 'Rajasthan Royal Heritage Tour',
      destination: 'Rajasthan',
      duration: '7 Days / 6 Nights',
      price: 45000,
      status: 'active',
      bookings: 12,
      views: 245
    },
    {
      id: 2,
      title: 'Kerala Backwater Paradise',
      destination: 'Kerala',
      duration: '5 Days / 4 Nights',
      price: 35000,
      status: 'draft',
      bookings: 0,
      views: 0
    }
  ]);

  const stats = {
    totalPackages: 8,
    activePackages: 6,
    totalBookings: 45,
    totalRevenue: 1250000
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Travel Agent Dashboard</h1>
              <p className="text-gray-600">Welcome back, Rajesh Travels</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
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
                  <p className="text-2xl font-bold text-green-600">{stats.activePackages}</p>
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
                  <p className="text-2xl font-bold text-orange-600">{stats.totalBookings}</p>
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
                  <p className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue.toLocaleString()}</p>
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
                <div className="space-y-4">
                  {myPackages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{pkg.title}</h3>
                            <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                              {pkg.status}
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
                              ₹{pkg.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-green-600">{pkg.bookings} bookings</span>
                            <span className="text-blue-600">{pkg.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <p className="text-gray-500">No recent bookings to display.</p>
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
                <p className="text-gray-500">Analytics dashboard coming soon.</p>
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
                <p className="text-gray-500">Profile management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelAgentDashboard;