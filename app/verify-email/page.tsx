'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing.');
        return;
      }

      // TODO: Implement actual email verification logic here
      // This would typically involve making an API call to your backend
      // to validate the token and mark the user's email as verified.
      // For now, we'll simulate a successful verification.
      console.log('Verifying email with token:', token);

      // Simulate API call delay
      setTimeout(() => {
        // Replace this with your actual verification logic
        // Example:
        // try {
        //   const response = await fetch('/api/verify-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ token }),
        //   });
        //   const data = await response.json();
        //   if (response.ok) {
        //     setStatus('success');
        //     setMessage(data.message || 'Email verified successfully!');
        //   } else {
        //     setStatus('error');
        //     setMessage(data.error || 'Verification failed.');
        //   }
        // } catch (error) {
        //   setStatus('error');
        //   setMessage('An unexpected error occurred.');
        // }

        // Placeholder logic:
        if (token === 'example-token') {
          setStatus('error'); // 'example-token' should not be a valid token
          setMessage('This is a placeholder token. Please use a valid verification link from your email.');
        } else {
          // Simulate success for any other token for now
          setStatus('success');
          setMessage('¡Tu email ha sido confirmado exitosamente! Ahora puedes iniciar sesión.');
        }
      }, 2000);
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verificación de Email</CardTitle>
          <CardDescription>
            {status === 'loading' && 'Estamos verificando tu email...'}
            {status === 'success' && '¡Verificación Completa!'}
            {status === 'error' && 'Error en la Verificación'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          )}
          {status === 'success' && (
            <>
              <p className="text-green-600">{message}</p>
              <Button asChild>
                <Link href="/login">Ir a Iniciar Sesión</Link>
              </Button>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="text-red-600">{message}</p>
              <Button variant="outline" asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
