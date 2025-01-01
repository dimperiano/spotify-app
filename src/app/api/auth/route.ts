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
    const scope = 'user-top-read';
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

      console.log("response.data", response.data)
      const { access_token, refresh_token, expires_in } = response.data;


      const expirationDate = Date.now() + expires_in * 1000;


      const isProduction = process.env.NODE_ENV === 'production';
      const maxAgeInSeconds = expires_in;

      const responseWithCookies = NextResponse.json({ access_token, refresh_token, expires_in });
      responseWithCookies.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: maxAgeInSeconds,
      });
      responseWithCookies.cookies.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      });
      responseWithCookies.cookies.set('expires_in', expirationDate.toString(), {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: maxAgeInSeconds,
      });

      return responseWithCookies;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    } catch (error: any) {
      console.error('Error during token exchange:', error.response?.data || error.message);
      return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action or missing code' }, { status: 400 });
}
