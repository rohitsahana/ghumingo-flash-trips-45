import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Messaging = () => {
  const { userId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Priya K.",
      content: "Hey! I saw you're interested in the Morocco adventure. I'm planning a 10-day trip through Marrakech, Fes, and the Sahara Desert.",
      timestamp: "2 hours ago",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "That sounds amazing! I've been wanting to visit Morocco for years. What's the tentative budget and dates you're thinking?",
      timestamp: "1 hour ago",
      isOwn: true
    },
    {
      id: 3,
      sender: "Priya K.",
      content: "I'm thinking around ₹45,000 per person including flights, accommodation, and local transport. Looking at dates in March 2024. Are you comfortable with group travel?",
      timestamp: "45 minutes ago",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Yes, that budget works for me! I actually prefer group travel - it's safer and more fun. I saw your profile shows great ratings from previous trips.",
      timestamp: "30 minutes ago",
      isOwn: true
    }
  ]);

  const contact = {
    name: userId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Travel Buddy",
    rating: 4.8,
    completedTrips: 12,
    travelStyle: ["Adventure", "Culture", "Photography"]
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: "Now",
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-800">Ghumingo</span>
        </Link>
        <Link to="/travel-stories">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-100 h-full">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                <div className="text-sm text-gray-600">⭐ {contact.rating} • {contact.completedTrips} trips</div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Travel Style</h4>
                  <div className="flex flex-wrap gap-1">
                    {contact.travelStyle.map((style) => (
                      <span key={style} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link to={`/profile/${userId}`}>
                    <Button variant="outline" className="w-full mb-3">
                      View Full Profile
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Report User
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100 h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Chat with {contact.name}
                </h2>
                <p className="text-sm text-gray-600">Always be respectful and follow our community guidelines</p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isOwn
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Never share personal information like phone numbers or addresses until you've met in person
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;