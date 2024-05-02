import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/useAuthContext';

export default function ProfileScreen({ navigation }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const { user, setUser } = useAuthContext();

  // Handle user state changes
  function onAuthStateChanged(user) {
    // setUser(user);

    console.log('aaa user changed', user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    getAuth();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // if (!user) {
  //   navigation.navigate('Home', { name: 'Home' });
  // }

  return (
    <>
      <Button
        title="Go to main"
        onPress={() => navigation.navigate('Home', { name: 'Home' })}
      />
      <View>
        <Text>
          Welcome {user?.email}, {user?.displayName}, {user?.uid},{' '}
          {user?.photoURL}
        </Text>
      </View>
    </>
  );
}
