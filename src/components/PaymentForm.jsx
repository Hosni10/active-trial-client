import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { toast } from 'sonner';
import { Loader2, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentFormContent = ({ amount, onSuccess, onCancel, registrationData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null
  const [paymentError, setPaymentError] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setPaymentError(error.message);
      } else {
        setPaymentError('An unexpected error occurred.');
      }
      setPaymentStatus('failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentIntent(paymentIntent);
      setPaymentStatus('success');
      
      // Update registration with payment success
      if (registrationData._id) {
        try {
          await fetch(
            `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/tournament-registrations/${registrationData._id}/payment`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentStatus: 'completed',
                stripePaymentIntentId: paymentIntent.id
              }),
            }
          );
        } catch (error) {
          console.error('Error updating registration payment status:', error);
        }
      }
    }

    setIsProcessing(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
    defaultValues: {
      billingDetails: {
        name: `${registrationData.playerFirstName} ${registrationData.playerLastName}`,
        email: registrationData.email,
      },
    },
  };

  // Success Modal
  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your payment of <span className="font-semibold text-green-600">AED {amount}</span> has been processed successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
              <p className="text-gray-600">
                <strong>Player:</strong> {registrationData.playerFirstName} {registrationData.playerLastName}
              </p>
              <p className="text-gray-600">
                <strong>Payment ID:</strong> {paymentIntent?.id}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onSuccess(paymentIntent);
                  setPaymentStatus(null);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failure Modal
  if (paymentStatus === 'failed') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">
              {paymentError || 'An error occurred while processing your payment.'}
            </p>
            <div className="bg-red-50 rounded-lg p-3 mb-4 text-sm">
              <p className="text-red-700">
                Please check your card details and try again, or contact support if the problem persists.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setPaymentStatus(null);
                  setPaymentError('');
                }}
                className="flex-1"
              >
                Try Again
              </Button>
              <Button
                onClick={() => {
                  onCancel();
                  setPaymentStatus(null);
                  setPaymentError('');
                }}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Payment Form
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-600" />
          Complete Payment
        </CardTitle>
        <div className="text-sm text-gray-600">
          Amount: <span className="font-semibold text-green-600">AED {amount}</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement 
            id="payment-element" 
            options={paymentElementOptions}
          />
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing || !stripe || !elements}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay AED ${amount}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const PaymentForm = ({ amount, onSuccess, onCancel, registrationData }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/payments/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            currency: 'aed',
            metadata: {
              playerName: `${registrationData.playerFirstName} ${registrationData.playerLastName}`,
              email: registrationData.email,
              tournament: 'ATOMICS PRESEASON TRIAL',
              registrationId: registrationData._id || 'pending',
              paymentAmount: amount.toString()
            }
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create payment intent');
      }

      setClientSecret(result.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Failed to initialize payment. Please try again.');
    }
  };

  if (!amount || amount <= 0) {
    return (
      <div className="text-center p-8">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Invalid Amount</h3>
        <p className="text-gray-600">Please enter a valid payment amount.</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Initializing payment...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentFormContent 
        amount={amount} 
        onSuccess={onSuccess} 
        onCancel={onCancel}
        registrationData={registrationData}
      />
    </Elements>
  );
};

export default PaymentForm;
