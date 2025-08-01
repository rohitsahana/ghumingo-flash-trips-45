import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Users, Shield, Flag } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  // const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

 
  
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);
const { userId } = useParams();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:6080/api/profile/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      // Use mock data as fallback
      setProfile({
        name: 'Adventure Seeker',
        location: 'Mumbai, India',
        memberSince: '2023',
        verified: true,
        rating: 4.8,
        completedTrips: 12,
        followers: 234,
        following: 156,
        bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers.',
        travelStyle: ['Adventure', 'Culture', 'Nature'],
        languages: ['English', 'Hindi', 'Marathi'],
        interests: ['Trekking', 'Photography', 'Local Cuisine'],
        pastTrips: [
          { destination: 'Ladakh', date: '2024', rating: 5 },
          { destination: 'Goa', date: '2023', rating: 4 },
          { destination: 'Kerala', date: '2023', rating: 5 }
        ],
        reviews: [
          { from: 'Travel Buddy', rating: 5, comment: 'Great travel companion!' },
          { from: 'Adventure Group', rating: 4, comment: 'Very organized and fun!' }
        ],
        safetyBadges: ['Verified', 'Trusted Traveler', 'Safety First'],
        upcomingTrips: [
          { destination: 'Rajasthan', date: '2025', status: 'Planning' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [userId]);

if (loading) {
  return <div className="p-6 text-center">Loading profile...</div>;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Profile Header */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-orange-100 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                {profile.verified && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.location}
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Member since {profile.memberSince}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{profile.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{profile.completedTrips}</div>
                  <div className="text-sm text-gray-600">Trips</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{profile.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full">
                <Link to={`/messaging/${userId}`} className="flex-1">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Message
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? "bg-green-100 text-green-800" : ""}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" size="icon">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>

              {/* Travel Style */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Style</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.travelStyle.map((style) => (
                    <Badge key={style} variant="secondary">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages & Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang) => (
                      <Badge key={lang} className="bg-blue-100 text-blue-800">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} className="bg-green-100 text-green-800">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Safety Badges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety & Verification</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.safetyBadges.map((badge) => (
                    <Badge key={badge} className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trips">Past Trips</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-4">
            {profile.pastTrips.map((trip, index) => (
              <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm border-orange-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{trip.destination}</h3>
                    <p className="text-gray-600">{trip.date} • {trip.duration}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(trip.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{trip.review}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {profile.reviews.map((review, index) => (
              <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.reviewer}</h3>
                    <p className="text-sm text-gray-600">{review.trip} • {review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {profile.upcomingTrips.map((trip, index) => (
              <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm border-green-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{trip.destination}</h3>
                    <p className="text-gray-600">{trip.date}</p>
                    <p className="text-blue-600">{trip.lookingFor}</p>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Join Trip
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;