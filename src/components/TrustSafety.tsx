
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Star, Phone } from "lucide-react";

const TrustSafety = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Verified Profiles",
      description: "Every user undergoes thorough verification including ID, phone, and social media validation",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Star,
      title: "Community Reviews",
      description: "Transparent rating system where travelers review each other after every trip",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Users,
      title: "Group Safety Tools",
      description: "Live tracking, group SOS, and emergency contact sharing for every trip",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock support team ready to help with any safety concerns",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">
            🔒 Your Safety is Our Priority
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Travel with Complete Peace of Mind
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive trust and safety system ensures every journey is secure, verified, and supported
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`p-6 text-center hover:shadow-lg transition-shadow ${feature.bgColor}/20 border-2 border-transparent hover:border-${feature.color.split('-')[1]}-200`}>
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
              <div className="text-gray-600">Safety Rating</div>
              <div className="text-sm text-gray-500 mt-1">Based on 10,000+ trips</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Major Incidents</div>
              <div className="text-sm text-gray-500 mt-1">In our platform history</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
              <div className="text-sm text-gray-500 mt-1">Emergency assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSafety;
