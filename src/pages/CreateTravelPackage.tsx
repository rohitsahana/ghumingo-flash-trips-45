import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Save, ArrowLeft } from 'lucide-react';

const CreateTravelPackage = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    title: '',
    destination: '',
    duration: '',
    description: '',
    highlights: [''],
    requirements: [''],
    included: [''],
    notIncluded: [''],
    image: '',
    tags: '',
    cost: {
      total: 0,
      breakdown: {
        accommodation: 0,
        transportation: 0,
        activities: 0,
        meals: 0,
        misc: 0
      }
    },
    contact: {
      organizer: '',
      phone: '',
      email: '',
      whatsapp: ''
    },
    groupSize: {
      current: 0,
      max: 0
    },
    startDate: '',
    endDate: ''
  });

  const [itinerary, setItinerary] = useState([
    { day: 1, title: '', activities: [''], accommodation: '', meals: [''] }
  ]);

  const [hotels, setHotels] = useState([
    { name: '', rating: 0, price: 0, amenities: [''], contact: '', address: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'cost' && child === 'total') {
        setPackageData(prev => ({
          ...prev,
          cost: { ...prev.cost, total: Number(value) }
        }));
      } else if (parent === 'cost' && child.startsWith('breakdown.')) {
        const breakdownField = child.replace('breakdown.', '');
        setPackageData(prev => ({
          ...prev,
          cost: {
            ...prev.cost,
            breakdown: { ...prev.cost.breakdown, [breakdownField]: Number(value) }
          }
        }));
      } else if (parent === 'contact') {
        setPackageData(prev => ({
          ...prev,
          contact: { ...prev.contact, [child]: value }
        }));
      } else if (parent === 'groupSize') {
        setPackageData(prev => ({
          ...prev,
          groupSize: { ...prev.groupSize, [child]: Number(value) }
        }));
      }
    } else {
      setPackageData(prev => ({
        ...prev,
        [name]: name === 'cost' ? Number(value) : value
      }));
    }
  };

  const handleArrayChange = (field: keyof Pick<typeof packageData, 'highlights' | 'requirements' | 'included' | 'notIncluded'>, index: number, value: string) => {
    setPackageData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: keyof Pick<typeof packageData, 'highlights' | 'requirements' | 'included' | 'notIncluded'>) => {
    setPackageData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof Pick<typeof packageData, 'highlights' | 'requirements' | 'included' | 'notIncluded'>, index: number) => {
    setPackageData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: any, i: number) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setItinerary(prev => [...prev, {
      day: prev.length + 1,
      title: '',
      activities: [''],
      accommodation: '',
      meals: ['']
    }]);
  };

  const addHotel = () => {
    setHotels(prev => [...prev, {
      name: '',
      rating: 0,
      price: 0,
      amenities: [''],
      contact: '',
      address: ''
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...packageData,
      itinerary,
      hotels,
      tags: packageData.tags.split(',').map(tag => tag.trim()),
      id: `package-${Date.now()}`
    };
    console.log('New travel package:', finalData);
    navigate('/travel-agent/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/travel-agent/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Travel Package</h1>
              <p className="text-gray-600">Design your perfect travel experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your travel package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Package Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={packageData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Rajasthan Royal Heritage Tour"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination *</Label>
                      <Input
                        id="destination"
                        name="destination"
                        value={packageData.destination}
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
                        value={packageData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 7 Days / 6 Nights"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Package Image URL</Label>
                      <Input
                        id="image"
                        name="image"
                        value={packageData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={packageData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your travel package..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={packageData.tags}
                      onChange={handleInputChange}
                      placeholder="Adventure, Culture, Heritage, Luxury"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={packageData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={packageData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupSize.max">Max Group Size</Label>
                      <Input
                        id="groupSize.max"
                        name="groupSize.max"
                        type="number"
                        value={packageData.groupSize.max}
                        onChange={handleInputChange}
                        placeholder="15"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Details</CardTitle>
                  <CardDescription>Set your package pricing and cost breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="cost.total">Total Package Price (₹) *</Label>
                    <Input
                      id="cost.total"
                      name="cost.total"
                      type="number"
                      value={packageData.cost.total}
                      onChange={handleInputChange}
                      placeholder="45000"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">Cost Breakdown</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="cost.breakdown.accommodation">Accommodation (₹)</Label>
                        <Input
                          id="cost.breakdown.accommodation"
                          name="cost.breakdown.accommodation"
                          type="number"
                          value={packageData.cost.breakdown.accommodation}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cost.breakdown.transportation">Transportation (₹)</Label>
                        <Input
                          id="cost.breakdown.transportation"
                          name="cost.breakdown.transportation"
                          type="number"
                          value={packageData.cost.breakdown.transportation}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cost.breakdown.activities">Activities (₹)</Label>
                        <Input
                          id="cost.breakdown.activities"
                          name="cost.breakdown.activities"
                          type="number"
                          value={packageData.cost.breakdown.activities}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cost.breakdown.meals">Meals (₹)</Label>
                        <Input
                          id="cost.breakdown.meals"
                          name="cost.breakdown.meals"
                          type="number"
                          value={packageData.cost.breakdown.meals}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">Contact Information</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="contact.organizer">Organizer Name *</Label>
                        <Input
                          id="contact.organizer"
                          name="contact.organizer"
                          value={packageData.contact.organizer}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact.phone">Phone Number *</Label>
                        <Input
                          id="contact.phone"
                          name="contact.phone"
                          value={packageData.contact.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact.email">Email *</Label>
                        <Input
                          id="contact.email"
                          name="contact.email"
                          type="email"
                          value={packageData.contact.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact.whatsapp">WhatsApp</Label>
                        <Input
                          id="contact.whatsapp"
                          name="contact.whatsapp"
                          value={packageData.contact.whatsapp}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Package Details</CardTitle>
                  <CardDescription>Add highlights, requirements, and inclusions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Highlights */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Package Highlights</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('highlights')}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {packageData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          value={highlight}
                          onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                          placeholder="e.g., Visit the highest motorable pass"
                        />
                        {packageData.highlights.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('highlights', index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Requirements</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('requirements')}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {packageData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          value={requirement}
                          onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                          placeholder="e.g., Valid ID proof"
                        />
                        {packageData.requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('requirements', index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Included */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>What's Included</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('included')}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {packageData.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          value={item}
                          onChange={(e) => handleArrayChange('included', index, e.target.value)}
                          placeholder="e.g., All accommodation"
                        />
                        {packageData.included.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('included', index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Not Included */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>What's Not Included</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('notIncluded')}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {packageData.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Input
                          value={item}
                          onChange={(e) => handleArrayChange('notIncluded', index, e.target.value)}
                          placeholder="e.g., Airfare to/from destination"
                        />
                        {packageData.notIncluded.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('notIncluded', index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={() => navigate('/travel-agent/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              <Save className="w-4 h-4 mr-2" />
              Create Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTravelPackage;