'use client'

import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserProfile = async () => {
  const tokenResponse = await axios.get('/api/get-access-token');
  
  const accessToken = tokenResponse.data.access_token;

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Failed to fetch user profile', error);
  }
};

const useUserProfile = () => {
  return useQuery('userProfile', fetchUserProfile, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false, 
    onError: (error) => {
      console.error('Error fetching user profile:', error);
    },
  });
};

export default useUserProfile;