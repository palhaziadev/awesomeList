import { useEffect } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { getAuth } from 'firebase/auth';
import auth from '@react-native-firebase/auth';

// TODO needed?
export function useGetUser() {
  const { user, setUser } = useAuthContext();
  function onAuthStateChanged(user) {
    setUser(user);

    console.log('aaa user changed', user);
  }

  useEffect(() => {
    getAuth();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return { user };
}
