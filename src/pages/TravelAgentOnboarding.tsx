import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle, Eye, EyeOff } from 'lucide-react';

const TravelAgentOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImage, setShowImage] = useState(false);
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
    license: '',
    aadharCardImage: '',
    aadharNumber: ''
  });

  // Validate Aadhar number format
  const validateAadharNumber = (aadharNumber: string) => {
    const cleanAadhar = aadharNumber.replace(/\s/g, '');
    if (!/^\d{12}$/.test(cleanAadhar)) {
      return { isValid: false, error: 'Aadhar number must be exactly 12 digits' };
    }

    // For demo/testing purposes, accept any 12-digit number
    // In production, you would implement proper checksum validation
    return { isValid: true, cleanAadhar };
  };

  // Format Aadhar number with spaces
  const formatAadharNumber = (value: string) => {
    const clean = value.replace(/\s/g, '');
    const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'aadharNumber') {
      const formatted = formatAadharNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          aadharCardImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.agencyName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your agency name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.contactPerson.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter contact person name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your address",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.aadharNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your Aadhar number",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.aadharCardImage) {
      toast({
        title: "Missing Information",
        description: "Please upload your Aadhar card image",
        variant: "destructive",
      });
      return false;
    }

    // Validate Aadhar number
    const aadharValidation = validateAadharNumber(formData.aadharNumber);
    if (!aadharValidation.isValid) {
      toast({
        title: "Invalid Aadhar Number",
        description: aadharValidation.error,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/travel-agents/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Registration Successful!",
          description: "Your travel agent account has been verified and approved immediately. You can now access your dashboard!",
        });
        navigate('/travel-agent/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    min="0"
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

              <div>
                <Label htmlFor="aadharCard">Aadhar Card (For Verification) *</Label>
                <Input
                  id="aadharCard"
                  name="aadharCard"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload your Aadhar card (JPG, PNG format, max 5MB)
                </p>
                {formData.aadharCardImage && (
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Aadhar card uploaded successfully
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                <div className="flex items-center border rounded-md p-2">
                  <Input
                    id="aadharNumber"
                    name="aadharNumber"
                    type={showImage ? "text" : "password"}
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your 12-digit Aadhar number"
                    required
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowImage(!showImage)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                  >
                    {showImage ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.aadharNumber && (
                  <p className="text-sm text-gray-500 mt-1">
                    Formatted Aadhar Number: {formatAadharNumber(formData.aadharNumber)}
                  </p>
                )}
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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
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