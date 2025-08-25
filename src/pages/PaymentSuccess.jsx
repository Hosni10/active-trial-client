import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { CheckCircle, Home, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');

    if (paymentIntentId) {
      fetchPaymentDetails(paymentIntentId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (paymentIntentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/payments/payment-status/${paymentIntentId}`
      );
      
      const result = await response.json();
      
      if (result.success) {
        setPaymentDetails(result);
      } else {
        toast.error('Failed to fetch payment details');
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error('Failed to fetch payment details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = () => {
    // Create a simple receipt text
    const receiptText = `
ATOMICS PRESEASON CUP - PAYMENT RECEIPT

Payment ID: ${paymentDetails?.metadata?.paymentIntentId || 'N/A'}
Amount: AED ${paymentDetails?.amount || 'N/A'}
Date: ${new Date().toLocaleDateString()}
Status: ${paymentDetails?.status || 'N/A'}

Player: ${paymentDetails?.metadata?.playerName || 'N/A'}
Email: ${paymentDetails?.metadata?.email || 'N/A'}
Tournament: ${paymentDetails?.metadata?.tournament || 'N/A'}

Thank you for your payment!
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-receipt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSendEmail = () => {
    const subject = 'ATOMICS PRESEASON CUP - Payment Confirmation';
    const body = `
Dear ${paymentDetails?.metadata?.playerName || 'Player'},

Thank you for your payment of AED ${paymentDetails?.amount || 'N/A'} for the ATOMIC PRESEASON CUP.

Payment Details:
- Payment ID: ${paymentDetails?.metadata?.paymentIntentId || 'N/A'}
- Amount: AED ${paymentDetails?.amount || 'N/A'}
- Date: ${new Date().toLocaleDateString()}
- Status: ${paymentDetails?.status || 'N/A'}

We will contact you shortly with further details about the tournament.

Best regards,
Atomics Team
    `;

    window.open(`mailto:${paymentDetails?.metadata?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Thank you for your payment. Your registration is now complete.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {paymentDetails && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">AED {paymentDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600 capitalize">{paymentDetails.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-semibold">{paymentDetails.currency?.toUpperCase()}</span>
                </div>
                {paymentDetails.metadata?.playerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Player:</span>
                    <span className="font-semibold">{paymentDetails.metadata.playerName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button
              onClick={handleSendEmail}
              variant="outline"
              className="w-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email Receipt
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>You will receive a confirmation email shortly.</p>
            <p className="mt-1">If you have any questions, please contact us.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;

