import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const TravelAgentOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agencyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    specializations: '',
    description: '',
    website: '',
    license: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally submit to backend
    console.log('Travel agent registration:', formData);
    // Navigate to dashboard after successful registration
    navigate('/travel-agent/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Travel Partner</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of trusted travel agents and showcase your amazing travel packages to thousands of travelers
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Partner Registration</CardTitle>
            <CardDescription>
              Fill out the form below to get started as a travel agent partner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="agencyName">Agency Name *</Label>
                  <Input
                    id="agencyName"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleInputChange}
                    placeholder="Enter your travel agency name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="business@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label htmlFor="license">Travel License Number</Label>
                  <Input
                    id="license"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    placeholder="License number (if applicable)"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete business address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="specializations">Specializations</Label>
                <Input
                  id="specializations"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleInputChange}
                  placeholder="e.g., Adventure Tours, Luxury Travel, Honeymoon Packages"
                />
              </div>

              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <Label htmlFor="description">About Your Agency</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your travel agency, your experience, and what makes you unique..."
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Partner Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Zero Commission</Badge>
                  <Badge variant="secondary">Direct Customer Contact</Badge>
                  <Badge variant="secondary">Marketing Support</Badge>
                  <Badge variant="secondary">24/7 Platform Access</Badge>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TravelAgentOnboarding;