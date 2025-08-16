import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, X, Upload } from 'lucide-react';

const CreateTravelPackage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    duration: '',
    cost: {
      amount: '',
      currency: 'INR'
    },
    maxTravelers: 20,
    itinerary: [{ day: '', activities: [''] }],
    inclusions: [''],
    exclusions: [''],
    highlights: [''],
    images: [''],
    tags: ['']
  });

  // Mock user email - in real app, get from auth context
  const userEmail = 'rohit.sahana2@gmail.com';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: '', activities: [''] }]
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (dayIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === dayIndex ? { ...day, [field]: value } : day
      )
    }));
  };

  const addActivity = (dayIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === dayIndex ? { ...day, activities: [...day.activities, ''] } : day
      )
    }));
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === dayIndex ? { 
          ...day, 
          activities: day.activities.filter((_, ai) => ai !== activityIndex) 
        } : day
      )
    }));
  };

  const handleActivityChange = (dayIndex: number, activityIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === dayIndex ? {
          ...day,
          activities: day.activities.map((activity, ai) => 
            ai === activityIndex ? value : activity
          )
        } : day
      )
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a package title",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a package description",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.destination.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a destination",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.duration.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the duration",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.cost.amount || parseFloat(formData.cost.amount) <= 0) {
      toast({
        title: "Missing Information",
        description: "Please enter a valid cost amount",
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
      const submitData = {
        ...formData,
        cost: {
          amount: parseFloat(formData.cost.amount),
          currency: formData.cost.currency
        },
        maxTravelers: parseInt(formData.maxTravelers.toString()),
        travelAgentId: userEmail,
        travelAgentName: 'Travel Agent', // In real app, get from user profile
        inclusions: formData.inclusions.filter(item => item.trim()),
        exclusions: formData.exclusions.filter(item => item.trim()),
        highlights: formData.highlights.filter(item => item.trim()),
        images: formData.images.filter(item => item.trim()),
        tags: formData.tags.filter(item => item.trim()),
        itinerary: formData.itinerary.map(day => ({
          day: day.day,
          activities: day.activities.filter(activity => activity.trim())
        })).filter(day => day.day.trim() && day.activities.length > 0)
      };

      const response = await fetch('/api/travel-agents/travel-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success!",
          description: "Travel package created successfully",
        });
        navigate('/travel-agent/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create travel package');
      }
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Travel Package</h1>
          <p className="text-gray-600">Design and publish your travel package for customers to book</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential details about your travel package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Package Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Rajasthan Royal Heritage Tour"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your travel package in detail..."
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Rajasthan, India"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 7 Days / 6 Nights"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost.amount">Cost (₹) *</Label>
                    <Input
                      id="cost.amount"
                      name="cost.amount"
                      type="number"
                      value={formData.cost.amount}
                      onChange={handleInputChange}
                      placeholder="25000"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxTravelers">Max Travelers</Label>
                    <Input
                      id="maxTravelers"
                      name="maxTravelers"
                      type="number"
                      value={formData.maxTravelers}
                      onChange={handleInputChange}
                      placeholder="20"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost.currency">Currency</Label>
                    <Input
                      id="cost.currency"
                      name="cost.currency"
                      value={formData.cost.currency}
                      onChange={handleInputChange}
                      placeholder="INR"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
                <CardDescription>Day-wise breakdown of activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.itinerary.map((day, dayIndex) => (
                  <div key={dayIndex} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Day {dayIndex + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItineraryDay(dayIndex)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Day Title</Label>
                        <Input
                          value={day.day}
                          onChange={(e) => handleItineraryChange(dayIndex, 'day', e.target.value)}
                          placeholder="e.g., Arrival and City Tour"
                        />
                      </div>
                      <div>
                        <Label>Activities</Label>
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2 mt-2">
                            <Input
                              value={activity}
                              onChange={(e) => handleActivityChange(dayIndex, activityIndex, e.target.value)}
                              placeholder="e.g., Airport pickup, hotel check-in"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeActivity(dayIndex, activityIndex)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addActivity(dayIndex)}
                          className="mt-2"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Activity
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItineraryDay}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Day
                </Button>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inclusions</CardTitle>
                  <CardDescription>What's included in the package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.inclusions.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                        placeholder="e.g., Hotel accommodation"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('inclusions', index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('inclusions')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Inclusion
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exclusions</CardTitle>
                  <CardDescription>What's not included in the package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.exclusions.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                        placeholder="e.g., Airfare"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('exclusions', index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('exclusions')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Exclusion
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Highlights & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Highlights</CardTitle>
                  <CardDescription>Key attractions and experiences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.highlights.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                        placeholder="e.g., Visit to Taj Mahal"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('highlights', index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('highlights')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Highlight
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>Keywords for better discoverability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.tags.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                        placeholder="e.g., Culture, Heritage"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('tags', index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('tags')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Tag
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Add image URLs for your package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.images.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleArrayChange('images', index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('images', index)}
                      className="text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('images')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image URL
                </Button>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/travel-agent/dashboard')}
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
                    Creating Package...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Create Package
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTravelPackage;