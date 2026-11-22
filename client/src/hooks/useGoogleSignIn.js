import { useNavigate } from 'react-router';
import { useGoogleLogin } from '@react-oauth/google';
import useAuth from './useAuth';

function useGoogleSignIn(setError) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return useGoogleLogin({
    onSuccess: async (response) => {
      setError(null);
      try {
        await loginWithGoogle(response.access_token);
        navigate('/account');
      } catch (err) {
        setError(err.message);
      }
    },
    onError: () => setError('Google login failed'),
  });
}

export default useGoogleSignIn;
