import { Suspense } from 'react';
import VerifyEmailClient from './verify-email-client';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
