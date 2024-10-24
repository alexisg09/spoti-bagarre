import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { SpotifyPlaylist } from '../types/spotify';

export default function PlaylistSelect() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data.items as SpotifyPlaylist[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Select a Playlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists?.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => navigate(`/mash/${playlist.id}`)}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors"
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full aspect-square object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
            <p className="text-gray-400">{playlist.tracks.total} tracks</p>
          </button>
        ))}
      </div>
    </div>
  );
}