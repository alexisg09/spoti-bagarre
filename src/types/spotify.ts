export interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    images: { url: string }[];
  };
  preview_url: string;
}