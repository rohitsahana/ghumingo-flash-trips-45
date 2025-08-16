import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, UserCheck, UserX, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripType: string;
  userEmail: string;
}

interface InterestedUser {
  _id: string;
  userId: string;
  message: string;
  appliedAt: string;
  status: string;
  userDetails?: {
    email: string;
    name: string;
    isVerified: boolean;
  };
}

const TripDetailModal = ({ isOpen, onClose, tripId, tripType, userEmail }: TripDetailModalProps) => {
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchInterestedUsers();
    }
  }, [isOpen, tripId]);

  const fetchInterestedUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6080/api/user-trip-interests/trip/${tripId}`);
      if (response.ok) {
        const data = await response.json();
        setInterestedUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch interested users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestVerification = async (interestedUser: InterestedUser) => {
    try {
      const response = await fetch("http://localhost:6080/api/user-verification/request-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tripOwnerEmail: userEmail,
          interestedUserEmail: interestedUser.userId,
          tripId,
          tripType,
        }),
      });

      if (response.ok) {
        toast({
          title: "Verification Request Sent",
          description: "The user will be notified to upload their Aadhar card",
        });
      } else {
        throw new Error("Failed to request verification");
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'waiting_for_approval':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span>Trip Details & Interested Users</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading interested users...</p>
            </div>
          ) : interestedUsers.length === 0 ? (
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Interested Users Yet</h4>
              <p className="text-gray-600">
                When people show interest in your trip, they will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Interested Users ({interestedUsers.length})</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {tripType.replace('_', ' ')}
                </Badge>
              </div>

              {interestedUsers.map((user) => (
                <Card key={user._id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {user.userId.split('@')[0].slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {user.userId.split('@')[0]}
                          </h4>
                          {user.userDetails?.isVerified ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              <UserX className="w-3 h-3 mr-1" />
                              Unverified
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{user.message}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(user.appliedAt).toLocaleDateString()}
                          </div>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {!user.userDetails?.isVerified && (
                        <Button
                          size="sm"
                          onClick={() => handleRequestVerification(user)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Request Verification
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripDetailModal; 