import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateTripFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTripCreated: () => void;
}

const CreateTripForm = ({ isOpen, onClose, onTripCreated }: CreateTripFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    cost: '',
    description: '',
    highlights: '',
    requirements: '',
    included: '',
    notIncluded: '',
    tags: [] as string[],
    newTag: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate trip creation
    toast({
      title: "Trip Created Successfully!",
      description: "Your trip has been posted and is now visible to the community.",
    });

    // Reset form
    setFormData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      maxParticipants: '',
      cost: '',
      description: '',
      highlights: '',
      requirements: '',
      included: '',
      notIncluded: '',
      tags: [],
      newTag: ''
    });

    onTripCreated();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Trip Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Ladakh Adventure Expedition"
                  required
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="e.g., Ladakh, India"
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  placeholder="e.g., 15"
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost per Person (₹)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  placeholder="e.g., 45000"
                />
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trip Description</h3>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your trip in detail..."
                rows={4}
              />
            </div>
          </Card>

          {/* Highlights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trip Highlights</h3>
            <div>
              <Label htmlFor="highlights">Highlights</Label>
              <Textarea
                id="highlights"
                value={formData.highlights}
                onChange={(e) => handleInputChange('highlights', e.target.value)}
                placeholder="List the main highlights of your trip..."
                rows={3}
              />
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Requirements & What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="What participants need to bring/prepare..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="included">What's Included</Label>
                <Textarea
                  id="included"
                  value={formData.included}
                  onChange={(e) => handleInputChange('included', e.target.value)}
                  placeholder="What's included in the trip cost..."
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="notIncluded">What's Not Included</Label>
              <Textarea
                id="notIncluded"
                value={formData.notIncluded}
                onChange={(e) => handleInputChange('notIncluded', e.target.value)}
                placeholder="What's not included in the trip cost..."
                rows={3}
              />
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trip Tags</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={formData.newTag}
                  onChange={(e) => handleInputChange('newTag', e.target.value)}
                  placeholder="Add a tag (e.g., Adventure, Culture, Photography)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Create Trip
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripForm; 