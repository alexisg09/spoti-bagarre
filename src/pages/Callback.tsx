import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getAccessTokenFromUrl } from '../utils/spotify';

export default function Callback() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const token = getAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
      navigate('/playlists');
    } else {
      navigate('/');
    }
  }, [navigate, setAccessToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
}