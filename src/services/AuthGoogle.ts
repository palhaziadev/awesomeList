import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect } from 'react';

export default function useGoogleLogin(handleLogin) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '203722623000-e1nuqqv0mo5dsd9ga0sofiojrafske9v.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    });
  }, []);

  const googleSignIn = async (): Promise<FirebaseAuthTypes.UserCredential> => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const loggedIn = auth().signInWithCredential(googleCredential);
    return loggedIn;
  };

  const googleLogOut = () => {
    return auth().signOut();
  };

  return { googleSignIn, googleLogOut };
}
