import { loginUrl } from '../utils/spotify';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">MusicMash</h1>
      <p className="mb-8 text-gray-300">Rate songs from your Spotify playlists</p>
      <a
        href={loginUrl}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        Login with Spotify
      </a>
    </div>
  );
}