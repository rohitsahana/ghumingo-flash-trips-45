import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
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
  const [showImage, setShowImage] = useState(false);
  const { toast } = useToast();

  // Validate Aadhar number format
  const validateAadharNumber = (number: string) => {
    const aadharRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
    return aadharRegex.test(number);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
        setAadharCardImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Validate Aadhar number
    if (!validateAadharNumber(aadharNumber)) {
      toast({
        title: "Invalid Aadhar Number",
        description: "Please enter a valid 12-digit Aadhar number (with or without spaces)",
        variant: "destructive",
      });
      return;
    }

    if (!aadharCardImage) {
      toast({
        title: "Missing Aadhar Card Image",
        description: "Please upload your Aadhar card image",
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
          aadharNumber: aadharNumber.replace(/\s/g, ''), // Remove spaces
          aadharCardImage,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Verification Successful!",
          description: data.message,
        });
        onVerificationComplete();
        onClose();
        // Reset form
        setAadharNumber("");
        setAadharCardImage("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Verification failed (${response.status})`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      
      let errorMessage = "Please try again later";
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message.includes("Server returned an invalid response")) {
          errorMessage = "Server error. Please try again in a moment.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatAadharNumber = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    // Format as XXXX XXXX XXXX
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 8) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 8)} ${numbers.slice(8, 12)}`;
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
                onChange={(e) => setAadharNumber(formatAadharNumber(e.target.value))}
                maxLength={14} // XXXX XXXX XXXX format
                className="font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: XXXX XXXX XXXX (spaces will be added automatically)
              </p>
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
                  <div className="mt-2 space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Image uploaded
                    </Badge>
                    <div className="relative">
                      <img
                        src={aadharCardImage}
                        alt="Aadhar Card"
                        className={`w-full h-32 object-cover rounded border ${showImage ? '' : 'blur-sm'}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setShowImage(!showImage)}
                      >
                        {showImage ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                    </div>
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