import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onVerificationComplete: () => void;
}

const VerificationModal = ({ isOpen, onClose, userEmail, onVerificationComplete }: VerificationModalProps) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharCardImage, setAadharCardImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a cloud service
      // For demo, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setAadharCardImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!aadharNumber || !aadharCardImage) {
      toast({
        title: "Missing Information",
        description: "Please provide both Aadhar number and card image",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch("http://localhost:6080/api/user-verification/upload-aadhar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          aadharNumber,
          aadharCardImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Verification Successful!",
          description: data.message,
        });
        onVerificationComplete();
        onClose();
      } else {
        throw new Error("Verification failed");
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>Account Verification Required</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Why Verification?</h4>
                <p className="text-sm text-blue-700 mt-1">
                  To ensure the safety and trust of our community, we require Aadhar card verification 
                  before you can post your own trips. You can still show interest in others' trips without verification.
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <div>
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                type="text"
                placeholder="Enter your 12-digit Aadhar number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                maxLength={12}
              />
            </div>

            <div>
              <Label htmlFor="aadharImage">Aadhar Card Image</Label>
              <div className="mt-1">
                <Input
                  id="aadharImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("aadharImage")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Aadhar Card
                </Button>
                {aadharCardImage && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Image uploaded
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleSubmit}
              disabled={isUploading || !aadharNumber || !aadharCardImage}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {isUploading ? "Verifying..." : "Submit for Verification"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your information is encrypted and secure. We only use this for verification purposes.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal; 