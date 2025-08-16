import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  Lock
} from "lucide-react";

interface PaymentGatewayProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentId: string, transactionId: string) => void;
  onFailure: (error: string) => void;
  onCancel: () => void;
  bookingDetails?: {
    title: string;
    bookingId: string;
    customerName: string;
    customerEmail: string;
  };
}

const PaymentGateway = ({
  amount,
  currency = "INR",
  onSuccess,
  onFailure,
  onCancel,
  bookingDetails
}: PaymentGatewayProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankName: '',
    walletType: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePayment = async () => {
    setPaymentStatus('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      const paymentId = `pay_${Date.now()}`;
      const transactionId = `txn_${Date.now()}`;
      
      setPaymentStatus('success');
      onSuccess(paymentId, transactionId);
    } catch (error) {
      setPaymentStatus('failed');
      onFailure('Payment failed. Please try again.');
    }
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      return paymentDetails.cardNumber && paymentDetails.expiryDate && 
             paymentDetails.cvv && paymentDetails.cardholderName;
    } else if (paymentMethod === 'upi') {
      return paymentDetails.upiId;
    } else if (paymentMethod === 'netbanking') {
      return paymentDetails.bankName;
    } else if (paymentMethod === 'wallet') {
      return paymentDetails.walletType;
    }
    return false;
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="p-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">
          Your payment of {formatCurrency(amount)} has been processed successfully.
        </p>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-green-800">
            <strong>Transaction ID:</strong> txn_{Date.now()}
          </p>
          <p className="text-sm text-green-800">
            <strong>Payment ID:</strong> pay_{Date.now()}
          </p>
        </div>
        <Button onClick={() => window.location.href = '/'} className="w-full">
          Continue to Home
        </Button>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
        <p className="text-gray-600 mb-4">
          There was an issue processing your payment. Please try again.
        </p>
        <div className="space-y-2">
          <Button onClick={() => setPaymentStatus('pending')} className="w-full">
            Try Again
          </Button>
          <Button variant="outline" onClick={onCancel} className="w-full">
            Cancel Payment
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">SSL Secured</span>
        </div>
      </div>

      {bookingDetails && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <p><strong>Booking:</strong> {bookingDetails.title}</p>
            <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
            <p><strong>Customer:</strong> {bookingDetails.customerName}</p>
            <p><strong>Amount:</strong> {formatCurrency(amount)}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <Label className="text-lg font-semibold">Payment Method</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <CreditCard className="w-6 h-6 mb-2" />
            <span className="text-sm">Card</span>
          </Button>
          <Button
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('upi')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-lg mb-2">📱</span>
            <span className="text-sm">UPI</span>
          </Button>
          <Button
            variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('netbanking')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-lg mb-2">🏦</span>
            <span className="text-sm">Net Banking</span>
          </Button>
          <Button
            variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('wallet')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <span className="text-lg mb-2">💳</span>
            <span className="text-sm">Wallet</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  maxLength={4}
                />
              </div>
              <div>
                <Label htmlFor="cardholderName">Name</Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="Cardholder Name"
                  value={paymentDetails.cardholderName}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'upi' && (
          <div>
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              type="text"
              placeholder="username@upi"
              value={paymentDetails.upiId}
              onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
            />
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div>
            <Label htmlFor="bankName">Select Bank</Label>
            <select
              id="bankName"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={paymentDetails.bankName}
              onChange={(e) => setPaymentDetails({...paymentDetails, bankName: e.target.value})}
            >
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
              <option value="pnb">Punjab National Bank</option>
              <option value="canara">Canara Bank</option>
            </select>
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div>
            <Label htmlFor="walletType">Select Wallet</Label>
            <select
              id="walletType"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={paymentDetails.walletType}
              onChange={(e) => setPaymentDetails({...paymentDetails, walletType: e.target.value})}
            >
              <option value="">Choose your wallet</option>
              <option value="paytm">Paytm</option>
              <option value="phonepe">PhonePe</option>
              <option value="gpay">Google Pay</option>
              <option value="amazonpay">Amazon Pay</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-semibold">Total Amount:</span>
          <span className="text-xl font-bold text-green-600">{formatCurrency(amount)}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Your payment information is encrypted and secure</span>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handlePayment}
            disabled={!validatePaymentDetails() || paymentStatus === 'processing'}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
          >
            {paymentStatus === 'processing' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ${formatCurrency(amount)}`
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={paymentStatus === 'processing'}
            className="w-full"
          >
            Cancel Payment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PaymentGateway; 