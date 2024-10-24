const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // You'll need to replace this
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative'
].join(' ');

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

export const getAccessTokenFromUrl = (): string | null => {
  const hash = window.location.hash;
  if (!hash) return null;
  
  const params = new URLSearchParams(hash.substring(1));
  return params.get('access_token');
};