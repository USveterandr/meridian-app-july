'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthenticateCedulaPage() {
  const [cedulaNumber, setCedulaNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/authenticate-cedula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedulaNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful authentication
        // For now, we'll just alert and redirect to the dashboard.
        // In a real app, you might store a token or user session here.
        alert(data.message || 'Cédula authenticated successfully!');
        router.push('/dashboard'); // Redirect to dashboard on success
      } else {
        // Handle authentication failure
        setError(data.error || 'Authentication failed.');
      }
    } catch (err) {
      console.error('Error submitting cédula:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
      //   }
      // } catch (err) {
      //   setError('An unexpected error occurred.');
      // }
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Autenticar Cédula</CardTitle>
          <CardDescription>
            Por favor, ingrese su número de cédula para verificar su identidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cedula">Número de Cédula</Label>
              <Input
                id="cedula"
                type="text"
                placeholder="Ej: 123-4567890-1"
                value={cedulaNumber}
                onChange={(e) => setCedulaNumber(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Autenticar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
