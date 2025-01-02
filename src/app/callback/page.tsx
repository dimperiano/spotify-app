'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams?.get('code');

  useEffect(() => {
    if (code) {
      axios
        .get(`/api/auth?action=callback&code=${code}`)
        .then((response) => {
          console.log('Tokens:', response.data);
          router.push('/home');
        })
        .catch((error) => {
          console.error('Error during authentication:', error);
        });
    }
  }, [code, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Authenticating...</p>
    </div>
  );
};

export default CallbackPage;