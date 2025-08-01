import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, MapPin, Camera, Eye, EyeOff, Shield, Bell, 
  Smartphone, Globe, Lock, CheckCircle, AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Edit Profile Form
interface EditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const EditProfileForm = ({ isOpen, onClose, user }: EditProfileFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: user?.email?.split('@')[0] || '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    profileImage: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
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
        [field]: value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile Updated Successfully!",
      description: "Your profile information has been saved.",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : undefined} />
                <AvatarFallback className="text-xl">
                  {formData.firstName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="profileImage" className="cursor-pointer">
                  <Button type="button" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter your location"
                />
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </Card>

          {/* Social Links */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Change Password Form
interface ChangePasswordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordForm = ({ isOpen, onClose }: ChangePasswordFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirm password must be the same.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Changed Successfully!",
      description: "Your password has been updated.",
    });
    
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters long</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Change Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Privacy Settings Form
interface PrivacySettingsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySettingsForm = ({ isOpen, onClose }: PrivacySettingsFormProps) => {
  const { toast } = useToast();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    allowTripInvites: true,
    showOnlineStatus: true,
    allowAnalytics: true
  });

  const handleToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSelectChange = (setting: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Privacy Settings Updated!",
      description: "Your privacy preferences have been saved.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Privacy Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="profileVisibility">Who can see your profile</Label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value) => handleSelectChange('profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see</SelectItem>
                    <SelectItem value="friends">Friends only</SelectItem>
                    <SelectItem value="private">Private - Only you</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show email address</Label>
                  <p className="text-sm text-gray-500">Allow others to see your email</p>
                </div>
                <Switch
                  checked={privacySettings.showEmail}
                  onCheckedChange={() => handleToggle('showEmail')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show phone number</Label>
                  <p className="text-sm text-gray-500">Allow others to see your phone</p>
                </div>
                <Switch
                  checked={privacySettings.showPhone}
                  onCheckedChange={() => handleToggle('showPhone')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show location</Label>
                  <p className="text-sm text-gray-500">Show your general location</p>
                </div>
                <Switch
                  checked={privacySettings.showLocation}
                  onCheckedChange={() => handleToggle('showLocation')}
                />
              </div>
            </div>
          </Card>

          {/* Communication */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Communication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow messages from others</Label>
                  <p className="text-sm text-gray-500">Let other users send you messages</p>
                </div>
                <Switch
                  checked={privacySettings.allowMessages}
                  onCheckedChange={() => handleToggle('allowMessages')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow trip invitations</Label>
                  <p className="text-sm text-gray-500">Receive trip invitations from others</p>
                </div>
                <Switch
                  checked={privacySettings.allowTripInvites}
                  onCheckedChange={() => handleToggle('allowTripInvites')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show online status</Label>
                  <p className="text-sm text-gray-500">Let others see when you're online</p>
                </div>
                <Switch
                  checked={privacySettings.showOnlineStatus}
                  onCheckedChange={() => handleToggle('showOnlineStatus')}
                />
              </div>
            </div>
          </Card>

          {/* Data & Analytics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Data & Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow analytics</Label>
                  <p className="text-sm text-gray-500">Help us improve by sharing usage data</p>
                </div>
                <Switch
                  checked={privacySettings.allowAnalytics}
                  onCheckedChange={() => handleToggle('allowAnalytics')}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Notification Settings Form
interface NotificationSettingsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettingsForm = ({ isOpen, onClose }: NotificationSettingsFormProps) => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newMessages: true,
      tripUpdates: true,
      bookingConfirmations: true,
      tripReminders: true,
      marketing: false
    },
    push: {
      newMessages: true,
      tripUpdates: true,
      bookingConfirmations: true,
      tripReminders: true,
      nearbyTrips: false
    }
  });

  const handleToggle = (type: 'email' | 'push', setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: !prev[type][setting as keyof typeof prev[typeof type]]
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Notification Settings Updated!",
      description: "Your notification preferences have been saved.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Notification Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Notifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New messages</Label>
                  <p className="text-sm text-gray-500">When someone sends you a message</p>
                </div>
                <Switch
                  checked={notificationSettings.email.newMessages}
                  onCheckedChange={() => handleToggle('email', 'newMessages')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip updates</Label>
                  <p className="text-sm text-gray-500">Updates about trips you're interested in</p>
                </div>
                <Switch
                  checked={notificationSettings.email.tripUpdates}
                  onCheckedChange={() => handleToggle('email', 'tripUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking confirmations</Label>
                  <p className="text-sm text-gray-500">When your trip booking is confirmed</p>
                </div>
                <Switch
                  checked={notificationSettings.email.bookingConfirmations}
                  onCheckedChange={() => handleToggle('email', 'bookingConfirmations')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip reminders</Label>
                  <p className="text-sm text-gray-500">Reminders before your trips</p>
                </div>
                <Switch
                  checked={notificationSettings.email.tripReminders}
                  onCheckedChange={() => handleToggle('email', 'tripReminders')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing emails</Label>
                  <p className="text-sm text-gray-500">Promotional content and offers</p>
                </div>
                <Switch
                  checked={notificationSettings.email.marketing}
                  onCheckedChange={() => handleToggle('email', 'marketing')}
                />
              </div>
            </div>
          </Card>

          {/* Push Notifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Push Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New messages</Label>
                  <p className="text-sm text-gray-500">Instant notifications for new messages</p>
                </div>
                <Switch
                  checked={notificationSettings.push.newMessages}
                  onCheckedChange={() => handleToggle('push', 'newMessages')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip updates</Label>
                  <p className="text-sm text-gray-500">Real-time trip updates</p>
                </div>
                <Switch
                  checked={notificationSettings.push.tripUpdates}
                  onCheckedChange={() => handleToggle('push', 'tripUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking confirmations</Label>
                  <p className="text-sm text-gray-500">Instant booking confirmations</p>
                </div>
                <Switch
                  checked={notificationSettings.push.bookingConfirmations}
                  onCheckedChange={() => handleToggle('push', 'bookingConfirmations')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Trip reminders</Label>
                  <p className="text-sm text-gray-500">Reminders before your trips</p>
                </div>
                <Switch
                  checked={notificationSettings.push.tripReminders}
                  onCheckedChange={() => handleToggle('push', 'tripReminders')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Nearby trips</Label>
                  <p className="text-sm text-gray-500">Trips happening near your location</p>
                </div>
                <Switch
                  checked={notificationSettings.push.nearbyTrips}
                  onCheckedChange={() => handleToggle('push', 'nearbyTrips')}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 