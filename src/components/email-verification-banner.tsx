'use client';

import { useState } from 'react';
import { AlertCircle, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmailVerificationBannerProps {
  userEmail: string;
  isVerified: boolean;
}

export function EmailVerificationBanner({ userEmail, isVerified }: EmailVerificationBannerProps) {
  const [isVisible, setIsVisible] = useState(!isVerified);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');

  if (!isVisible || isVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsResending(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent successfully! Please check your inbox.');
      } else {
        setMessage(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex-1">
          <p className="text-yellow-800">
            <strong>Verify your email address</strong>
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Please check your email ({userEmail}) and click the verification link to activate your account.
          </p>
          {message && (
            <p className={`text-sm mt-2 ${message.includes('successfully') ? 'text-green-700' : 'text-red-700'}`}>
              {message}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendVerification}
            disabled={isResending}
            className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
          >
            <Mail className="h-4 w-4 mr-1" />
            {isResending ? 'Sending...' : 'Resend'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}