import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const action = searchParams.get('action');
  const code = searchParams.get('code');

  if (action === 'login') {
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    return NextResponse.redirect(authUrl);
  }

  if (action === 'callback' && code) {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      return NextResponse.json({ access_token, refresh_token, expires_in });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error during token exchange:', error.response?.data || error.message);
      return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action or missing code' }, { status: 400 });
}
