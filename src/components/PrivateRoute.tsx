import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}