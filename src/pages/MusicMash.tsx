import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { SpotifyTrack } from '../types/spotify';

export default function MusicMash() {
  const { playlistId } = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [currentPair, setCurrentPair] = useState<[SpotifyTrack, SpotifyTrack] | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const { data: tracks, isLoading } = useQuery({
    queryKey: ['playlist-tracks', playlistId],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      return response.data.items.map((item: any) => item.track) as SpotifyTrack[];
    },
    onSuccess: (tracks) => {
      if (!currentPair) {
        setCurrentPair(getRandomPair(tracks));
      }
    }
  });

  const getRandomPair = (tracks: SpotifyTrack[]): [SpotifyTrack, SpotifyTrack] => {
    const available = tracks.filter(track => track.preview_url);
    const first = available[Math.floor(Math.random() * available.length)];
    let second;
    do {
      second = available[Math.floor(Math.random() * available.length)];
    } while (second.id === first.id);
    return [first, second];
  };

  const handleVote = (winner: SpotifyTrack) => {
    if (!tracks) return;
    // Here you could implement logic to store the vote
    setCurrentPair(getRandomPair(tracks));
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayingTrackId(null);
  };

  const togglePlay = (track: SpotifyTrack) => {
    if (audioRef.current) {
      if (playingTrackId === track.id) {
        audioRef.current.pause();
        setPlayingTrackId(null);
      } else {
        audioRef.current.src = track.preview_url!;
        audioRef.current.play();
        setPlayingTrackId(track.id);
      }
    }
  };

  if (isLoading || !currentPair) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Which song do you prefer?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPair.map((track) => (
          <div
            key={track.id}
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-48 h-48 rounded-lg mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">{track.name}</h3>
            <p className="text-gray-400 mb-4">{track.artists[0].name}</p>
            <div className="flex gap-4">
              <button
                onClick={() => togglePlay(track)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
              >
                {playingTrackId === track.id ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => handleVote(track)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Choose
              </button>
            </div>
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
    </div>
  );
}